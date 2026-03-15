import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

// Orbiting particles around CTA button
function OrbitingParticles({ active }: { active: boolean }) {
  const particles = [0, 1, 2, 3, 4, 5];
  const colors = ['#00A3FF', '#8B5CF6', '#00F0FF', '#FF006E', '#00FF88', '#FFD700'];
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 50 }}>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const delay = i * 0.3;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              marginTop: -4,
              marginLeft: -4,
              background: colors[i],
              boxShadow: `0 0 8px ${colors[i]}`,
              animation: active ? `orbit ${2 + i * 0.3}s linear ${delay}s infinite` : 'none',
              transformOrigin: '4px 4px',
              transform: `rotate(${angle}deg) translateX(${60 + i * 8}px)`,
            }}
          />
        );
      })}
    </div>
  );
}

// Volume light rays
function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="volume-ray"
          style={{
            left: `${10 + i * 11}%`,
            height: `${40 + Math.random() * 40}%`,
            width: `${1 + Math.random()}px`,
            background: `linear-gradient(to top, ${['rgba(0,163,255,0.3)', 'rgba(139,92,246,0.3)', 'rgba(0,240,255,0.2)'][i % 3]}, transparent)`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 700);

    setTimeout(() => {
      window.location.href = 'mailto:hyonoxanalytics02@gmail.com?subject=Growth Engine Inquiry&body=Hi HYONOX Analytics team, I\'d like to discuss how you can engineer growth for my business.';
    }, 150);
  };

  return (
    <section
      id="final-cta"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,102,255,0.12) 0%, rgba(139,92,246,0.08) 40%, #000000 70%)',
      }}
      aria-labelledby="cta-heading"
    >
      {/* Particles */}
      <ParticleCanvas count={120} mouseInfluence />

      {/* Light rays */}
      <LightRays />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #00A3FF, #8B5CF6, #FF006E, transparent)',
          backgroundSize: '200% auto',
          animation: 'gradient-border 4s linear infinite',
        }} />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.25)', color: '#FF006E' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF006E] animate-glow-pulse" />
          <span className="text-xs font-mono font-semibold tracking-widest">LIMITED CAPACITY — Q1 2025</span>
        </motion.div>

        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="font-black mb-6"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          Ready to Build Something{' '}
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #00A3FF 0%, #8B5CF6 40%, #FF006E 80%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Unstoppable?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-xl mb-12 max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}
        >
          Join 200+ companies who stopped hoping for growth and started engineering it.
          Your first audit is free. Your first win is guaranteed.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: 'backOut' }}
          className="relative inline-flex mb-8"
        >
          {/* Double glow rings */}
          <div className="absolute inset-0 rounded-full animate-pulse"
            style={{ background: 'rgba(0,163,255,0.15)', filter: 'blur(20px)', transform: 'scale(1.5)' }} />
          <div className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(139,92,246,0.1)',
              filter: 'blur(30px)',
              transform: 'scale(2)',
              animation: 'glow-pulse 4s ease-in-out infinite',
            }} />

          {/* Orbiting particles */}
          <OrbitingParticles active={inView} />

          <button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative overflow-hidden px-10 py-5 rounded-full font-black text-base tracking-widest z-10"
            style={{
              background: hovered
                ? 'linear-gradient(135deg, #0066FF, #8B5CF6)'
                : 'linear-gradient(135deg, #00A3FF, #0066FF)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              boxShadow: hovered
                ? '0 0 80px rgba(0,163,255,0.5), 0 0 120px rgba(139,92,246,0.3), 0 20px 60px rgba(0,0,0,0.5)'
                : '0 0 40px rgba(0,163,255,0.3), 0 12px 40px rgba(0,0,0,0.4)',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            aria-label="Start your growth engine - contact HYONOX Analytics"
          >
            START YOUR GROWTH ENGINE
            {/* Ripples */}
            {ripples.map(r => (
              <span
                key={r.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: r.x,
                  top: r.y,
                  width: 0,
                  height: 0,
                  background: 'rgba(255,255,255,0.4)',
                  transform: 'translate(-50%,-50%)',
                  animation: 'supernova-ring 0.7s ease-out forwards',
                }}
              />
            ))}
          </button>
        </motion.div>

        {/* Objection handling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12"
        >
          {[
            { icon: '⚡', text: 'Free Growth Audit' },
            { icon: '🎯', text: 'ROI Guarantee' },
            { icon: '🔒', text: 'NDA on Day 1' },
            { icon: '📊', text: '30-Day Results' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Email link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Prefer email? Reach us directly at
          </p>
          <a
            href="mailto:hyonoxanalytics02@gmail.com"
            className="text-sm font-mono font-semibold transition-colors hover:text-[#00A3FF]"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            hyonoxanalytics02@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
