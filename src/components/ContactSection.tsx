import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from './ui/button';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Hubungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ada pertanyaan atau ingin reservasi? Hubungi kami kapan saja!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Alamat</h4>
                  <p className="text-muted-foreground">
                    Jl. Shawarma No. 123, Jakarta Selatan<br />Indonesia 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Telepon</h4>
                  <p className="text-muted-foreground">+62 812-3456-7890</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground">hello@shawarmabar.id</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Jam Operasional</h4>
                  <p className="text-muted-foreground">
                    Senin - Jumat: 10:00 - 22:00<br />
                    Sabtu - Minggu: 10:00 - 23:00
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-12 h-12 bg-card shadow-sm rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-card shadow-sm rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-card shadow-sm rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-xl font-display font-bold mb-6">Kirim Pesan</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-3 bg-secondary/50 border-0 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-secondary/50 border-0 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <input
                type="text"
                placeholder="Subjek"
                className="w-full px-4 py-3 bg-secondary/50 border-0 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <textarea
                rows={5}
                placeholder="Pesan Anda..."
                className="w-full px-4 py-3 bg-secondary/50 border-0 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              />
              <Button type="submit" size="lg" className="w-full">
                Kirim Pesan
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
