import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useCart } from '@/contexts/CartContext';
import type { MenuItem } from './MenuSection';
import { toast } from 'sonner';

interface MenuModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const MenuModal = ({ item, onClose }: MenuModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!item) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        priceNum: item.priceNum,
        img: item.img,
      });
    }
    
    toast.success(`${quantity}x ${item.title} ditambahkan ke keranjang!`, {
      description: 'Klik ikon keranjang untuk melihat pesanan.',
    });
    
    setQuantity(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl overflow-hidden max-w-md w-full shadow-lg"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <p className="text-2xl font-bold text-primary mb-6">{item.price}</p>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-muted-foreground font-medium">Jumlah:</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button onClick={handleAddToCart} size="lg" className="w-full">
                  Tambah ke Keranjang - {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.priceNum * quantity)}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
