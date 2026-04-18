import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Clock, Blocks, Award, ArrowRight, ChevronRight, Star, Volume2, Eye, PanelTop, DoorOpen, Headphones } from "lucide-react";
import axios from "axios";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ClientsCarousel from "@/components/ClientsCarousel";
import { publicAsset } from "@/lib/publicAsset";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : null;

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2560",
    alt: "Cloisons vitrées haut de gamme"
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2560",
    alt: "Design architectural et aménagement d'espace"
  },
  {
    image: "/branding/cloisons-vitrees.jpg",
    alt: "Cloisons vitrées dépolies et cadres noirs"
  },
];

const promises = [
  { icon: Shield, title: "Garantie Décennale", desc: "Protection totale sur l'ensemble de nos installations" },
  { icon: Clock, title: "Site Occupé", desc: "Installation sans perturbation de votre activité" },
  { icon: Blocks, title: "Modularité Totale", desc: "Espaces reconfigurables selon vos besoins" },
  { icon: Award, title: "Aménagement Propre", desc: "Respect absolu de votre environnement" },
];

const systems = [
  {
    title: "Cloisons Vitrées Luxe",
    desc: "Look bord à bord sans montants visibles. Vitrage Stadip Silence pour transparence et confort acoustique.",
    image: "/systems/chantier-cloison-luxe-double-vitrage.jpg",
    icon: Eye,
    tag: "Best-seller",
  },
  {
    title: "Vitrées sur Allège",
    desc: "Soubassement plein pour intimité et câblage, partie haute vitrée pour la lumière naturelle.",
    image: "/systems/chantier-cloison-vitree-allege.jpg",
    icon: PanelTop,
    tag: "Polyvalent",
  },
  {
    title: "Cloisons Pleines Acoustiques",
    desc: "Finitions haut de gamme en bois et tissu. Isolation phonique optimale.",
    image: "/systems/chantier-cloison-acoustique.jpg",
    icon: Volume2,
    tag: "Acoustique",
  },
  {
    title: "Portes Coulissantes",
    desc: "Rail apparent ou encastré, soft-close. Fluidité de circulation et élégance architecturale.",
    image: "/systems/chantier-porte-pivotante.jpg",
    icon: DoorOpen,
    tag: "Élégance",
  },

  {
    title: "Phone Box & Bulles d'Isolation",
    desc: "Cabines acoustiques plug & play. Concentration et confidentialité en open space.",
    image: "/systems/chantier-phone-box.jpg",
    icon: Headphones,
    tag: "Tendance",
  },
];

