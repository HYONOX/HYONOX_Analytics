import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

const HEADLINE_WORDS = ['WE DON\'T DO', 'MARKETING.', 'WE ENGINEER', 'GROWTH.'];

const trustLogos = [
  'TECHCRUNCH', 'FORBES', 'WIRED', 'FAST COMPANY', 'INC 5000',
  'VENTUREBEAT', 'TECHCRUNCH', 'FORBES', 'WIRED', 'FAST COMPANY', 'INC 5000', 'VENTUREBEAT',
];

// Animated metric card
function MetricCard({ label, value, delta, color }: { label: string; value: string; delta: string; color: string }) {
  return (
    <div
      className="glass-card p-3 min-w-[110px]"
      style={{ borderColor: `${color}22` }}
    >
      <div className="text-[10px] font-mono mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</div>
      <div className="text-sm font-black font-mono" style={{ color }}>{value}</div>
      <div className="text-[10px] font-mono mt-1" style={{ color: color + 'aa' }}>{delta}</div>
    </div>
  );
}

// Holographic dashboard floating panel
function HoloDashboard() {
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start: number | null = null;
      const animate = (ts: number) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / 2000, 1);
        setLineProgress(prog);
        if (prog < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const w = 420, h = 260;
  const points = [0,30,20,80,50,60,80,100,110,70,140,90,170,50,200,75,230,40,260,60,290,30,320,55,350,20,380,45,410,25];
  const pathD = points.reduce((acc, val, i) => {
    if (i === 0) return `M ${val}`;
    if (i % 2 === 0) return `${acc} ${val}`;
    return `${acc},${val}`;
  }, '');
  const totalLen = 900;
  const drawn = Math.floor(totalLen * lineProgress);

  return (
    <div
      className="relative rounded-2xl overflow-hidden animate-float-y"
      style={{
        width: '100%',
        maxWidth: 480,
        background: 'rgba(10,10,20,0.85)',
        border: '1px solid rgba(0,163,255,0.2)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 80px rgba(0,163,255,0.12), 0 0 160px rgba(139,92,246,0.06), inset 0 1px 0 rgba(255,255,255,0.08)',
        transform: 'perspective(1000px) rotateY(-5deg) rotateX(3deg)',
      }}
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-glow-pulse" />
          <span className="text-xs font-mono font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>HYONOX LIVE DASHBOARD</span>
        </div>
        <div className="flex gap-1.5">
          {['#FF4757','#FFD700','#00FF88'].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>Revenue Growth — YTD</span>
          <span className="text-xs font-mono text-[#00FF88]">+312% ↑</span>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
          {/* Grid lines */}
          {[0,1,2,3,4].map(i => (
            <line key={i} x1="0" y1={i * (h/4)} x2={w} y2={i * (h/4)}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          {/* Area fill */}
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path
            d={`${pathD} L 410,${h} L 0,${h} Z`}
            fill="url(#chartGrad)"
            opacity={lineProgress}
          />
          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLen}
            strokeDashoffset={totalLen - drawn}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
          {/* Glow line */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(0,163,255,0.3)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLen}
            strokeDashoffset={totalLen - drawn}
            style={{ filter: 'blur(4px)' }}
          />
        </svg>
      </div>

      {/* Metric row */}
      <div className="flex gap-2 px-4 pb-4 flex-wrap">
        <MetricCard label="MRR" value="$847K" delta="+18.3%" color="#00A3FF" />
        <MetricCard label="CONV RATE" value="8.42%" delta="+2.1pt" color="#8B5CF6" />
        <MetricCard label="LEADS" value="14.2K" delta="this mo" color="#00FF88" />
        <MetricCard label="CAC" value="$38" delta="-42%" color="#FF006E" />
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateY = useTransform(springX, [-300, 300], [3, -3]);
  const rotateX = useTransform(springY, [-300, 300], [-2, 2]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, rotateX: -90, y: 60 },
    visible: {
      opacity: 1, rotateX: 0, y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,163,255,0.07) 0%, transparent 60%), #000000' }}
      aria-label="Hero section"
    >
      {/* Particle background */}
      <ParticleCanvas mouseInfluence />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,163,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(0,163,255,0.08)',
                border: '1px solid rgba(0,163,255,0.2)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-glow-pulse" />
              <span className="text-xs font-mono font-semibold tracking-widest" style={{ color: '#00A3FF' }}>
                DATA-DRIVEN GROWTH ENGINEERING
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ perspective: '1000px' }}
              className="mb-6"
            >
              {HEADLINE_WORDS.map((word, i) => (
                <motion.div key={i} variants={wordVariants} style={{ display: 'block', lineHeight: 1.0 }}>
                  <span
                    className={`block font-black tracking-tight ${i === 1 || i === 3 ? 'gradient-text-mixed' : 'text-white'}`}
                    style={{
                      fontSize: 'clamp(2.6rem, 7vw, 6.5rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.0,
                    }}
                  >
                    {word}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-8 text-lg max-w-xl mx-auto lg:mx-0"
              style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}
            >
              We deploy precision-engineered growth systems that transform data into
              revenue. Not vanity metrics — measurable, scalable, compounding results.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full animate-pulse"
                  style={{ background: 'rgba(0,163,255,0.2)', filter: 'blur(12px)', transform: 'scale(1.3)' }} />
                <button
                  onClick={() => {
                    const el = document.querySelector('#final-cta');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary relative px-8 py-3.5 text-sm font-bold tracking-widest z-10"
                  style={{ letterSpacing: '0.1em' }}
                >
                  START YOUR GROWTH ENGINE →
                </button>
              </div>
              <button
                onClick={() => {
                  const el = document.querySelector('#case-studies');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-ghost px-8 py-3.5 text-sm font-semibold"
              >
                See Case Studies
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
            >
              {[
                { value: '312%', label: 'Avg ROI' },
                { value: '$127M', label: 'Revenue Generated' },
                { value: '4.2M', label: 'Leads Delivered' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-black text-2xl gradient-text-blue font-mono">{stat.value}</span>
                  <span className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateY, rotateX, perspective: 1200 }}
            className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none"
          >
            <HoloDashboard />
          </motion.div>
        </div>
      </div>

      {/* Trust logo ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 w-full py-6 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="text-center mb-3">
          <span className="text-[10px] font-mono tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
            AS SEEN IN
          </span>
        </div>
        <div className="ticker-wrapper">
          <div className="ticker-inner">
            {trustLogos.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center mx-10 text-xs font-black tracking-widest"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
