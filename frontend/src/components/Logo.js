import { Link } from "react-router-dom";
import { publicAsset } from "@/lib/publicAsset";

const BRAND_IMAGE = "/branding/logo-abs-cloison-horizontal-clean.png";

const variantStyles = {
  light: {
    shell: "drop-shadow-[0_12px_28px_rgba(2,6,23,0.24)]",
    image: "w-[214px] md:w-[232px]",
  },
  dark: {
    shell: "drop-shadow-[0_8px_22px_rgba(15,23,42,0.14)]",
    image: "w-[214px] md:w-[232px]",
  },
  footer: {
    shell: "drop-shadow-[0_16px_36px_rgba(2,6,23,0.26)]",
    image: "w-[250px] md:w-[276px]",
  },
};

export default function Logo({ variant = "dark", className = "" }) {
  const current = variantStyles[variant] ?? variantStyles.dark;

  return (
    <Link to="/" data-testid="logo-link" className={`group inline-flex shrink-0 ${className}`} aria-label="ABS Cloison">
      <span className={`relative inline-flex transition-transform duration-300 group-hover:-translate-y-0.5 ${current.shell}`}>
        <img
          src={publicAsset(BRAND_IMAGE)}
          alt="ABS Cloison"
          className={`block h-auto rounded-[20px] object-cover object-center ${current.image}`}
          draggable={false}
        />
      </span>
    </Link>
  );
}
