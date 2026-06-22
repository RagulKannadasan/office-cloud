'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface EditableHeroProps {
  initialContent: {
    heroTitleLine1: string;
    heroTitleGradient: string;
    heroSubtitle: string;
  };
}

export default function EditableHero({ initialContent }: EditableHeroProps) {
  const [titleLine1, setTitleLine1] = useState(initialContent.heroTitleLine1);
  const [titleGradient, setTitleGradient] = useState(initialContent.heroTitleGradient);
  const [subtitle, setSubtitle] = useState(initialContent.heroSubtitle);

  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orb1Ref.current || !orb2Ref.current || !orb3Ref.current) return;
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      orb1Ref.current.style.transform = `translate(${moveX * 30}px, ${moveY * 30}px)`;
      orb2Ref.current.style.transform = `translate(${moveX * -40}px, ${moveY * -40}px)`;
      orb3Ref.current.style.transform = `translate(-50%, -50%) translate(${moveX * 20}px, ${moveY * 20}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getEditableStyles = () => ({
    background: 'transparent',
    border: '1px dashed transparent',
    outline: 'none',
    cursor: 'text',
    transition: 'border 0.2s',
    width: '100%',
    textAlign: 'center' as const,
    fontFamily: 'inherit',
    fontWeight: 'inherit',
  });

  const handleFocus = (e: any) => e.target.style.border = '1px dashed var(--primary-color)';
  const handleBlur = (e: any) => e.target.style.border = '1px dashed transparent';
  const handleMouseEnter = (e: any) => { if(document.activeElement !== e.target) e.target.style.border = '1px dashed rgba(255,255,255,0.2)' };
  const handleMouseLeave = (e: any) => { if(document.activeElement !== e.target) e.target.style.border = '1px dashed transparent' };

  return (
    <section 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        padding: '6rem 1rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        background: 'var(--bg-primary)'
      }}
    >
      {/* Hidden inputs to sync with the parent form */}
      <input type="hidden" name="heroTitleLine1" value={titleLine1} />
      <input type="hidden" name="heroTitleGradient" value={titleGradient} />
      <input type="hidden" name="heroSubtitle" value={subtitle} />

      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(var(--glass-border) 1px, transparent 1px), linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.3,
        zIndex: -2,
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }}></div>

      <div 
        ref={orb1Ref}
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          willChange: 'transform',
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      
      <div 
        ref={orb2Ref}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          willChange: 'transform',
          transition: 'transform 0.15s ease-out'
        }}
      ></div>
      
      <div 
        ref={orb3Ref}
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          willChange: 'transform',
          transition: 'transform 0.2s ease-out'
        }}
      ></div>

      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 100, damping: 20 } as any}
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '800px', marginBottom: '1.5rem' }}
      >
        <h1 style={{ 
          fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
          lineHeight: 1.1,
          background: 'none', 
          WebkitTextFillColor: 'initial',
        }}>
          <input 
            value={titleLine1} 
            onChange={e => setTitleLine1(e.target.value)}
            style={{ ...getEditableStyles(), fontSize: 'inherit', color: 'inherit' }}
            onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            title="Click to edit Hero Title"
          />
          <br />
          <input 
            value={titleGradient} 
            onChange={e => setTitleGradient(e.target.value)}
            className="animated-gradient-text"
            style={{ ...getEditableStyles(), fontSize: 'inherit' }}
            onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            title="Click to edit Gradient Text"
          />
        </h1>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 } as any}
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '600px', marginBottom: '3rem' }}
      >
        <textarea
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
          style={{
              ...getEditableStyles(),
              color: 'var(--text-secondary)',
              fontSize: '1.25rem',
              lineHeight: 1.6,
              resize: 'none',
              overflow: 'hidden'
          }}
          rows={3}
          onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          title="Click to edit Subtitle"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 } as any}
        style={{ display: 'flex', gap: '1rem', marginBottom: '5rem', position: 'relative', zIndex: 2 }}
      >
        <div className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem', pointerEvents: 'none', opacity: 0.8 }}>
          Access Workspace
        </div>
        <div className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', color: 'var(--text-primary)', borderColor: 'var(--glass-border)', pointerEvents: 'none', opacity: 0.8 }}>
          Explore Features
        </div>
      </motion.div>
    </section>
  );
}