const stats = [
  { value: "30+", label: "Années d'expérience" },
  { value: "500+", label: "Projets réalisés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "48h", label: "Délai de réponse" },
];

const transformationHighlights = [
  {
    icon: Shield,
    title: "Circulation sécurisée",
    desc: "Cloisons, flux et points d'accès se lisent tout de suite dans les espaces aménagés.",
  },
  {
    icon: Clock,
    title: "Intervention maîtrisée",
    desc: "Nos poses sont pensées pour les sites occupés, avec un chantier propre et des délais tenus.",
  },
];

const featuredPortfolioItem = {
  img: "/portfolio/IMG-20260318-WA0000.jpg",
  title: "Îlots de travail vitrés",
  lieu: "Lyon",
  tag: "Bureaux",
  desc: "Transparence, cadres noirs et composition sur mesure pour structurer les équipes.",
};

featuredPortfolioItem.title = "\u00celots vitr\u00e9s";
featuredPortfolioItem.desc = "Transparence, cadres noirs et composition sur mesure pour structurer les \u00e9quipes.";

const portfolioPreviewItems = [
  {
    img: "/portfolio/acces-securise.jpg",
    title: "Accès sécurisés intégrés",
    lieu: "Contrôle d'accès",
    tag: "Sécurité",
    desc: "Poignée électronique ASSA ABLOY et circulation contrôlée dans les zones sensibles.",
  },
  { img: "/portfolio/VID-20260318-WA0003.mp4", title: "Bureaux de direction", lieu: "Vidéo chantier", tag: "Finition" },
  { img: "/portfolio/IMG-20260318-WA0021.jpg", title: "Profilés blancs", lieu: "Anse", tag: "Préparation" },
  { img: "/portfolio/IMG-20260318-WA0005.jpg", title: "Structure aluminium", lieu: "Paris", tag: "Pose" },
  { img: "/portfolio/IMG-20260318-WA0006.jpg", title: "Délimitation", lieu: "Marseille", tag: "Plateau" },
  { img: "/portfolio/IMG-20260318-WA0007.jpg", title: "Assemblage précis", lieu: "Grenoble", tag: "Technique" },
  { img: "/portfolio/IMG-20260318-WA0009.jpg", title: "Lignes épurées", lieu: "Annecy", tag: "Modulaire" },
  { img: "/portfolio/IMG-20260318-WA0008.jpg", title: "Passage vitré", lieu: "Lyon", tag: "Circulation" },
  { img: "/portfolio/IMG-20260318-WA0011.jpg", title: "Pose en cours", lieu: "Chantier", tag: "Réalisation" },
];

portfolioPreviewItems[0] = {
  img: "/portfolio/acces-securise.jpg",
  title: "Acc\u00e8s s\u00e9curis\u00e9s int\u00e9gr\u00e9s",
  lieu: "Contr\u00f4le d'acc\u00e8s",
  tag: "S\u00e9curit\u00e9",
  desc: "Poign\u00e9e \u00e9lectronique ASSA ABLOY et circulation contr\u00f4l\u00e9e dans les zones sensibles.",
};
portfolioPreviewItems[1] = {
  img: "/portfolio/VID-20260318-WA0003.mp4",
  title: "Espace d\u00e9di\u00e9",
  lieu: "Vid\u00e9o chantier",
  tag: "Agencement",
};
portfolioPreviewItems[2] = { img: "/portfolio/IMG-20260318-WA0021.jpg", title: "Profil\u00e9s blancs", lieu: "Anse", tag: "Pr\u00e9paration" };
portfolioPreviewItems[3] = { img: "/portfolio/IMG-20260318-WA0005.jpg", title: "Structure aluminium", lieu: "Paris", tag: "Pose" };
portfolioPreviewItems[4] = { img: "/portfolio/IMG-20260318-WA0006.jpg", title: "D\u00e9limitation", lieu: "Marseille", tag: "Plateau" };
portfolioPreviewItems[5] = { img: "/portfolio/IMG-20260318-WA0007.jpg", title: "Assemblage pr\u00e9cis", lieu: "Grenoble", tag: "Technique" };
portfolioPreviewItems[6] = { img: "/portfolio/IMG-20260318-WA0009.jpg", title: "Lignes \u00e9pur\u00e9es", lieu: "Annecy", tag: "Modulaire" };
portfolioPreviewItems[7] = { img: "/portfolio/IMG-20260318-WA0008.jpg", title: "Passage vitr\u00e9", lieu: "Lyon", tag: "Circulation" };
portfolioPreviewItems[8] = { img: "/portfolio/IMG-20260318-WA0011.jpg", title: "Pose en cours", lieu: "Chantier", tag: "R\u00e9alisation" };

const [
  securityPortfolioItem,
  videoPortfolioItem,
  whiteProfilesPortfolioItem,
  ,
  ,
  ,
  cleanLinesPortfolioItem,
  passagePortfolioItem,
  inProgressPortfolioItem,
] = portfolioPreviewItems;

videoPortfolioItem.desc = "Vue chantier d'un espace d\u00e9di\u00e9 en cours de finition.";
const corridorPortfolioItem = {
  img: "/portfolio/couloir-vitres-20260331.jpg",
  title: "Couloir vitr\u00e9",
  lieu: "Perspective",
  tag: "Circulation",
};

const supportingPortfolioItems = [videoPortfolioItem];
const editorialPortfolioTiles = [
  securityPortfolioItem,
  corridorPortfolioItem,
  whiteProfilesPortfolioItem,
  cleanLinesPortfolioItem,
  passagePortfolioItem,
  inProgressPortfolioItem,
];

const portfolioTagClass =
  "inline-flex rounded-full bg-brand-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]";
const portfolioMetaClass =
  "mt-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#e9d4a0] [text-shadow:0_1px_2px_rgba(2,6,23,0.95)]";
const portfolioTitleClass =
  "mt-2 font-heading font-bold leading-tight text-white [text-shadow:0_1px_2px_rgba(2,6,23,1),0_10px_24px_rgba(2,6,23,0.26)]";
const portfolioDescClass =
  "mt-3 max-w-md text-sm font-medium leading-relaxed text-white/92 [text-shadow:0_1px_2px_rgba(2,6,23,0.96)]";
const portfolioFeatureOverlayClass =
  "absolute inset-0 bg-gradient-to-t from-brand-navy/84 via-brand-navy/22 via-45% to-transparent";
const portfolioTileTagClass =
  "text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold";

function PortfolioMedia({ item, className = "" }) {
  return item.img.endsWith(".mp4") ? (
    <video src={publicAsset(item.img)} autoPlay loop muted playsInline className={className} />
  ) : (
    <img src={publicAsset(item.img)} alt={item.title} className={className} />
  );
}

function PortfolioFeaturePanel({
  item,
  testId,
  className = "",
  minHeightClass = "min-h-[320px] md:min-h-[380px]",
  mediaClassName = "",
  titleClassName = "text-[1.55rem] md:text-[1.8rem]",
}) {
  return (
    <article className={className}>
      <div
        className={`portfolio-item group relative overflow-hidden rounded-[32px] bg-slate-100 ring-1 ring-slate-200/70 ${minHeightClass}`}
        data-testid={testId}
      >
        <PortfolioMedia
          item={item}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${mediaClassName}`}
        />
        <div className={portfolioFeatureOverlayClass} />
        <div className="absolute inset-x-0 bottom-0 px-6 py-6 md:px-8 md:py-8">
          <div className="max-w-[26rem] text-white subpixel-antialiased">
            <span className={portfolioTagClass}>{item.tag}</span>
            <p className={portfolioMetaClass}>{item.lieu}</p>
            <h4 className={`${portfolioTitleClass} ${titleClassName}`}>{item.title}</h4>
            {item.desc && <p className={portfolioDescClass}>{item.desc}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}

function PortfolioEditorialTile({ item, testId, mediaClassName = "" }) {
  return (
    <article data-testid={testId} className="group">
      <div className="overflow-hidden rounded-[26px] bg-slate-100 ring-1 ring-slate-200/70">
        <div className="aspect-[1.12/1] overflow-hidden">
          <PortfolioMedia
            item={item}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${mediaClassName}`}
          />
        </div>
      </div>
      <div className="mt-4 border-t border-slate-200/80 pt-4">
        <p className={portfolioTileTagClass}>{item.tag}</p>
        <h4 className="mt-2 font-heading text-lg font-semibold text-brand-navy">{item.title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.lieu}</p>
      </div>
    </article>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] } }),
};

