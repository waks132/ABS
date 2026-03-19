import { Link } from "react-router-dom";

export default function Logo({ variant = "dark", className = "" }) {
  const navyColor = variant === "light" ? "#FFFFFF" : "#0F172A";
  const goldColor = "#CCA43B";

  return (
    <Link to="/" data-testid="logo-link" className={`flex items-center gap-2.5 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer frame - architectural partition shape */}
        <rect x="1" y="1" width="34" height="34" rx="2" stroke={navyColor} strokeWidth="2" fill="none" />
        {/* Vertical glass partition lines */}
        <line x1="12" y1="1" x2="12" y2="35" stroke={goldColor} strokeWidth="1.5" />
        <line x1="24" y1="1" x2="24" y2="35" stroke={goldColor} strokeWidth="1.5" />
        {/* Horizontal beam */}
        <line x1="1" y1="12" x2="35" y2="12" stroke={navyColor} strokeWidth="1.5" />
        {/* Gold accent square */}
        <rect x="13" y="14" width="10" height="10" fill={goldColor} opacity="0.15" />
        <rect x="13" y="14" width="10" height="10" stroke={goldColor} strokeWidth="1" fill="none" />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-heading font-bold text-lg tracking-tight"
          style={{ color: navyColor }}
        >
          <span style={{ color: goldColor }}>ABS</span> CLOISON
        </span>
        <span
          className="text-[8px] tracking-[0.25em] uppercase mt-0.5"
          style={{ color: variant === "light" ? "rgba(255,255,255,0.5)" : "#94A3B8" }}
        >
          Au Bon Service
        </span>
      </div>
    </Link>
  );
}
