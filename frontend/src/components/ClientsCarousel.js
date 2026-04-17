import { motion } from "framer-motion";
import { publicAsset } from "@/lib/publicAsset";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] } }),
};

// Highest resolution external URLs for client logos (Original SVGs from Wikimedia Commons)
const clients = [
  {
    name: "Veolia",
    location: "",
    logo: "https://cdn.worldvectorlogo.com/logos/veolia.svg",
  },
  {
    name: "Schneider Electric",
    location: "Grenoble",
    logo: "/logos/schneider.svg",
  },
  {
    name: "Crédit Agricole",
    location: "Lyon & Marseille",
    logo: "https://cdn.worldvectorlogo.com/logos/credit-agricole.svg",
  },
  {
    name: "Société Générale",
    location: "Paris (Campus)",
    logo: "https://cdn.worldvectorlogo.com/logos/societe-generale.svg",
  },
  {
    name: "Sanofi",
    location: "Paris (Campus)",
    logo: "https://cdn.worldvectorlogo.com/logos/sanofi-1.svg",
  },
  {
    name: "Dassault Aviation",
    location: "Paris",
    logo: "https://cdn.worldvectorlogo.com/logos/dassault-aviation-1.svg",
  },
  {
    name: "Evos",
    location: "Monaco",
    logo: "/logos/evos-wordmark.svg",
  },
  {
    name: "Télévision Monaco",
    location: "Monaco",
    logo: "/logos/tv-monaco-wordmark.svg",
  },
  {
    name: "Ministère de la Défense",
    location: "Paris",
    logo: "/logos/marianne.svg",
    customLayout: true,
  },
  {
    name: "Ministère des Finances",
    location: "Paris",
    logo: "/logos/marianne.svg",
    customLayout: true,
  },
  {
    name: "CEA",
    location: "Grenoble",
    logo: "https://cdn.worldvectorlogo.com/logos/cea.svg",
  },
];

export default function ClientsCarousel() {
  // Duplicate array for seamless infinite scroll
  const duplicated = [...clients, ...clients];

  return (
    <section data-testid="clients-section" className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Références
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy mb-4">
            Ils nous ont fait confiance
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-6">
            De grandes entreprises et institutions nous font confiance pour l'aménagement de leurs espaces professionnels.
          </p>
          <div className="section-divider mx-auto" />
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="marquee-container relative">
        {/* Gradient fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {duplicated.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="marquee-item flex-shrink-0 mx-3 md:mx-6 group"
              data-testid={`client-logo-${idx}`}
            >
              <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex items-center justify-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 min-w-[200px] md:min-w-[240px] h-[90px] md:h-[110px] px-6 py-4">
                <div className="w-full h-full flex items-center justify-center">
                  {client.customLayout ? (
                    <div className="flex items-center gap-3 w-full justify-center">
                      <img src={publicAsset(client.logo)} alt="Marianne" className="h-10 md:h-12 w-auto object-contain shrink-0" />
                      <span className="font-heading font-extrabold text-[11px] md:text-xs text-brand-navy leading-tight border-l-2 border-slate-200 pl-3 uppercase">
                        {client.name}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={publicAsset(client.logo)}
                      alt={`Logo ${client.name}`}
                      className="max-w-[140px] md:max-w-[170px] max-h-[50px] md:max-h-[60px] object-contain"
                      onError={(e) => {
                        const parent = e.target.parentElement;
                        e.target.style.display = 'none';
                        if (!parent.dataset.fallbackAdded) {
                          parent.dataset.fallbackAdded = 'true';
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center';
                          fallback.innerHTML = `<span class="font-heading font-extrabold text-sm md:text-base text-brand-navy/90 tracking-tight text-center px-2 leading-tight">${client.name}</span>`;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
              {client.location && (
                <p className="text-[11px] text-slate-400 text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-heading tracking-wider uppercase">
                  {client.location}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Client summary */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mt-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-4 bg-white border border-slate-100 px-8 py-4 rounded-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
            <div className="flex -space-x-3">
              {[
                { img: clients[0].logo }, // Veolia
                { img: clients[1].logo }, // Schneider
                { img: clients[3].logo }, // Société Générale
                { img: clients[4].logo }, // Sanofi
                { img: clients[5].logo }, // Dassault
              ].map((style, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-[3px] border-white overflow-hidden shadow-sm flex items-center justify-center bg-white"
                >
                  <img src={publicAsset(style.img)} alt="Logo" className="w-[70%] h-[70%] object-contain" />
                </div>
              ))}
            </div>
            <div className="pl-2">
              <p className="text-brand-navy font-heading font-bold text-sm md:text-base">
                +11 références majeures
              </p>
              <p className="text-slate-400 text-xs">Secteurs privé & public</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
