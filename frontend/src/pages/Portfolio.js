import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { publicAsset } from "@/lib/publicAsset";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] } }),
};

const categories = ["Tous", "Bureaux", "Showrooms", "Industrie"];

const portfolioItems = [
  { id: 1, image: "/portfolio/portfolio-salle-acoustique.jpg", titre: "Salle acoustique", lieu: "Reunion confidentielle", categorie: "Bureaux" },
  { id: 2, image: "/portfolio/portfolio-couloir-double-vitrage.jpg", titre: "Couloir double vitrage", lieu: "Parcours de bureaux", categorie: "Bureaux" },
  { id: 3, image: "/portfolio/portfolio-phone-box.jpg", titre: "Phone box independante", lieu: "Open space", categorie: "Bureaux" },
  { id: 4, image: "/portfolio/portfolio-cloison-vitree-allege.jpg", titre: "Cloison vitree sur allege", lieu: "Bureau ferme", categorie: "Bureaux" },
  { id: 5, image: "/portfolio/portfolio-porte-pivotante.jpg", titre: "Porte pivotante vitree", lieu: "Circulation interieure", categorie: "Bureaux" },
  { id: 6, image: "/portfolio/portfolio-panneaux-acoustiques.jpg", titre: "Panneaux acoustiques muraux", lieu: "Zone de travail", categorie: "Bureaux" },
  { id: 7, image: "/portfolio/portfolio-cloison-luxe-double-vitrage.jpg", titre: "Cloison luxe double vitrage", lieu: "Circulation vitree", categorie: "Bureaux" },
  { id: 8, image: "/portfolio/portfolio-cloison-allege-bureau.jpg", titre: "Angle sur allege", lieu: "Accueil et poste integre", categorie: "Bureaux" },
  { id: 9, image: "/portfolio/portfolio-phone-box-open-space.jpg", titre: "Phone box et cloison vitree", lieu: "Plateau tertiaire", categorie: "Showrooms" },
  { id: 10, image: "/portfolio/portfolio-claustra-separatif.jpg", titre: "Claustra separatif", lieu: "Filtrage de l'espace", categorie: "Showrooms" },
  { id: 11, image: "/portfolio/portfolio-simple-vitrage-lumineux.jpg", titre: "Simple vitrage lumineux", lieu: "Plateau en cours d'amenagement", categorie: "Industrie" },
  { id: 12, image: "/portfolio/portfolio-simple-vitrage-escalier.jpg", titre: "Simple vitrage sous escalier", lieu: "Implantation technique", categorie: "Industrie" },
  { id: 13, image: "/portfolio/portfolio-pose-porte-cloison-rouge.jpg", titre: "Pose de porte sur cloison rouge", lieu: "Chantier en cours", categorie: "Industrie" },
];

export default function Portfolio() {
  const [items] = useState(portfolioItems);
  const [filter, setFilter] = useState("Tous");
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = filter === "Tous" ? items : items.filter((item) => item.categorie === filter);

  return (
    <div data-testid="portfolio-page">
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" animate="visible">
            <motion.p variants={fadeUp} custom={0} className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              Portfolio
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-navy mb-6 leading-tight">
              Nos realisations
              <br />
              <span className="font-accent italic text-brand-gold">d'exception</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Decouvrez une selection plus variee de cloisons posees sur chantier: double vitrage, allege, acoustique, phone box et details de pose.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-wrap gap-3 mb-12" data-testid="portfolio-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-testid={`filter-${cat.toLowerCase()}`}
                className={`px-6 py-2.5 text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                  filter === cat ? "bg-brand-navy text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx % 3}
                layout
              >
                <div
                  className="portfolio-item aspect-[4/3] cursor-pointer group"
                  data-testid={`portfolio-item-${idx}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <img src={publicAsset(item.image)} alt={item.titre} className="w-full h-full object-cover" />
                  <div className="overlay">
                    <div className="overlay-content text-white">
                      <span className="inline-block bg-brand-gold text-white text-xs font-semibold tracking-wider uppercase px-2 py-1 mb-2">
                        {item.categorie}
                      </span>
                      <h3 className="font-heading font-bold text-lg mb-1">{item.titre}</h3>
                      <p className="text-slate-300 text-sm">{item.lieu}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-slate-400 py-12">Aucune realisation dans cette categorie pour le moment.</p>
          )}
        </div>
      </section>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
          data-testid="portfolio-modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              <img src={publicAsset(selectedItem.image)} alt={selectedItem.titre} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <span className="inline-block bg-brand-gold text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 mb-4">
                {selectedItem.categorie}
              </span>
              <h3 className="font-heading font-bold text-2xl text-brand-navy mb-2">{selectedItem.titre}</h3>
              <p className="text-brand-gold text-sm mb-4">{selectedItem.lieu}</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-brand-navy-light transition-colors"
              >
                Projet similaire ? <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              En Action
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-navy mb-4">
              Nos equipes sur le terrain
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <video
                src={publicAsset("/portfolio/VID-20260318-WA0002.mp4")}
                controls
                className="w-full aspect-video object-cover bg-slate-200"
                data-testid="portfolio-video-1"
                preload="metadata"
              />
              <p className="mt-3 text-slate-500 text-sm">Demonstration cloisons vitrees claires et depolies</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <video
                src={publicAsset("/portfolio/VID-20260318-WA0003.mp4")}
                controls
                className="w-full aspect-video object-cover bg-slate-200"
                data-testid="portfolio-video-2"
                preload="metadata"
              />
              <p className="mt-3 text-slate-500 text-sm">Tour des espaces et finitions haut de gamme</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <video
                src={publicAsset("/portfolio/VID-20260318-WA0018.mp4")}
                controls
                className="w-full aspect-video object-cover bg-slate-200"
                data-testid="portfolio-video-3"
                preload="metadata"
              />
              <p className="mt-3 text-slate-500 text-sm">Avancement du chantier et integration technique au plafond</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-brand-navy text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
              Votre projet est unique
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-slate-400 text-lg mb-10">
              Parlez-nous de votre vision. Nous la transformerons en realite.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                to="/contact"
                data-testid="portfolio-cta"
                className="inline-flex items-center gap-2 bg-brand-gold text-white px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-colors"
              >
                Demarrer votre projet <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
