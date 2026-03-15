import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    quote: 'HYONOX is the rare agency that thinks in systems, not campaigns. They engineered a growth flywheel that now runs faster than we can keep up with. That\'s a great problem to have.',
    author: 'Alexis Chen',
    role: 'VP Growth, Nexus Ventures',
    company: 'NV',
    color: '#00A3FF',
    result: '6x pipeline in 90 days',
  },
  {
    quote: 'I\'ve worked with performance agencies for 12 years. HYONOX operates at a completely different level — part strategist, part data scientist, part creative studio. The results are absurd.',
    author: 'David Okafor',
    role: 'Founder, Lumen Digital',
    company: 'LD',
    color: '#8B5CF6',
    result: '$4.2M incremental revenue',
  },
  {
    quote: 'They told us we\'d hit 300% ROI in 6 months. I was skeptical. We hit 312% in 5. What makes them different is that they genuinely care about our growth as if it\'s their own.',
    author: 'Priya Sharma',
    role: 'CEO, Orbis SaaS',
    company: 'OS',
    color: '#00FF88',
    result: '312% ROI — 5 months',
  },
  {
    quote: 'The analytics dashboard alone was worth the engagement. For the first time we could see exactly where every dollar was working and where it wasn\'t. Total clarity, total confidence.',
    author: 'Tom Bergmann',
    role: 'CMO, Stratos Health',
    company: 'SH',
    color: '#FF006E',
    result: '94% reduction in wasted spend',
  },
  {
    quote: 'HYONOX doesn\'t just deliver reports — they deliver conviction. Their team embedded with ours and became the growth brain we never knew we needed.',
    author: 'Sarah Mitchell',
    role: 'COO, Apex Commerce',
    company: 'AC',
    color: '#00F0FF',
    result: '2.8M new customers',
  },
];

function TestimonialCard({ t, isActive }: { t: typeof testimonials[0]; isActive: boolean }) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.92,
        opacity: isActive ? 1 : 0.4,
        filter: isActive ? 'blur(0px)' : 'blur(1px)',
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative p-8 rounded-2xl flex flex-col gap-6 h-full"
      style={{
        background: isActive
          ? `radial-gradient(circle at 20% 20%, ${t.color}10, rgba(255,255,255,0.03))`
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isActive ? t.color + '35' : 'rgba(255,255,255,0.05)'}`,
        backdropFilter: 'blur(20px)',
        boxShadow: isActive ? `0 0 60px ${t.color}12, 0 24px 80px rgba(0,0,0,0.4)` : 'none',
      }}
    >
      {isActive && (
        <div className="absolute top-0 left-8 right-8 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />
      )}

      {/* Quote mark */}
      <div className="text-5xl leading-none font-black" style={{ color: t.color + '60' }}>"</div>

      {/* Result badge */}
      <div className="inline-flex self-start">
        <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full"
          style={{ background: t.color + '15', border: `1px solid ${t.color}30`, color: t.color }}>
          {t.result}
        </span>
      </div>

      {/* Quote */}
      <blockquote
        className="text-base leading-relaxed flex-1"
        style={{ color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}
      >
        {t.quote}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
          style={{
            background: `radial-gradient(circle, ${t.color}30, rgba(0,0,0,0.6))`,
            border: `2px solid ${t.color}50`,
            color: t.color,
            boxShadow: isActive ? `0 0 16px ${t.color}40` : 'none',
          }}
        >
          {t.company}
        </div>
        <div>
          <div className="font-bold text-sm text-white">{t.author}</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(a => (a + 1) % testimonials.length);

  return (
    <section id="testimonials" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(139,92,246,0.05) 0%, transparent 60%), #0A0A0F',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest"
            style={{ background: 'rgba(0,163,255,0.1)', border: '1px solid rgba(0,163,255,0.2)', color: '#00A3FF' }}>
            SOCIAL PROOF
          </div>
          <h2 className="font-bold" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em' }}>
            What Our Clients{' '}
            <span className="gradient-text-blue">Actually Say</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[-1, 0, 1].map(offset => {
              const idx = (active + offset + testimonials.length) % testimonials.length;
              return (
                <motion.div
                  key={`${active}-${offset}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TestimonialCard t={testimonials[idx]} isActive={offset === 0} />
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                cursor: 'pointer',
              }}
              aria-label="Previous testimonial"
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    background: i === active
                      ? testimonials[i].color
                      : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                cursor: 'pointer',
              }}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
