'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  titleLine1: string;
  titleGradient: string;
  subtitle: string;
}

export default function Hero({ titleLine1, titleGradient, subtitle }: HeroProps) {
  const heroRef = useRef<HTMLSelectElement>(null);
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

  return (
    <section 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        padding: '6rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Tech Grid Overlay */}
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

      {/* Interactive Background Orbs */}
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

      <motion.h1 
        initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 100, damping: 20 } as any}
        style={{ 
          fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          maxWidth: '800px',
          background: 'none', 
          WebkitTextFillColor: 'initial',
          position: 'relative',
          zIndex: 2
        }}
      >
        {titleLine1}<br />
        <span className="animated-gradient-text">{titleGradient}</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 } as any}
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1.25rem',
          maxWidth: '600px',
          marginBottom: '3rem',
          lineHeight: 1.6,
          position: 'relative',
          zIndex: 2
        }}
      >
        {subtitle}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 } as any}
        style={{ display: 'flex', gap: '1rem', marginBottom: '5rem', position: 'relative', zIndex: 2 }}
      >
        <Link href="/login" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Access Workspace
        </Link>
        <a href="#features" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', color: 'var(--text-primary)', borderColor: 'var(--glass-border)' }}>
          Explore Features
        </a>
      </motion.div>

      {/* Floating Dashboard Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 100, rotateX: 15, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 } as any}
        className="glass-panel" 
        style={{
          perspective: '1000px',
          width: '100%',
          maxWidth: '900px',
          height: '450px',
          position: 'relative',
          animation: 'float 6s ease-in-out infinite',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          zIndex: 2
        }}
      >
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          <div style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>office-cloud.app / dashboard</div>
        </div>
        
        <div style={{ display: 'flex', flex: 1, padding: '2rem', gap: '2rem' }}>
          {/* Mock Sidebar */}
          <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ height: '30px', background: 'var(--glass-border)', borderRadius: '6px' }}></div>
            <div style={{ height: '30px', background: 'var(--primary-color)', opacity: 0.2, borderRadius: '6px' }}></div>
            <div style={{ height: '30px', background: 'var(--glass-border)', borderRadius: '6px' }}></div>
            <div style={{ height: '30px', background: 'var(--glass-border)', borderRadius: '6px' }}></div>
          </div>
          {/* Mock Main Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ height: '80px', background: 'var(--glass-border)', borderRadius: '12px' }}></div>
            <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
              <div style={{ flex: 2, background: 'var(--glass-border)', borderRadius: '12px' }}></div>
              <div style={{ flex: 1, background: 'var(--glass-border)', borderRadius: '12px' }}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
