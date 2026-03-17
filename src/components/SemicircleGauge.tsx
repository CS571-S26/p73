interface SemicircleGaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Hollow semicircle (top half of circle) that fills from left to right like a meter.
 * Score is shown large and centered inside the arc.
 * value: 0–100
 */
export default function SemicircleGauge({
  value,
  size = 200,
  strokeWidth = 14,
  className = '',
}: SemicircleGaugeProps) {
  const r = (size - strokeWidth) / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;
  const startX = cx - r;
  const endX = cx + r;
  const pathLen = Math.PI * r;
  const filledLen = (value / 100) * pathLen;
  const dashOffset = pathLen - filledLen;

  /* Top semicircle: left to right (sweep 1 = counterclockwise = top half) */
  const arcPath = `M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`;

  /* ViewBox shows the top half so the arc opens downward; score sits at center of semicircle */
  const vbHeight = size / 2 + strokeWidth * 2;
  const scoreY = cy - r / 2;

  return (
    <div className={`d-inline-block ${className}`} style={{ lineHeight: 0 }}>
      <svg
        width={size}
        height={vbHeight}
        viewBox={`0 0 ${size} ${vbHeight}`}
        aria-hidden
      >
        {/* Track: hollow semicircle outline */}
        <path
          d={arcPath}
          fill="none"
          stroke="var(--cbd-border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Filled portion */}
        <path
          d={arcPath}
          fill="none"
          stroke="var(--cbd-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={pathLen}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
        {/* Score centered inside the semicircle */}
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
          }}
        >
          {Math.round(value)}
        </text>
      </svg>
    </div>
  );
}
