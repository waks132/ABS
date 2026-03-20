import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Volume2, Maximize2, ArrowRight, Check, ChevronRight, PanelTop, DoorOpen, Headphones } from "lucide-react";
import { Helmet } from "react-helmet-async";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] } }),
};

const systems = [
  {
    id: "vitrees",
    icon: Eye,
    title: "Cloisons Vitrées Luxe",
    subtitle: "L'art de la transparence",
    tag: "Best-seller",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/1507d3bcd194f4e0485d214aafc3a8598d322e4224359a5026bb88d60656f7eb.png",
    realPhoto: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/kk51kuyc_IMG-20260318-WA0015.jpg",
    description: "Nos cloisons vitrées bord à bord incarnent l'élégance architecturale contemporaine. Sans montants visibles, elles offrent une transparence maximale tout en garantissant un confort acoustique remarquable grâce au vitrage Stadip Silence.",
    features: [
      "Look bord à bord sans montants visibles",
      "Vitrage Stadip Silence pour confort acoustique",
      "Profilés aluminium anodisé haute qualité",
      "Simple ou double vitrage selon vos besoins",
      "Stores intégrés disponibles",
      "Vitrophanie et personnalisation sur mesure",
    ],
    specs: [
      { label: "Affaiblissement acoustique", value: "Jusqu'à 42dB" },
      { label: "Épaisseur vitrage", value: "8 à 12mm" },
      { label: "Hauteur max", value: "3.50m" },
      { label: "Certification", value: "NF EN ISO 140-3" },
    ],
  },
  {
    id: "allege",
    icon: PanelTop,
    title: "Vitrées sur Allège",
    subtitle: "L'équilibre parfait",
    tag: "Polyvalent",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/1ac9a27799c98e563545a877cfb31d0d4863c8f0045eeaab1b739722d15d064e.png",
    realPhoto: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/7qtav35z_IMG-20260318-WA0021.jpg",
    description: "La cloison vitrée sur allège combine un soubassement plein pour la discrétion et le passage de câbles, avec un vitrage en partie haute pour la lumière naturelle. La solution idéale pour les open spaces et bureaux partagés.",
    features: [
      "Soubassement plein pour intimité et câblage",
      "Partie haute vitrée pour la luminosité",
      "Hauteur d'allège personnalisable (80 à 120cm)",
      "Finitions allège : stratifié, tissu, bois",
      "Compatibilité stores et films décoratifs",
      "Excellente intégration des prises et réseaux",
    ],
    specs: [
      { label: "Affaiblissement acoustique", value: "Jusqu'à 45dB" },
      { label: "Hauteur allège", value: "80 à 120cm" },
      { label: "Hauteur totale max", value: "3.50m" },
      { label: "Intégration", value: "Prises & réseaux" },
    ],
  },
  {
    id: "pleines",
    icon: Volume2,
    title: "Cloisons Pleines Acoustiques",
    subtitle: "Le silence comme luxe",
    tag: "Haute performance",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/8058b222ce41d61914c2a04595441fe394564838a8ef1cbc18a196633eee740e.png",
    realPhoto: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/7qtav35z_IMG-20260318-WA0021.jpg",
    description: "Conçues pour une isolation phonique maximale, nos cloisons pleines combinent une âme isolante haute performance avec des finitions haut de gamme. Bois noble, tissu acoustique ou stratifié : chaque finition est un choix d'excellence.",
    features: [
      "Âme isolante haute performance",
      "Finitions bois, tissu ou stratifié",
      "Performance acoustique jusqu'à 50dB",
      "Coupe-feu disponible (EI30 à EI120)",
      "Parements interchangeables",
      "Compatible stores et signalétique",
    ],
    specs: [
      { label: "Affaiblissement acoustique", value: "Jusqu'à 50dB" },
      { label: "Résistance au feu", value: "EI30 à EI120" },
      { label: "Épaisseur", value: "60 à 100mm" },
      { label: "Certification", value: "Essais CSTB" },
    ],
  },
  {
    id: "coulissantes",
    icon: DoorOpen,
    title: "Portes Coulissantes",
    subtitle: "Le geste architectural",
    tag: "Élégance",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/5c7039b31efd8060bc11f4f3754d788de688a2290ecbd461821889c4bfdb3f2f.png",
    realPhoto: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/gn7jonju_IMG-20260318-WA0011.jpg",
    description: "Nos portes coulissantes vitrées apportent une fluidité remarquable à la circulation dans vos espaces. Rail apparent ou encastré, simple ou double vantail : chaque configuration s'adapte à votre architecture intérieure.",
    features: [
      "Rail apparent ou encastré au choix",
      "Simple ou double vantail",
      "Système de fermeture soft-close",
      "Vitrage sécurit trempé ou feuilleté",
      "Poignées design intégrées",
      "Compatible systèmes de contrôle d'accès",
    ],
    specs: [
      { label: "Affaiblissement acoustique", value: "Jusqu'à 38dB" },
      { label: "Largeur passage", value: "80 à 180cm" },
      { label: "Poids max vantail", value: "120kg" },
      { label: "Système", value: "Soft-close intégré" },
    ],
  },
  {
    id: "mobiles",
    icon: Maximize2,
    title: "Murs Mobiles",
    subtitle: "La flexibilité absolue",
    tag: "Modulable",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/fe25494c308e732490812b3434230a9801714450e42f1048a92cddb060b80039.png",
    realPhoto: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/gn7jonju_IMG-20260318-WA0011.jpg",
    description: "Nos murs mobiles offrent une solution dynamique pour transformer instantanément vos espaces. Idéals pour salles de réunion, centres de formation et espaces événementiels, ils allient modularité et performance acoustique.",
    features: [
      "Système de rails plafond invisible",
      "Manipulation mono-opérateur",
      "Joints acoustiques automatiques",
      "Panneaux empilables ou escamotables",
      "Finitions personnalisables",
      "Installation silencieuse et rapide",
    ],
    specs: [
      { label: "Affaiblissement acoustique", value: "Jusqu'à 56dB" },
      { label: "Poids par panneau", value: "35 à 55kg" },
      { label: "Hauteur max", value: "6.00m" },
      { label: "Opération", value: "Mono-opérateur" },
    ],
  },
  {
    id: "phonebox",
    icon: Headphones,
    title: "Phone Box & Bulles d'Isolation",
    subtitle: "L'intimité instantanée",
    tag: "Tendance",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/06cbd343ec18aa745dc4c6c63b71d0e663c5ced31df4f49d636e80b2dcaaa9e8.png",
    realPhoto: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/kk51kuyc_IMG-20260318-WA0015.jpg",
    description: "Nos cabines acoustiques et bulles d'isolation offrent un espace de concentration et de confidentialité au coeur de l'open space. De la phone box individuelle à la cabine de réunion 4 places, trouvez la solution adaptée à votre besoin.",
    features: [
      "Isolation acoustique haute performance",
      "Ventilation silencieuse intégrée",
      "Éclairage LED réglable",
      "Prises électriques et USB intégrées",
      "Configurations 1, 2 ou 4 places",
      "Aucune modification structurelle nécessaire",
    ],
    specs: [
      { label: "Affaiblissement acoustique", value: "Jusqu'à 35dB" },
      { label: "Configurations", value: "1 à 4 places" },
      { label: "Installation", value: "Plug & Play" },
      { label: "Ventilation", value: "Silencieuse intégrée" },
    ],
  },
];

