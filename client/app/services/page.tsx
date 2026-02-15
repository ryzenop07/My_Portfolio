'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Code, Zap, Palette, Smartphone, Database, Rocket } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building modern, responsive web applications using latest technologies.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Creating beautiful interfaces that work perfectly on all devices.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Designing intuitive and visually appealing user experiences.',
  },
  {
    icon: Database,
    title: 'Backend Development',
    description: 'Developing robust and scalable backend systems and APIs.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Optimizing applications for speed and efficiency.',
  },
  {
    icon: Rocket,
    title: 'Deployment & Maintenance',
    description: 'Deploying applications and providing ongoing support.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Services</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A range of services to help bring your digital vision to life
            </p>
          </motion.section>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-card p-8 rounded-lg border border-border hover:shadow-md transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
