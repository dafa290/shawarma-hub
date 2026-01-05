// Simple zone-based delivery estimation
// Zones are determined by keywords in the address

interface DeliveryEstimate {
  zone: string;
  minMinutes: number;
  maxMinutes: number;
  label: string;
}

const zones: { keywords: string[]; estimate: DeliveryEstimate }[] = [
  {
    keywords: ['jakarta pusat', 'jakpus', 'central jakarta', 'menteng', 'gambir', 'tanah abang'],
    estimate: { zone: 'pusat', minMinutes: 15, maxMinutes: 25, label: '15-25 menit' },
  },
  {
    keywords: ['jakarta selatan', 'jaksel', 'south jakarta', 'kebayoran', 'tebet', 'pancoran', 'mampang'],
    estimate: { zone: 'selatan', minMinutes: 20, maxMinutes: 35, label: '20-35 menit' },
  },
  {
    keywords: ['jakarta barat', 'jakbar', 'west jakarta', 'grogol', 'cengkareng', 'kebon jeruk'],
    estimate: { zone: 'barat', minMinutes: 25, maxMinutes: 40, label: '25-40 menit' },
  },
  {
    keywords: ['jakarta timur', 'jaktim', 'east jakarta', 'cakung', 'jatinegara', 'matraman'],
    estimate: { zone: 'timur', minMinutes: 30, maxMinutes: 45, label: '30-45 menit' },
  },
  {
    keywords: ['jakarta utara', 'jakut', 'north jakarta', 'kelapa gading', 'tanjung priok', 'penjaringan'],
    estimate: { zone: 'utara', minMinutes: 30, maxMinutes: 50, label: '30-50 menit' },
  },
  {
    keywords: ['tangerang', 'serpong', 'bsd', 'bintaro', 'alam sutera'],
    estimate: { zone: 'tangerang', minMinutes: 40, maxMinutes: 60, label: '40-60 menit' },
  },
  {
    keywords: ['bekasi', 'cikarang'],
    estimate: { zone: 'bekasi', minMinutes: 45, maxMinutes: 70, label: '45-70 menit' },
  },
  {
    keywords: ['depok', 'bogor', 'cibubur'],
    estimate: { zone: 'depok-bogor', minMinutes: 50, maxMinutes: 80, label: '50-80 menit' },
  },
];

const defaultEstimate: DeliveryEstimate = {
  zone: 'default',
  minMinutes: 30,
  maxMinutes: 60,
  label: '30-60 menit',
};

export const getDeliveryEstimate = (address: string | null | undefined): DeliveryEstimate => {
  if (!address) return defaultEstimate;

  const normalizedAddress = address.toLowerCase();

  for (const zone of zones) {
    for (const keyword of zone.keywords) {
      if (normalizedAddress.includes(keyword)) {
        return zone.estimate;
      }
    }
  }

  return defaultEstimate;
};

export const formatDeliveryTime = (estimate: DeliveryEstimate): string => {
  return estimate.label;
};