export default function NosSystemes() {
  return (
    <div data-testid="nos-systemes-page">
      <Helmet>
        <title>Nos Systèmes de Cloisons | ABS Cloison - Solutions Haut de Gamme</title>
        <meta name="description" content="Découvrez nos 6 systèmes de cloisons amovibles : vitrées luxe, sur allège, pleines acoustiques, portes coulissantes, murs mobiles et phone box. Devis gratuit." />
      </Helmet>

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" animate="visible">
            <motion.p variants={fadeUp} custom={0} className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              Nos Systèmes
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-navy mb-6 leading-tight">
              6 solutions de<br />cloisonnement<br /><span className="font-accent italic text-brand-gold">haut de gamme</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              De la cloison vitrée bord à bord à la phone box acoustique, chaque système fusionne esthétique architecturale et performance technique. Intervention partout en France.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {systems.map((sys) => (
              <a
                key={sys.id}
                href={`#${sys.id}`}
                data-testid={`quick-nav-${sys.id}`}
                className="text-xs font-heading font-semibold tracking-wider uppercase px-4 py-2 bg-slate-50 text-slate-500 hover:bg-brand-navy hover:text-white transition-all duration-300"
              >
                {sys.title.split(" ").slice(0, 2).join(" ")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS DETAIL */}
      {systems.map((sys, idx) => (
        <section
          key={sys.id}
          id={sys.id}
          data-testid={`system-detail-${sys.id}`}
          className={`py-20 md:py-32 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} scroll-mt-32`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
              {/* Image Side */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${idx % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="space-y-4">
                  <div className="img-zoom aspect-[4/3] overflow-hidden">
                    <img src={sys.image} alt={sys.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="img-zoom aspect-[16/9] overflow-hidden">
                    <img src={sys.realPhoto} alt={`${sys.title} - réalisation ABS Cloison`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
                  <sys.icon className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
                  <span className="bg-brand-navy text-white text-xs font-semibold tracking-wider uppercase px-3 py-1">
                    {sys.tag}
                  </span>
                </motion.div>

                <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-3xl md:text-4xl text-brand-navy mb-2">
                  {sys.title}
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="font-accent italic text-brand-gold text-xl mb-6">
                  {sys.subtitle}
                </motion.p>
                <motion.p variants={fadeUp} custom={3} className="text-slate-500 leading-relaxed mb-8">
                  {sys.description}
                </motion.p>

                <motion.div variants={fadeUp} custom={4} className="space-y-3 mb-8">
                  {sys.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{f}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} custom={5} className="grid grid-cols-2 gap-4 mb-8">
                  {sys.specs.map((spec, i) => (
                    <div key={i} className="p-4 bg-slate-50 border-l-2 border-brand-gold">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{spec.label}</p>
                      <p className="font-heading font-bold text-brand-navy">{spec.value}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} custom={6}>
                  <Link
                    to="/contact"
                    data-testid={`system-cta-${sys.id}`}
                    className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-navy-light transition-colors"
                  >
                    Demander un devis <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-brand-navy text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
              Vous ne savez pas quel système choisir ?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-slate-400 text-lg mb-10">
              Nos experts vous conseillent gratuitement pour trouver la solution idéale. Intervention dans toute la France.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                to="/contact"
                data-testid="systems-bottom-cta"
                className="inline-flex items-center gap-2 bg-brand-gold text-white px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-colors"
              >
                Conseil gratuit <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
