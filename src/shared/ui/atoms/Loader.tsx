import { cn } from "@/shared/lib/cn";

type LoaderProps = {
  size?: number; // px
  stroke?: number; // px
  className?: string;
  label?: string; // screen-reader label
};

export default function Loader({
  size = 36,
  stroke = 3,
  className,
  label = "Loading",
}: LoaderProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn("inline-flex items-center", className)}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * 0.25} // quarter ring
          className="text-interactive"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
