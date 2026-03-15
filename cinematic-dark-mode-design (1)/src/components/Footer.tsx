import { useState } from 'react';
import { motion } from 'framer-motion';

const footerLinks = {
  Services: ['AI Growth Intelligence', 'Precision Acquisition', 'Revenue Architecture', 'Search Dominance', 'Brand Amplification', 'Analytics Command'],
  Company: ['About', 'Case Studies', 'Process', 'Careers', 'Blog'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const socials = [
  { name: 'LinkedIn', icon: 'in', href: '#' },
  { name: 'Twitter', icon: 'X', href: '#' },
  { name: 'Instagram', icon: 'IG', href: '#' },
  { name: 'YouTube', icon: 'YT', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: '#000000' }}>
      {/* Animated gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, #00A3FF, #8B5CF6, #FF006E, #00FF88, transparent)',
          backgroundSize: '200% auto',
          animation: 'gradient-border 6s linear infinite',
        }}
      />

      {/* Subtle glow top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(0,163,255,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #00A3FF, #8B5CF6)', boxShadow: '0 0 20px rgba(0,163,255,0.4)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-black text-xs">HX</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-black tracking-widest animate-holographic" style={{ letterSpacing: '0.15em' }}>
                  HYONOX
                </div>
                <div className="text-[9px] tracking-[0.25em] font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  ANALYTICS
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 280 }}>
              We don't do marketing. We engineer growth. Premium data-driven growth systems for companies that demand more.
            </p>
            <a
              href="mailto:hyonoxanalytics02@gmail.com"
              className="text-xs font-mono transition-colors hover:text-[#00A3FF]"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              hyonoxanalytics02@gmail.com
            </a>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-6">
              <p className="text-xs font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Growth Intelligence Newsletter
              </p>
              {submitted ? (
                <div className="text-xs font-mono text-[#00FF88] py-2">
                  ✓ You're in. Insights incoming.
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 text-xs font-mono rounded-lg"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      outline: 'none',
                    }}
                    required
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2 text-xs font-bold"
                  >
                    →
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-black tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
                {category.toUpperCase()}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2025 HYONOX ANALYTICS. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map(s => (
              <motion.a
                key={s.name}
                href={s.href}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                }}
                aria-label={s.name}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Engineered for growth. Built for the future.
          </p>
        </div>
      </div>
    </footer>
  );
}
