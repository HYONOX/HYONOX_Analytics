import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function MetricCallout({
  value, suffix, label, color, delay, active
}: {
  value: number; suffix: string; label: string; color: string; delay: number; active: boolean;
}) {
  const count = useCountUp(value, 2.2, active);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: 'backOut' }}
      className="glass-card p-4 text-center"
      style={{
        borderColor: color + '30',
        boxShadow: `0 0 30px ${color}15`,
        minWidth: 120,
      }}
    >
      <div className="font-black text-2xl font-mono animate-count-glow" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="text-[11px] mt-1 font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</div>
    </motion.div>
  );
}

// Animated funnel
function ConversionFunnel({ active }: { active: boolean }) {
  const stages = [
    { label: 'Impressions', value: '2.8M', width: 100, color: '#00A3FF' },
    { label: 'Clicks', value: '340K', width: 78, color: '#00A3FF' },
    { label: 'Leads', value: '47K', width: 55, color: '#8B5CF6' },
    { label: 'MQL', value: '18K', width: 36, color: '#8B5CF6' },
    { label: 'Customers', value: '4.2K', width: 20, color: '#00FF88' },
  ];
  return (
    <div className="flex flex-col gap-2 py-2">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="text-[10px] font-mono w-20 text-right" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
          <div className="flex-1 h-5 rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={active ? { width: `${s.width}%` } : { width: 0 }}
              transition={{ delay: i * 0.12 + 0.3, duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-sm relative overflow-hidden"
              style={{ background: `linear-gradient(90deg, ${s.color}cc, ${s.color}66)` }}
            >
              <div className="animate-shimmer absolute inset-0" />
            </motion.div>
          </div>
          <div className="text-[10px] font-mono w-12" style={{ color: s.color }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

// Mini radar chart SVG
function RadarChart({ active }: { active: boolean }) {
  const labels = ['SEO', 'Paid', 'Social', 'Email', 'Content', 'CRO'];
  const values = [88, 94, 72, 81, 76, 92];
  const cx = 80, cy = 80, r = 55;
  const n = labels.length;

  const toXY = (i: number, v: number) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const rr = (v / 100) * r;
    return [cx + rr * Math.cos(angle), cy + rr * Math.sin(angle)];
  };

  const gridPoints = (level: number) =>
    Array.from({ length: n }, (_, i) => toXY(i, level)).map(([x, y]) => `${x},${y}`).join(' ');

  const dataPoints = values.map((v, i) => toXY(i, v)).map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <svg viewBox="0 0 160 160" width="100%" style={{ maxWidth: 160 }}>
      {[25, 50, 75, 100].map(level => (
        <polygon key={level} points={gridPoints(level)} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = toXY(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />;
      })}
      <motion.polygon
        points={dataPoints}
        fill="rgba(0,163,255,0.15)"
        stroke="#00A3FF"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      />
      {labels.map((lbl, i) => {
        const [x, y] = toXY(i, 118);
        return (
          <text key={lbl} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="JetBrains Mono, monospace">
            {lbl}
          </text>
        );
      })}
    </svg>
  );
}

// Live notification feed
function NotificationFeed() {
  const [items] = useState([
    { msg: 'New lead: Enterprise SaaS — $220K ARR potential', time: '2s ago', color: '#00FF88' },
    { msg: 'Conversion spike: +34% on Campaign #7', time: '18s ago', color: '#00A3FF' },
    { msg: 'ROI milestone: 400% crossed — Q4 target', time: '1m ago', color: '#8B5CF6' },
    { msg: 'Anomaly detected: CTR surge +18% organic', time: '3m ago', color: '#FFD700' },
  ]);
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.3 }}
          className="flex items-start gap-2 p-2.5 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] leading-snug" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.msg}</p>
          </div>
          <span className="text-[9px] font-mono flex-shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.time}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Analytics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const roi = useCountUp(312, 2.5, inView);
  const revenue = useCountUp(127, 2.5, inView);
  const leads = useCountUp(42, 2.5, inView);
  const retention = useCountUp(987, 2.5, inView);

  return (
    <section id="analytics" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,163,255,0.05) 0%, transparent 60%), #000000',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest"
            style={{ background: 'rgba(0,163,255,0.1)', border: '1px solid rgba(0,163,255,0.2)', color: '#00A3FF' }}>
            LIVE INTELLIGENCE
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Your Growth,{' '}
            <span className="gradient-text-blue">Command-Level</span>
            {' '}Visibility
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every signal, every pattern, every opportunity — surfaced in real-time.
          </p>
        </motion.div>

        {/* Metric callouts */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { v: roi, s: '%', l: 'ROI', c: '#00A3FF', d: 0 },
            { v: revenue, s: 'M', l: 'Revenue ($)', c: '#8B5CF6', d: 0.15 },
            { v: leads, s: '.0K', l: 'Leads Generated (00)', c: '#00FF88', d: 0.3 },
            { v: Math.floor(retention / 10), s: '.7%', l: 'Retention Rate', c: '#FF006E', d: 0.45 },
          ].map((m, i) => (
            <MetricCallout key={i} value={m.v} suffix={m.s} label={m.l} color={m.c} delay={m.d} active={inView} />
          ))}
        </div>

        {/* Cockpit dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden animate-float-y-slow"
          style={{
            background: 'rgba(10,10,20,0.9)',
            border: '1px solid rgba(0,163,255,0.15)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 0 120px rgba(0,163,255,0.08), 0 0 200px rgba(139,92,246,0.04)',
          }}
        >
          {/* Scan line */}
          <div className="scan-line" />

          {/* Dashboard header */}
          <div className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {['#FF4757','#FFD700','#00FF88'].map(c => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
              </div>
              <span className="text-xs font-mono font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>
                HYONOX ANALYTICS COCKPIT — LIVE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-glow-pulse" />
              <span className="text-[10px] font-mono" style={{ color: '#00FF88' }}>STREAMING</span>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}>

            {/* Left panel: Funnel + Radar */}
            <div className="p-6 flex flex-col gap-6">
              <div>
                <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  CONVERSION FUNNEL
                </div>
                <ConversionFunnel active={inView} />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  CHANNEL PERFORMANCE
                </div>
                <div className="flex justify-center">
                  <RadarChart active={inView} />
                </div>
              </div>
            </div>

            {/* Center: Big chart */}
            <div className="p-6 lg:col-span-1">
              <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                REVENUE TRAJECTORY — 12 MONTHS
              </div>
              <RevenueBigChart active={inView} />

              {/* ROI ticker */}
              <div className="mt-4 p-3 rounded-xl"
                style={{ background: 'rgba(0,163,255,0.06)', border: '1px solid rgba(0,163,255,0.15)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>REAL-TIME ROI</span>
                  <span className="font-black font-mono text-xl text-[#00A3FF] animate-count-glow">
                    {roi}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right panel: Notifications + Heatmap indicator */}
            <div className="p-6 flex flex-col gap-6">
              <div>
                <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  LIVE SIGNALS
                </div>
                <NotificationFeed />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  ENGAGEMENT HEATMAP
                </div>
                <HeatmapGrid active={inView} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RevenueBigChart({ active }: { active: boolean }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const values = [30, 42, 38, 55, 65, 58, 72, 88, 82, 95, 108, 127];
  const w = 300, h = 120;
  const max = 130;

  const pathPoints = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - (v / max) * h;
    return [x, y];
  });

  const d = pathPoints.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x},${y}`;
    const [px, py] = pathPoints[i - 1];
    const cpx1 = px + (x - px) / 3;
    const cpx2 = x - (x - px) / 3;
    return `${acc} C ${cpx1},${py} ${cpx2},${y} ${x},${y}`;
  }, '');

  const areaD = `${d} L ${w},${h} L 0,${h} Z`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h + 20}`} width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="revLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#00A3FF" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1="0" y1={t * h} x2={w} y2={t * h}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        <motion.path d={areaD} fill="url(#revGrad)"
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }} />
        <motion.path d={d} fill="none" stroke="url(#revLine)" strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.5, ease: 'easeOut' }} />
        {months.map((m, i) => {
          const x = (i / (months.length - 1)) * w;
          return (
            <text key={m} x={x} y={h + 14} textAnchor="middle"
              fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="JetBrains Mono">
              {m}
            </text>
          );
        })}
        {/* Last point glow */}
        {active && (
          <circle cx={pathPoints[pathPoints.length - 1][0]} cy={pathPoints[pathPoints.length - 1][1]}
            r="4" fill="#00A3FF" style={{ filter: 'drop-shadow(0 0 6px #00A3FF)' }} />
        )}
      </svg>
    </div>
  );
}

function HeatmapGrid({ active }: { active: boolean }) {
  const rows = 6, cols = 12;
  const grid = Array.from({ length: rows * cols }, () => Math.random());
  const getColor = (v: number) => {
    if (v > 0.8) return '#FF006E';
    if (v > 0.6) return '#FF6B35';
    if (v > 0.4) return '#FFD700';
    if (v > 0.2) return '#00A3FF';
    return '#8B5CF6';
  };

  return (
    <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {grid.map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={active ? { opacity: v * 0.8 + 0.1, scale: 1 } : {}}
          transition={{ delay: (i % cols) * 0.02 + Math.floor(i / cols) * 0.03 + 0.4 }}
          className="rounded-sm"
          style={{ background: getColor(v), aspectRatio: '1', minHeight: 8 }}
        />
      ))}
    </div>
  );
}
