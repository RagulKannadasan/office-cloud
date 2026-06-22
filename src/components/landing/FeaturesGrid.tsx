'use client';

import { motion } from 'framer-motion';

interface Props {
  features: {
    title: string;
    desc: string;
    icon: string;
  }[];
}

export default function FeaturesGrid({ features }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 100, damping: 20 } as any
    }
  };

  return (
    <section id="features" style={{ padding: '6rem 1rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Engineered for Scale</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Everything you need to orchestrate a distributed software company, built securely on a blazingly fast Next.js architecture.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {features.map((feature, idx) => (
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -10, boxShadow: '0 25px 50px -12px rgba(99,102,241,0.25)', transition: { type: "spring", stiffness: 300 } as any }}
            key={idx} 
            className="glass-panel feature-card" 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              cursor: 'default'
            }}
          >
            <div style={{ 
              fontSize: '2rem', 
              width: '50px', 
              height: '50px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px'
            }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
