"use client";

const LOOP_HEIGHT = 22;

export default function SpiralBinding({ color, loops = 20 }: { color: string; loops?: number }) {
  const height = loops * LOOP_HEIGHT;
  const gradientId = `spiral-metal-${color.replace("#", "")}`;

  return (
    <svg
      className="spiral-binding"
      viewBox={`0 0 34 ${height}`}
      width="34"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="55%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor="#063b52" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {Array.from({ length: loops }).map((_, index) => {
        const cy = index * LOOP_HEIGHT + LOOP_HEIGHT / 2;
        return (
          <g key={index}>
            <ellipse cx="18" cy={cy + 2} rx="13" ry="7" fill="none" stroke="rgba(20,16,12,0.35)" strokeWidth="3" />
            <ellipse
              cx="17"
              cy={cy}
              rx="13"
              ry="7.5"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="3.4"
            />
          </g>
        );
      })}
    </svg>
  );
}
