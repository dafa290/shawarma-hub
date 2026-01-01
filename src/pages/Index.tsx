import { useState } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';

const Index = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ContactSection />
        <Footer />
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default Index;
