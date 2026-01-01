import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MenuCard from './MenuCard';
import MenuModal from './MenuModal';

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  priceNum: number;
  img: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Chicken Shawarma',
    description: 'Ayam juicy dipanggang perlahan dengan saus khas Timur Tengah. Dilengkapi sayuran segar dan pita bread.',
    price: 'Rp 25.000',
    priceNum: 25000,
    img: 'https://images.unsplash.com/photo-1604908177522-42938a1c1e16?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Beef Shawarma',
    description: 'Daging sapi empuk & gurih dengan bumbu rempah khas Middle East. Disajikan dengan tahini sauce.',
    price: 'Rp 30.000',
    priceNum: 30000,
    img: 'https://images.unsplash.com/photo-1625944523831-0fa6b8b5f0a7?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Kebab Roll',
    description: 'Praktis, padat, nikmat. Daging cincang premium dibungkus tortilla dengan sayuran segar.',
    price: 'Rp 22.000',
    priceNum: 22000,
    img: 'https://images.unsplash.com/photo-1617196037304-5aa3f7a7e4e2?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Mix Shawarma',
    description: 'Kombinasi ayam dan daging sapi dalam satu porsi. Pilihan tepat untuk yang susah memilih!',
    price: 'Rp 35.000',
    priceNum: 35000,
    img: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    title: 'Falafel Wrap',
    description: 'Pilihan vegetarian dengan falafel renyah, hummus creamy, dan sayuran Mediterranean.',
    price: 'Rp 20.000',
    priceNum: 20000,
    img: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    title: 'Lamb Shawarma',
    description: 'Daging domba premium dengan rempah autentik. Tekstur lembut dengan cita rasa mewah.',
    price: 'Rp 40.000',
    priceNum: 40000,
    img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop',
  },
];

const MenuSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="menu" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Menu Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Our <span className="text-primary">Menu</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Pilihan shawarma favorit dengan rasa autentik dari bahan berkualitas premium
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-card shadow-md rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar px-2"
          >
            {menuItems.map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-card shadow-md rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default MenuSection;
