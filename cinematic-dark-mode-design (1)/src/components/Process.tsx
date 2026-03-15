import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Deep Audit',
    subtitle: 'Find the truth in your data',
    desc: 'We dissect every layer of your growth engine — funnel analytics, competitive landscape, attribution models, technical SEO, and ad architecture. No assumptions. Only signals.',
    color: '#00A3FF',
    icon: '🔬',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Strategy Architecture',
    subtitle: 'Engineer the blueprint',
    desc: 'Using audit findings, we build a precision growth architecture — a compounding system where every channel, message, and touchpoint works as one machine toward your revenue targets.',
    color: '#8B5CF6',
    icon: '🧩',
    duration: '1 week',
  },
  {
    number: '03',
    title: 'Precision Execution',
    subtitle: 'Deploy with surgical accuracy',
    desc: 'Launch across paid, organic, and owned channels simultaneously. Creative engineered for conversion. Copy built on behavioral science. Every campaign tagged, tracked, and optimised in real time.',
    color: '#00FF88',
    icon: '⚡',
    duration: 'Ongoing',
  },
  {
    number: '04',
    title: 'Optimize & Scale',
    subtitle: 'Compound your advantage',
    desc: 'Weekly performance reviews. Continuous A/B experimentation. Budget re-allocation toward highest ROI vectors. Your growth accelerates as the system learns — building an insurmountable competitive moat.',
    color: '#FF006E',
    icon: '🚀',
    duration: 'Ongoing',
  },
];

function ProcessNode({ step, index, totalSteps, inView }: {
  step: typeof steps[0]; index: number; totalSteps: number; inView: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2 + 0.3, duration: 0.7, ease: 'easeOut' }}
      className={`relative flex items-start gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-12 last:mb-0`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
        <div
          className="inline-block p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${step.color}25`,
            backdropFilter: 'blur(16px)',
            boxShadow: `0 0 40px ${step.color}08`,
          }}
        >
          <div className="flex items-center gap-3 mb-3" style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
            <span className="text-[10px] font-mono px-2 py-1 rounded-full"
              style={{ background: step.color + '15', border: `1px solid ${step.color}30`, color: step.color }}>
              {step.duration}
            </span>
          </div>
          <h3 className="text-2xl font-black text-white mb-1">{step.title}</h3>
          <p className="text-sm font-semibold mb-3" style={{ color: step.color }}>{step.subtitle}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 360, marginLeft: isEven ? 'auto' : 0 }}>
            {step.desc}
          </p>
        </div>
      </div>

      {/* Center node */}
      <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 80 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.5, ease: 'backOut' }}
          className="relative z-10 w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${step.color}30, rgba(0,0,0,0.8))`,
            border: `2px solid ${step.color}50`,
            boxShadow: `0 0 30px ${step.color}30`,
          }}
        >
          <span className="text-xl">{step.icon}</span>
          <span className="text-[9px] font-mono font-black mt-0.5" style={{ color: step.color }}>
            {step.number}
          </span>
        </motion.div>

        {/* Connector line */}
        {index < totalSteps - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.7, duration: 0.6 }}
            className="w-px mt-2 origin-top"
            style={{
              height: 80,
              background: `linear-gradient(to bottom, ${step.color}80, ${steps[index + 1].color}40)`,
            }}
          />
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </motion.div>
  );
}

// Mobile version
function MobileProcess({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
          className="relative p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${step.color}25`,
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="absolute top-0 left-6 right-6 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${step.color}60, transparent)` }} />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
              style={{
                background: `radial-gradient(circle, ${step.color}20, transparent)`,
                border: `1px solid ${step.color}35`,
              }}>
              <span className="text-lg">{step.icon}</span>
            </div>
            <div>
              <div className="text-[10px] font-mono" style={{ color: step.color }}>{step.number} — {step.duration}</div>
              <h3 className="text-lg font-black text-white">{step.title}</h3>
            </div>
          </div>
          <p className="text-sm font-semibold mb-2" style={{ color: step.color }}>{step.subtitle}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{step.desc}</p>
          {i < steps.length - 1 && (
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-px h-6"
              style={{ background: `linear-gradient(to bottom, ${step.color}60, ${steps[i + 1].color}30)` }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(0,163,255,0.04) 0%, transparent 60%), #000000',
      }} />

      {/* Vertical ambient line */}
      <div className="absolute left-1/2 top-48 bottom-24 w-px hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,163,255,0.1), transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest"
            style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)', color: '#00FF88' }}>
            THE METHOD
          </div>
          <h2 className="font-bold" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em' }}>
            From Zero to{' '}
            <span className="gradient-text-purple">Unstoppable</span>
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Four phases. Relentless iteration. Compounding results.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          {steps.map((step, i) => (
            <ProcessNode key={step.number} step={step} index={i} totalSteps={steps.length} inView={inView} />
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <MobileProcess inView={inView} />
        </div>
      </div>
    </section>
  );
}
