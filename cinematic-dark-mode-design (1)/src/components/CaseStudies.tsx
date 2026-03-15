import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const cases = [
  {
    brand: 'NexaCloud',
    industry: 'B2B SaaS',
    color: '#00A3FF',
    before: { label: 'Monthly Revenue', value: '$42K' },
    after: { label: 'Monthly Revenue', value: '$389K' },
    growth: '+827%',
    period: '8 months',
    quote: 'HYONOX didn\'t just grow our pipeline — they rebuilt our entire growth architecture. The compounding effect is still accelerating.',
    author: 'Marcus Wei',
    role: 'CEO, NexaCloud',
    tags: ['AI ACQUISITION', 'CRO', 'SEO'],
  },
  {
    brand: 'Forge Commerce',
    industry: 'E-commerce',
    color: '#8B5CF6',
    before: { label: 'ROAS', value: '1.8x' },
    after: { label: 'ROAS', value: '9.4x' },
    growth: '+422%',
    period: '5 months',
    quote: 'We\'d tried 3 agencies before. HYONOX was the first team that actually understood data-driven growth at scale. The results speak for themselves.',
    author: 'Sofia Reyes',
    role: 'CMO, Forge Commerce',
    tags: ['PAID MEDIA', 'DATA OPS', 'BRAND'],
  },
  {
    brand: 'PulseHealth',
    industry: 'HealthTech',
    color: '#00FF88',
    before: { label: 'Monthly Leads', value: '240' },
    after: { label: 'Monthly Leads', value: '4,800' },
    growth: '+1900%',
    period: '12 months',
    quote: 'In a compliance-heavy industry, HYONOX navigated the constraints while still delivering growth that defied every benchmark we\'d set.',
    author: 'Dr. James Park',
    role: 'Founder, PulseHealth',
    tags: ['SEO DOMINANCE', 'CONTENT', 'ANALYTICS'],
  },
];

// Mini trajectory spark line
function SparkLine({ color }: { color: string }) {
  const points = [0, 10, 5, 20, 12, 35, 28, 45, 38, 55, 50, 70, 60, 85, 75, 95];
  const w = 140, h = 50;
  const d = points.reduce((acc, val, i) => {
    if (i % 2 === 0) return acc;
    const x = (i / points.length) * w * 2;
    const y = h - ((val / 100) * h);
    if (i === 1) return `M ${x},${y}`;
    return `${acc} L ${x},${y}`;
  }, '');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <motion.path
        d={d} fill="none"
        stroke={`url(#spark-${color.replace('#', '')})`}
        strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <circle cx={w} cy={h - (95 / 100) * h} r="3" fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

function CaseCard({ c, index }: { c: typeof cases[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -30, y: 40 }}
      whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
      className="relative"
      style={{ perspective: 1200, height: 420 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 p-6 flex flex-col rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${c.color}25`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 0 60px ${c.color}10`,
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-6 right-6 h-px rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }} />

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex gap-2 mb-2">
                {c.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                    style={{ background: c.color + '15', border: `1px solid ${c.color}30`, color: c.color }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-black text-white">{c.brand}</h3>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.industry}</p>
            </div>
            <div className="text-right">
              <div className="font-black text-2xl font-mono" style={{ color: c.color }}>{c.growth}</div>
              <div className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>in {c.period}</div>
            </div>
          </div>

          {/* Before / After */}
          <div className="flex items-center gap-4 mb-4 p-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex-1">
              <div className="text-[10px] font-mono mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>BEFORE</div>
              <div className="font-black text-lg font-mono text-white/50">{c.before.value}</div>
              <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{c.before.label}</div>
            </div>
            <div className="text-2xl" style={{ color: c.color }}>→</div>
            <div className="flex-1 text-right">
              <div className="text-[10px] font-mono mb-1" style={{ color: c.color + 'aa' }}>AFTER</div>
              <div className="font-black text-lg font-mono" style={{ color: c.color }}>{c.after.value}</div>
              <div className="text-[10px]" style={{ color: c.color + '88' }}>{c.after.label}</div>
            </div>
          </div>

          {/* Spark line */}
          <div className="mb-4">
            <SparkLine color={c.color} />
          </div>

          {/* CTA */}
          <button
            onClick={() => setFlipped(true)}
            className="mt-auto text-xs font-semibold flex items-center gap-2 group"
            style={{ color: c.color, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Read the story
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 p-6 flex flex-col rounded-2xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${c.color}12, rgba(0,0,0,0.95))`,
            border: `1px solid ${c.color}35`,
            backdropFilter: 'blur(24px)',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="absolute top-0 left-6 right-6 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }} />

          <div className="flex-1 flex flex-col justify-center">
            <div className="text-4xl mb-4" style={{ color: c.color }}>"</div>
            <blockquote className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
              {c.quote}
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                style={{ background: c.color + '25', border: `1px solid ${c.color}40`, color: c.color }}>
                {c.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-sm text-white">{c.author}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.role}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setFlipped(false)}
            className="mt-4 text-xs font-semibold flex items-center gap-2"
            style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Back
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const chars = 'RESULTS DON\'T LIE'.split('');

  return (
    <section id="case-studies" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(139,92,246,0.05) 0%, transparent 60%), #0D0D1A',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest"
            style={{ background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.2)', color: '#FF006E' }}>
            PROOF OF WORK
          </div>
          <h2 className="font-black" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {chars.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                className={i > 11 ? 'gradient-text-mixed' : 'text-white'}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Three stories. Three industries. One constant — engineered growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <CaseCard key={c.brand} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
