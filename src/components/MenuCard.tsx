import { motion } from 'framer-motion';
import type { MenuItem } from './MenuSection';

interface MenuCardProps {
  item: MenuItem;
  index: number;
  onClick: () => void;
}

const MenuCard = ({ item, index, onClick }: MenuCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="min-w-[280px] max-w-[280px] bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-shadow group"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          + Add
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        <span className="text-primary font-bold text-lg">{item.price}</span>
      </div>
    </motion.div>
  );
};

export default MenuCard;
