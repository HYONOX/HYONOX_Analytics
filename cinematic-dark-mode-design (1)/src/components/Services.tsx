import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    icon: '🧠',
    title: 'AI Growth Intelligence',
    desc: 'Neural-network powered analysis of your entire funnel, identifying hidden revenue leaks and untapped acceleration vectors.',
    color: '#00A3FF',
    tag: 'AI-POWERED',
  },
  {
    icon: '🚀',
    title: 'Precision Acquisition',
    desc: 'Multi-channel paid acquisition engineered for CAC efficiency. We don\'t buy clicks — we engineer qualified pipeline.',
    color: '#8B5CF6',
    tag: 'PERFORMANCE',
  },
  {
    icon: '📈',
    title: 'Revenue Architecture',
    desc: 'End-to-end conversion infrastructure built to compound. Every touchpoint optimized, every dollar accounted for.',
    color: '#00FF88',
    tag: 'CONVERSION',
  },
  {
    icon: '🔍',
    title: 'Search Dominance',
    desc: 'Organic and paid search engineered for category ownership. We don\'t rank pages — we capture markets.',
    color: '#FF006E',
    tag: 'SEO / SEM',
  },
  {
    icon: '📡',
    title: 'Brand Amplification',
    desc: 'Strategic narrative engineering that positions you as the inevitable choice in your category at scale.',
    color: '#00F0FF',
    tag: 'BRAND',
  },
  {
    icon: '⚡',
    title: 'Analytics Command Center',
    desc: 'Real-time data infrastructure with predictive modelling. Your growth mapped, measured, and multiplied.',
    color: '#FFD700',
    tag: 'DATA OPS',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${-mousePos.y * 6}deg) rotateY(${mousePos.x * 6}deg) translateZ(12px) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
        transition: hovered ? 'transform 0.1s linear' : 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? service.color + '33' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16,
        boxShadow: hovered
          ? `0 24px 80px rgba(0,0,0,0.6), 0 0 40px ${service.color}18, inset 0 1px 0 rgba(255,255,255,0.08)`
          : '0 8px 32px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="p-6 flex flex-col gap-4"
    >
      {/* Top glow */}
      {hovered && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${service.color}88, transparent)` }}
        />
      )}

      {/* Tag */}
      <div className="flex items-center justify-between">
        <span
          className="text-[9px] font-mono font-bold tracking-[0.2em] px-2.5 py-1 rounded-full"
          style={{
            background: service.color + '15',
            border: `1px solid ${service.color}30`,
            color: service.color,
          }}
        >
          {service.tag}
        </span>
        <motion.span
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: service.color, fontSize: '1rem' }}
        >
          →
        </motion.span>
      </div>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${service.color}20, rgba(0,0,0,0.4))`,
          border: `1px solid ${service.color}25`,
          boxShadow: hovered ? `0 0 24px ${service.color}30` : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {service.icon}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{service.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 60%), #0A0A0F',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#8B5CF6' }}
          >
            CAPABILITIES
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            The Arsenal That{' '}
            <span className="gradient-text-mixed">Engineers Growth</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            Six precision-engineered systems working in concert to turn your data into an
            unstoppable growth engine.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
