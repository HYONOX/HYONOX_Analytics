import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{
          background: scrolled
            ? 'rgba(10,10,15,0.85)'
            : 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group focus-visible:outline-none"
          aria-label="HYONOX ANALYTICS - scroll to top"
        >
          {/* Logo mark */}
          <div className="relative w-8 h-8">
            <div
              className="absolute inset-0 rounded-lg animate-glow-pulse"
              style={{
                background: 'linear-gradient(135deg, #00A3FF, #8B5CF6)',
                boxShadow: '0 0 20px rgba(0,163,255,0.5)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-black text-xs tracking-tight">HX</span>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-sm font-black tracking-widest"
              style={{ letterSpacing: '0.15em' }}
            >
              <span className="animate-holographic">HYONOX</span>
            </span>
            <span className="text-[9px] font-semibold tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              ANALYTICS
            </span>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.label}
              onClick={() => handleLink(link.href)}
              className="nav-link bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => {
              const el = document.querySelector('#final-cta');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary px-5 py-2 text-sm animate-glow-pulse"
            style={{ animationDuration: '3s' }}
          >
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-white origin-center"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block w-5 h-[1.5px] bg-white"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-white origin-center"
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 32px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{
              background: 'rgba(0,0,0,0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.07 + 0.1 }}
                onClick={() => handleLink(link.href)}
                className="text-2xl font-bold text-white bg-transparent border-none cursor-pointer hover:text-[#00A3FF] transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              onClick={() => {
                setMenuOpen(false);
                const el = document.querySelector('#final-cta');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary px-8 py-3 text-base mt-4"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
