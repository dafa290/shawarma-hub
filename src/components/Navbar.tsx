import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartSidebar from './CartSidebar';
import UserMenu from './UserMenu';
import { Button } from './ui/button';

interface NavbarProps {
  onSearchOpen: () => void;
}

const Navbar = ({ onSearchOpen }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, loading } = useAuth();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'Tentang Kami' },
    { href: '#menu', label: 'Menu' },
    { href: '#contact', label: 'Kontak' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 text-xl md:text-2xl font-display font-bold italic">
              <span className="text-foreground">SHAWARMA</span>
              <span className="text-primary">BAR</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 font-medium hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Icons & Auth */}
            <div className="flex items-center gap-3">
              <button
                onClick={onSearchOpen}
                className="p-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 text-foreground/70 hover:text-primary transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Auth */}
              {!loading && (
                <div className="hidden sm:block">
                  {user ? (
                    <UserMenu />
                  ) : (
                    <Link to="/auth">
                      <Button variant="default" size="sm">
                        Masuk
                      </Button>
                    </Link>
                  )}
                </div>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground/70 hover:text-primary transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-foreground/80 font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile Auth */}
                {!loading && !user && (
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button variant="default" className="w-full mt-2">
                      Masuk / Daftar
                    </Button>
                  </Link>
                )}
                
                {!loading && user && (
                  <div className="pt-2 border-t border-border">
                    <UserMenu />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
