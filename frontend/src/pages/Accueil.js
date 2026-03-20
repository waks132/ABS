import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Clock, Blocks, Award, ArrowRight, ChevronRight, Star, Volume2, Maximize2, Eye, PanelTop, DoorOpen, Headphones } from "lucide-react";
import axios from "axios";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const heroSlides = [
  {
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/1507d3bcd194f4e0485d214aafc3a8598d322e4224359a5026bb88d60656f7eb.png",
    alt: "Cloisons vitrées haut de gamme"
  },
  {
    image: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/kk51kuyc_IMG-20260318-WA0015.jpg",
    alt: "Installation de cloisons vitrées"
  },
  {
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/83edbda040d467ca43b00584687d301b51d1431ae132839ffc7f7cbae0bdfff7.png",
    alt: "Transformation d'espace de bureau"
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
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/1507d3bcd194f4e0485d214aafc3a8598d322e4224359a5026bb88d60656f7eb.png",
    icon: Eye,
    tag: "Best-seller",
  },
  {
    title: "Vitrées sur Allège",
    desc: "Soubassement plein pour intimité et câblage, partie haute vitrée pour la lumière naturelle.",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/1ac9a27799c98e563545a877cfb31d0d4863c8f0045eeaab1b739722d15d064e.png",
    icon: PanelTop,
    tag: "Polyvalent",
  },
  {
    title: "Cloisons Pleines Acoustiques",
    desc: "Finitions haut de gamme en bois et tissu. Performance acoustique jusqu'à 50dB.",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/8058b222ce41d61914c2a04595441fe394564838a8ef1cbc18a196633eee740e.png",
    icon: Volume2,
    tag: "Acoustique",
  },
  {
    title: "Portes Coulissantes",
    desc: "Rail apparent ou encastré, soft-close. Fluidité de circulation et élégance architecturale.",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/5c7039b31efd8060bc11f4f3754d788de688a2290ecbd461821889c4bfdb3f2f.png",
    icon: DoorOpen,
    tag: "Élégance",
  },
  {
    title: "Murs Mobiles",
    desc: "Séparation dynamique pour salles de réunion. Modularité maximale pour espaces évolutifs.",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/fe25494c308e732490812b3434230a9801714450e42f1048a92cddb060b80039.png",
    icon: Maximize2,
    tag: "Modulable",
  },
  {
    title: "Phone Box & Bulles d'Isolation",
    desc: "Cabines acoustiques plug & play. Concentration et confidentialité en open space.",
    image: "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/06cbd343ec18aa745dc4c6c63b71d0e663c5ced31df4f49d636e80b2dcaaa9e8.png",
    icon: Headphones,
    tag: "Tendance",
  },
];

const stats = [
  { value: "15+", label: "Années d'expérience" },
  { value: "500+", label: "Projets réalisés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "48h", label: "Délai de réponse" },
];

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
    axios.get(`${API}/testimonials`).then(r => setTestimonials(r.data)).catch(() => {});
  }, []);

  return (
    <div data-testid="accueil-page">
      {/* HERO */}
      <section data-testid="hero-section" className="relative h-screen min-h-[700px] overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div key={idx} className={`hero-slide ${idx === currentSlide ? "active" : ""}`}>
            <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
            <motion.div initial="hidden" animate="visible" className="max-w-2xl">
              <motion.p variants={fadeUp} custom={0} className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-6">
                ABS Cloison - Depuis 2009
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
      <section data-testid="before-after-section" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">Transformation</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy mb-4">
              Avant / Après
            </h2>
            <p className="text-slate-500 max-w-2xl">
              Glissez pour découvrir la transformation spectaculaire de vos espaces avec nos solutions de cloisonnement.
            </p>
            <div className="section-divider mt-4" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </section>

      {/* NOS SYSTEMES */}
      <section data-testid="systems-preview-section" className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">Nos 6 Solutions</p>
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
                  <div className="img-zoom aspect-[4/3] relative">
                    <img src={sys.image} alt={sys.title} className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 bg-brand-navy text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5">
                      {sys.tag}
                    </span>
                  </div>
                  <div className="p-8">
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

      {/* REAL PHOTOS PORTFOLIO PREVIEW */}
      <section data-testid="portfolio-preview" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">Nos Réalisations</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy mb-6">
              L'excellence en images
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { img: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/kk51kuyc_IMG-20260318-WA0015.jpg", title: "Cloisons Vitrées", lieu: "Lyon" },
              { img: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/gn7jonju_IMG-20260318-WA0011.jpg", title: "Installation en Site Occupé", lieu: "Villeurbanne" },
              { img: "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/7qtav35z_IMG-20260318-WA0021.jpg", title: "Aménagement Technique", lieu: "Anse" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
              >
                <div className="portfolio-item aspect-[4/3] cursor-pointer" data-testid={`portfolio-preview-${idx}`}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="overlay">
                    <div className="overlay-content text-white">
                      <p className="text-brand-gold text-xs uppercase tracking-widest mb-1">{item.lieu}</p>
                      <h4 className="font-heading font-bold text-lg">{item.title}</h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            src="https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/83edbda040d467ca43b00584687d301b51d1431ae132839ffc7f7cbae0bdfff7.png"
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
