const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="text-2xl font-display font-bold italic">
              SHAWARMA<span className="text-primary">BAR</span>
            </a>
            <p className="mt-4 text-cream/70 max-w-sm">
              Menyajikan cita rasa autentik Timur Tengah dengan bahan premium. 
              Roll. Eat. Repeat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-cream/70">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="#menu" className="hover:text-primary transition-colors">Menu</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Kontak</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-cream/70">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 text-center text-cream/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Shawarma Bar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