export default function Accueil() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    if (!API) return;
    axios.get(`${API}/testimonials`).then(r => setTestimonials(r.data)).catch(() => {});
  }, []);

  return (
    <div data-testid="accueil-page">
      {/* HERO */}
      <section data-testid="hero-section" className="relative h-screen min-h-[700px] overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div key={idx} className={`hero-slide ${idx === currentSlide ? "active" : ""}`}>
            <img src={publicAsset(slide.image)} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
            <motion.div initial="hidden" animate="visible" className="max-w-2xl">
              <motion.p variants={fadeUp} custom={0} className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-6">
                ABS Cloison - 30 ans d'expérience
              </motion.p>
              <motion.h1 variants={fadeUp} custom={1} className="font-heading font-light text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] mb-6">
                L'élégance de la<br />
                <span className="font-semibold">transparence</span>,<br />
                <span className="font-accent italic text-brand-gold">l'exigence</span> de l'acoustique
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                Spécialiste de la vente et pose de cloisons amovibles haut de gamme. Région lyonnaise et partout en France.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  data-testid="hero-cta-devis"
                  className="bg-brand-gold text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-all duration-300 text-center"
                >
                  Demander un devis gratuit
                </Link>
                <Link
                  to="/nos-systemes"
                  data-testid="hero-cta-systemes"
                  className="border border-white/30 text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-brand-navy transition-all duration-300 text-center"
                >
                  Découvrir nos systèmes
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              data-testid={`hero-slide-dot-${idx}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentSlide ? "w-10 bg-brand-gold" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* PROMISES */}
      <section data-testid="promises-section" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {promises.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
                data-testid={`promise-card-${idx}`}
                className="stat-card p-8 bg-slate-50 hover:bg-white transition-colors duration-300"
              >
                <item.icon className="w-8 h-8 text-brand-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER SLIDER */}
      <section data-testid="before-after-section" className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">Transformation</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy mb-4">
                Avant / Après
              </h2>
              <p className="text-slate-500 max-w-xl mb-8">
                Une lecture simple de l'avant et de l'après pour montrer comment un plateau devient un environnement plus lisible, plus calme et mieux sécurisé.
              </p>
              <div className="section-divider mb-8" />

              <div className="space-y-3">
                {transformationHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4"
                  >
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white">
                      <item.icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-brand-navy mb-1">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <BeforeAfterSlider />
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Cette comparaison illustre la logique de nos aménagements : séparer sans alourdir, structurer sans perdre la lumière, et intégrer les usages au quotidien.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NOS SYSTEMES */}
      <section data-testid="systems-preview-section" className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">Nos {systems.length} Solutions</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy mb-4">
              Des systèmes d'exception
            </h2>
            <p className="text-slate-500 max-w-2xl mb-4">
              Région lyonnaise et intervention partout en France.
            </p>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((sys, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
              >
                <Link
                  to="/nos-systemes"
                  data-testid={`system-card-${idx}`}
                  className="group block card-lift bg-white border border-slate-100 overflow-hidden"
                >
                  <div className="img-zoom aspect-[4/5] relative bg-slate-100">
                    <img src={publicAsset(sys.image)} alt={sys.title} className="h-full w-full object-cover object-center" />
                    <span className="absolute top-4 left-4 bg-brand-navy text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5">
                      {sys.tag}
                    </span>
                  </div>
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <sys.icon className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />
                      <h3 className="font-heading font-bold text-lg text-brand-navy">{sys.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{sys.desc}</p>
                    <span className="flex items-center gap-2 text-brand-gold text-sm font-semibold group-hover:gap-3 transition-all">
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section data-testid="stats-section" className="py-20 md:py-28 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
                data-testid={`stat-item-${idx}`}
                className="text-center"
              >
                <div className="font-heading font-bold text-4xl md:text-5xl text-brand-gold mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS TRUST SECTION */}
      <ClientsCarousel />

      {/* REAL PHOTOS PORTFOLIO PREVIEW */}
      <section data-testid="portfolio-preview" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">Nos réalisations</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy mb-4">
              L'excellence en images
            </h2>
            <p className="text-slate-500 max-w-xl mb-6">
              Une sélection resserrée pour montrer les accès, les circulations et la précision des finitions.
            </p>
            <div className="section-divider" />
          </motion.div>

          <div className="space-y-10">
            <div className="grid gap-8 lg:grid-cols-2 xl:gap-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="h-full"
              >
                <PortfolioFeaturePanel
                  item={featuredPortfolioItem}
                  testId="portfolio-preview-0"
                  minHeightClass="min-h-[360px] md:min-h-[460px] xl:min-h-[520px]"
                  mediaClassName="object-center"
                  titleClassName="text-[1.9rem] md:text-[2.3rem]"
                />
              </motion.div>

              <div className="grid gap-8 h-full">
                {supportingPortfolioItems.map((item, idx) => (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx + 1}
                    className="h-full"
                  >
                    <PortfolioFeaturePanel
                      item={item}
                      testId={`portfolio-preview-${idx + 1}`}
                      minHeightClass="min-h-[360px] md:min-h-[460px] xl:min-h-[520px]"
                      mediaClassName="object-center"
                      titleClassName="text-[1.9rem] md:text-[2.15rem]"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-8 md:pt-10">
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {editorialPortfolioTiles.map((item, idx) => (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx + 3}
                  >
                    <PortfolioEditorialTile
                      item={item}
                      testId={`portfolio-preview-detail-${idx}`}
                      mediaClassName={item === passagePortfolioItem ? "object-center" : ""}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              data-testid="see-all-portfolio"
              className="inline-flex items-center gap-2 border border-brand-navy text-brand-navy px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-navy hover:text-white transition-all duration-300"
            >
              Voir toutes nos réalisations <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section data-testid="testimonials-section" className="py-20 md:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
              <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">Témoignages</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy mb-6">
                Ils nous font confiance
              </h2>
              <div className="section-divider" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={idx}
                  data-testid={`testimonial-${idx}`}
                  className="testimonial-card py-8"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.note }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6 italic">"{t.texte}"</p>
                  <div>
                    <p className="font-heading font-bold text-brand-navy text-sm">{t.nom}</p>
                    <p className="text-slate-400 text-xs">{t.poste} - {t.entreprise}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section data-testid="cta-section" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={publicAsset("/systems/cta-bureau-transforme.png")}
            alt="Bureau transformé"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/85" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Prêt à transformer<br />votre espace ?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
              Obtenez votre devis personnalisé sous 48h. Conseil technique gratuit.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                data-testid="cta-devis-bottom"
                className="bg-brand-gold text-white px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-all duration-300"
              >
                Demander un devis
              </Link>
              <a
                href="tel:0753801260"
                data-testid="cta-phone-bottom"
                className="border border-white/30 text-white px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-brand-navy transition-all duration-300"
              >
                07 53 80 12 60
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
