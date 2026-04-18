import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/nos-systemes", label: "Nos Systèmes" },
  { path: "/expertise", label: "Expertise" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/contact", label: "Contact" },
];

const contactLines = [
  { label: "Bureau", href: "tel:0482839186", value: "04 82 83 91 86" },
  { label: "Portable", href: "tel:0753801260", value: "07 53 80 12 60" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navBg = scrolled || !isHome ? "glass-nav" : "glass-nav-transparent";
  const textColor = scrolled || !isHome ? "text-brand-navy" : "text-white";
  const contactLabelColor = scrolled || !isHome ? "text-slate-400" : "text-white/60";
  const contactPanelTone = scrolled || !isHome
    ? "bg-white/72 ring-1 ring-slate-200/80 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
    : "bg-white/10 ring-1 ring-white/15 shadow-[0_16px_38px_rgba(15,23,42,0.16)] backdrop-blur-md";
  const contactIconTone = scrolled || !isHome ? "bg-brand-gold/12 text-brand-gold" : "bg-white/12 text-white";
  return (
    <nav
      data-testid="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[102px]">
          {/* Logo */}
          <Logo variant={scrolled || !isHome ? "dark" : "light"} className="mr-3 md:mr-5" />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.path.replace("/", "") || "home"}`}
                className={`nav-link text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? `${textColor} nav-link active`
                    : `${textColor} opacity-70 hover:opacity-100`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className={`flex items-center gap-3 rounded-full px-4 py-2.5 ${contactPanelTone}`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${contactIconTone}`}>
                <Phone className="h-4 w-4" />
              </span>
              <div className="flex flex-col items-end gap-1">
                {contactLines.map((line) => (
                  <a
                    key={line.label}
                    href={line.href}
                    data-testid={`nav-phone-${line.label.toLowerCase()}`}
                    className={`flex items-center gap-2 text-sm font-medium leading-none ${textColor} transition-colors duration-300 hover:text-brand-gold`}
                  >
                    <span className={`hidden xl:inline text-[10px] font-semibold uppercase tracking-[0.18em] ${contactLabelColor}`}>
                      {line.label}
                    </span>
                    <span className="whitespace-nowrap">{line.value}</span>
                  </a>
                ))}
              </div>
            </div>
            <Link
              to="/contact"
              data-testid="nav-devis-btn"
              className="bg-brand-gold text-white px-6 py-2.5 text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-colors duration-300"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden ${textColor} transition-colors`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-slate-100"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-8 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-${link.path.replace("/", "") || "home"}`}
                  className={`block py-3 text-lg font-heading font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-brand-navy"
                      : "text-slate-500 hover:text-brand-navy"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                {contactLines.map((line) => (
                  <a
                    key={line.label}
                    href={line.href}
                    className="flex items-center gap-2 text-brand-navy font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{line.label}</span>
                    <span>{line.value}</span>
                  </a>
                ))}
                <Link
                  to="/contact"
                  className="block text-center bg-brand-navy text-white py-3 text-sm font-semibold tracking-wider uppercase"
                >
                  Devis gratuit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
