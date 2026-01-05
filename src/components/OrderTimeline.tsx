import { motion } from 'framer-motion';
import { Clock, ChefHat, Bike, CheckCircle, XCircle } from 'lucide-react';

interface OrderTimelineProps {
  status: string;
  createdAt: string;
}

const stages = [
  { 
    key: 'pending', 
    label: 'Pesanan Diterima', 
    icon: Clock,
    description: 'Pesanan Anda sedang menunggu konfirmasi'
  },
  { 
    key: 'processing', 
    label: 'Sedang Diproses', 
    icon: ChefHat,
    description: 'Pesanan Anda sedang disiapkan'
  },
  { 
    key: 'on_delivery', 
    label: 'Dalam Pengiriman', 
    icon: Bike,
    description: 'Pesanan Anda sedang dalam perjalanan'
  },
  { 
    key: 'completed', 
    label: 'Selesai', 
    icon: CheckCircle,
    description: 'Pesanan telah sampai'
  },
];

const getStageIndex = (status: string): number => {
  if (status === 'cancelled') return -1;
  const index = stages.findIndex(s => s.key === status);
  return index >= 0 ? index : 0;
};

const OrderTimeline = ({ status, createdAt }: OrderTimelineProps) => {
  const currentStageIndex = getStageIndex(status);
  const isCancelled = status === 'cancelled';

  if (isCancelled) {
    return (
      <div className="py-4">
        <div className="flex items-center gap-3 text-destructive">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Pesanan Dibatalkan</p>
            <p className="text-sm text-muted-foreground">Pesanan ini telah dibatalkan</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="relative">
        {stages.map((stage, index) => {
          const isCompleted = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.key} className="relative flex gap-4">
              {/* Vertical line */}
              {index < stages.length - 1 && (
                <div 
                  className={`absolute left-5 top-10 w-0.5 h-12 transition-colors duration-300 ${
                    index < currentStageIndex ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}

              {/* Icon circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'bg-muted text-muted-foreground'
                } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
              >
                <Icon className="w-5 h-5" />
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Content */}
              <div className={`pb-8 ${index === stages.length - 1 ? 'pb-0' : ''}`}>
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                >
                  <p className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {stage.label}
                  </p>
                  <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                    {isCurrent ? stage.description : isCompleted ? 'Selesai' : 'Menunggu'}
                  </p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
