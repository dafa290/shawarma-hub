import { motion } from 'framer-motion';
import { Flame, Award, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: 'Fresh Ingredients',
    description: 'Bahan segar pilihan langsung dari supplier terpercaya setiap hari.',
  },
  {
    icon: Award,
    title: 'Authentic Recipe',
    description: 'Resep autentik Timur Tengah yang telah turun-temurun.',
  },
  {
    icon: Clock,
    title: 'Fast Service',
    description: 'Pesanan siap dalam waktu singkat tanpa mengurangi kualitas.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Kepuasan pelanggan adalah prioritas utama kami.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=500&fit=crop"
                alt="Chef preparing shawarma"
                className="rounded-3xl shadow-lg w-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-primary/10 rounded-3xl -z-10" />
            
            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-card shadow-lg rounded-2xl p-6 hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">5+</p>
                  <p className="text-sm text-muted-foreground">Years</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">50k+</p>
                  <p className="text-sm text-muted-foreground">Customers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Kami Menyajikan <span className="text-primary">Cita Rasa Autentik</span> Timur Tengah
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Shawarma Bar hadir untuk membawa pengalaman kuliner Timur Tengah yang autentik ke Indonesia. 
              Dengan bahan-bahan premium dan resep tradisional, kami berkomitmen menyajikan shawarma 
              terbaik dengan cita rasa yang tak terlupakan.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
