import { useEffect, useState } from 'react';

interface SemicircleGaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /**
   * When true, the arc fills from 0 and the score counts up; the number fades in near the end.
   * When false, the gauge reflects `value` immediately (default).
   */
  animateEntrance?: boolean;
}

function clampScore(n: number): number {
  return Math.min(100, Math.max(0, n));
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

const FILL_DURATION_MS = 920;
/** Label opacity reaches 1 around this fraction of the fill (earlier = still faint while counting). */
const LABEL_FADE_START_T = 0.55;

/**
 * Hollow semicircle (top half of circle) that fills from left to right like a meter.
 * value: 0–100 (clamped)
 */
export default function SemicircleGauge({
  value,
  size = 200,
  strokeWidth = 14,
  className = '',
  animateEntrance = false,
}: SemicircleGaugeProps) {
  const target = clampScore(value);

  const [displayValue, setDisplayValue] = useState(() => (animateEntrance ? 0 : target));
  const [labelFade, setLabelFade] = useState(() => (animateEntrance ? 0 : 1));

  useEffect(() => {
    if (!animateEntrance) {
      setDisplayValue(target);
      setLabelFade(1);
      return;
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(target);
      setLabelFade(1);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let start: number | null = null;

    setDisplayValue(0);
    setLabelFade(0);

    const tick = (now: number) => {
      if (cancelled) return;
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / FILL_DURATION_MS);
      const eased = easeOutCubic(t);
      setDisplayValue(target * eased);

      const fadeT = t <= LABEL_FADE_START_T ? 0 : (t - LABEL_FADE_START_T) / (1 - LABEL_FADE_START_T);
      setLabelFade(Math.min(1, fadeT));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplayValue(target);
        setLabelFade(1);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target, animateEntrance]);

  const r = (size - strokeWidth) / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;
  const startX = cx - r;
  const endX = cx + r;
  const pathLen = Math.PI * r;
  const filledLen = (displayValue / 100) * pathLen;
  const dashOffset = pathLen - filledLen;

  const arcPath = `M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`;

  const vbHeight = size / 2 + strokeWidth * 2;
  const scoreY = cy - r / 2;

  const labelDy = animateEntrance ? (1 - labelFade) * 10 : 0;

  return (
    <div className={`d-inline-block ${className}`} style={{ lineHeight: 0 }}>
      <svg
        width={size}
        height={vbHeight}
        viewBox={`0 0 ${size} ${vbHeight}`}
        aria-hidden
      >
        <path
          d={arcPath}
          fill="none"
          stroke="var(--cbd-border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={arcPath}
          fill="none"
          stroke="var(--cbd-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={pathLen}
          strokeDashoffset={dashOffset}
          style={
            animateEntrance
              ? undefined
              : { transition: 'stroke-dashoffset 0.4s ease' }
          }
        />
        <g transform={`translate(0, ${labelDy})`}>
          <text
            x={cx}
            y={scoreY}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--cbd-gauge-text)"
            style={{
              fontSize: '2.75rem',
              fontWeight: 700,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              opacity: animateEntrance ? labelFade : 1,
            }}
          >
            {Math.round(displayValue)}
          </text>
        </g>
      </svg>
    </div>
  );
}
