export default function SoviaMark({ size = 34, dark = false }: { size?: number; dark?: boolean }) {
  const strokeColor = dark ? "#f8fbfc" : "var(--ink)";
  const gradId = dark ? "sovia-mark-grad-dark" : "sovia-mark-grad-light";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="26" y1="10" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#55e0c2" />
          <stop offset="100%" stopColor="#27c9d4" />
        </linearGradient>
      </defs>
      <path
        d="M28 12c0-3.4-3.4-5.4-7.6-5.4-5 0-9 2.7-9 6.6 0 4.1 4.2 5.4 8.2 6.4 5 1.2 10.2 2.6 10.2 8 0 5.1-5 8.2-10.6 8.2-4.8 0-9.4-2.2-9.4-6.4"
        stroke={strokeColor}
        strokeWidth="3.1"
        strokeLinecap="round"
      />
      <circle cx="30.5" cy="20.5" r="1.9" fill={`url(#${gradId})`} />
      <path d="M34 15 L42 33" stroke={`url(#${gradId})`} strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}
