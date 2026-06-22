'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  initialFeatures: any[];
}

export default function EditableFeaturesGrid({ initialFeatures }: Props) {
  const [features, setFeatures] = useState(initialFeatures);

  const updateFeature = (index: number, key: string, value: string) => {
    const newFeatures = [...features];
    newFeatures[index][key] = value;
    setFeatures(newFeatures);
  };

  const getEditableStyles = () => ({
    background: 'transparent',
    border: '1px dashed transparent',
    outline: 'none',
    cursor: 'text',
    transition: 'border 0.2s',
    width: '100%',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit',
    resize: 'none' as const
  });

  const handleFocus = (e: any) => e.target.style.border = '1px dashed var(--primary-color)';
  const handleBlur = (e: any) => e.target.style.border = '1px dashed transparent';
  const handleMouseEnter = (e: any) => { if(document.activeElement !== e.target) e.target.style.border = '1px dashed rgba(255,255,255,0.2)' };
  const handleMouseLeave = (e: any) => { if(document.activeElement !== e.target) e.target.style.border = '1px dashed transparent' };

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
    <section id="features" style={{ padding: '6rem 1rem', background: 'var(--bg-primary)' }}>
      {/* Hidden input to pass data to the parent form */}
      <input type="hidden" name="features" value={JSON.stringify(features)} />

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
              cursor: 'default',
              position: 'relative'
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
              borderRadius: '12px',
              padding: '0.2rem'
            }}>
              <input 
                value={feature.icon}
                onChange={e => updateFeature(idx, 'icon', e.target.value)}
                style={{ ...getEditableStyles(), textAlign: 'center', fontSize: '1.5rem', height: '100%' }}
                onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                title="Edit Icon Emoji"
              />
            </div>
            
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
              <input 
                value={feature.title}
                onChange={e => updateFeature(idx, 'title', e.target.value)}
                style={{ ...getEditableStyles(), fontSize: 'inherit' }}
                onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                title="Edit Feature Title"
              />
            </h3>
            
            <textarea 
              value={feature.desc}
              onChange={e => updateFeature(idx, 'desc', e.target.value)}
              style={{ ...getEditableStyles(), color: 'var(--text-secondary)', fontSize: '0.95rem', minHeight: '80px' }}
              onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              title="Edit Feature Description"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
