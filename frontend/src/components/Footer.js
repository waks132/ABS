import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer data-testid="main-footer" className="bg-brand-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-heading font-bold text-2xl tracking-tight mb-6">
              <span className="text-brand-gold">ABS</span> CLOISON
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              L'excellence dans l'aménagement d'espaces professionnels. Cloisons amovibles haut de gamme, installation en site occupé.
            </p>
            <div className="section-divider mb-6" />
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              ABS 69 - Au Bon Service
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-brand-gold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/nos-systemes", label: "Nos Systèmes" },
                { to: "/expertise", label: "Expertise Technique" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/contact", label: "Contact & Devis" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    data-testid={`footer-link-${item.to.replace("/", "") || "home"}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-brand-gold mb-6">
              Nos Solutions
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>Cloisons Vitrées Luxe</li>
              <li>Cloisons Pleines Acoustiques</li>
              <li>Murs Mobiles</li>
              <li>Verrière de Bureau</li>
              <li>Faux Plafonds</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-brand-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  642 Route de Lyon<br />Anse, France
                </span>
              </li>
              <li>
                <a href="tel:0753801260" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  07 53 80 12 60
                </a>
              </li>
              <li>
                <a href="tel:0482839186" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  04 82 83 91 86
                </a>
              </li>
              <li>
                <a href="mailto:abscloison@gmail.com" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  abscloison@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} ABS Cloison. Tous droits réservés. Garantie décennale.
          </p>
          <button
            onClick={scrollToTop}
            data-testid="scroll-to-top"
            className="flex items-center gap-2 text-slate-500 hover:text-brand-gold text-xs uppercase tracking-wider transition-colors"
          >
            Haut de page <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
