import { Link } from "react-router-dom";

export default function Logo({ variant = "dark", className = "" }) {
  const navyColor = variant === "light" ? "#FFFFFF" : "#0F172A";
  const goldColor = "#CCA43B";

  return (
    <Link to="/" data-testid="logo-link" className={`flex items-center gap-3 ${className}`}>
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer frame */}
        <rect x="1.5" y="1.5" width="43" height="43" rx="2" stroke={navyColor} strokeWidth="2.5" fill="none" />
        {/* Vertical glass partition lines */}
        <line x1="16" y1="1.5" x2="16" y2="44.5" stroke={goldColor} strokeWidth="1.5" />
        <line x1="31" y1="1.5" x2="31" y2="44.5" stroke={goldColor} strokeWidth="1.5" />
        {/* Horizontal beam */}
        <line x1="1.5" y1="15" x2="44.5" y2="15" stroke={navyColor} strokeWidth="1.5" />
        {/* Gold accent panes */}
        <rect x="17.5" y="17" width="12" height="12" fill={goldColor} opacity="0.12" />
        <rect x="17.5" y="17" width="12" height="12" stroke={goldColor} strokeWidth="1" fill="none" />
        <rect x="33" y="17" width="10" height="12" fill={goldColor} opacity="0.06" />
        <rect x="33" y="17" width="10" height="12" stroke={goldColor} strokeWidth="0.5" fill="none" />
        {/* Small detail - door handle */}
        <line x1="28" y1="22" x2="28" y2="26" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-heading font-extrabold text-[22px] tracking-tight"
          style={{ color: navyColor }}
        >
          <span style={{ color: goldColor }}>ABS</span> CLOISON
        </span>
        <span
          className="text-[9px] tracking-[0.3em] uppercase mt-1 font-medium"
          style={{ color: variant === "light" ? "rgba(255,255,255,0.5)" : "#94A3B8" }}
        >
          Au Bon Service
        </span>
      </div>
    </Link>
  );
}
