'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  initialWorkflow: any[];
}

export default function EditableWorkflow({ initialWorkflow }: Props) {
  const [steps, setSteps] = useState(initialWorkflow);

  const updateStep = (index: number, key: string, value: string) => {
    const newSteps = [...steps];
    newSteps[index][key] = value;
    setSteps(newSteps);
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

  return (
    <section style={{ padding: '6rem 1rem', background: 'rgba(0,0,0,0.2)' }}>
      {/* Hidden input to pass data to the parent form */}
      <input type="hidden" name="workflow" value={JSON.stringify(steps)} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 } as any}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Frictionless Onboarding</h2>
          <p style={{ color: 'var(--text-secondary)' }}>From initial deployment to daily operations in three simple steps.</p>
        </motion.div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2rem' 
        }}>
          {steps.map((step, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: idx * 0.15 } as any}
              whileHover={{ scale: 1.02, x: 10, transition: { type: "spring", stiffness: 300 } as any }}
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '2rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                padding: '2rem',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Giant background number */}
              <div style={{
                position: 'absolute',
                right: '-20px',
                top: '-20px',
                fontSize: '10rem',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.03)',
                lineHeight: 1,
                zIndex: 0
              }}>
                {step.num}
              </div>

              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--primary-color)',
                zIndex: 1,
                flexShrink: 0
              }}>
                {step.num}
              </div>
              
              <div style={{ zIndex: 1, flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  <input 
                    value={step.title}
                    onChange={e => updateStep(idx, 'title', e.target.value)}
                    style={{ ...getEditableStyles(), fontSize: 'inherit' }}
                    onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                    title="Edit Step Title"
                  />
                </h3>
                <textarea 
                  value={step.desc}
                  onChange={e => updateStep(idx, 'desc', e.target.value)}
                  style={{ ...getEditableStyles(), color: 'var(--text-secondary)', margin: 0, minHeight: '60px' }}
                  onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                  title="Edit Step Description"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
