import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Volume2, Flame, Award, ClipboardCheck, Wrench, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] } }),
};

const expertiseAreas = [
  {
    icon: Volume2,
    title: "Performance Acoustique",
    description: "Nos systèmes sont testés et certifiés selon les normes NF EN ISO 140-3. L'indice d'affaiblissement acoustique Rw peut atteindre 50dB pour nos cloisons pleines et 42dB pour nos vitrées.",
    details: [
      { label: "Cloisons Pleines", value: "Rw jusqu'à 50dB", highlight: true },
      { label: "Cloisons Vitrées", value: "Rw jusqu'à 42dB", highlight: false },
      { label: "Murs Mobiles", value: "Rw jusqu'à 56dB", highlight: true },
      { label: "Norme", value: "NF EN ISO 140-3", highlight: false },
    ],
  },
  {
    icon: Flame,
    title: "Résistance au Feu",
    description: "La sécurité incendie est au coeur de notre approche. Nos cloisons coupe-feu sont certifiées de EI30 à EI120, assurant une protection maximale pour vos espaces.",
    details: [
      { label: "Certification minimale", value: "EI30", highlight: false },
      { label: "Certification maximale", value: "EI120", highlight: true },
      { label: "Essais", value: "Laboratoire CSTB", highlight: false },
      { label: "Conformité", value: "Réglementation ERP", highlight: true },
    ],
  },
  {
    icon: Shield,
    title: "Certifications & Garanties",
    description: "Toutes nos installations sont couvertes par la garantie décennale. Nos produits répondent aux exigences les plus strictes de la construction professionnelle.",
    details: [
      { label: "Garantie", value: "Décennale (10 ans)", highlight: true },
      { label: "Qualification", value: "QUALIBAT", highlight: false },
      { label: "Assurance", value: "RC Professionnelle", highlight: false },
      { label: "Normes", value: "DTU & Eurocode", highlight: true },
    ],
  },
];

const processSteps = [
  {
    num: "01",
    icon: ClipboardCheck,
    title: "Étude & Conseil",
    desc: "Analyse de vos besoins, visite technique sur site, recommandations personnalisées et devis détaillé gratuit.",
  },
  {
    num: "02",
    icon: Wrench,
    title: "Conception",
    desc: "Plans d'exécution, choix des matériaux et finitions, validation technique et planning d'intervention.",
  },
  {
    num: "03",
    icon: Shield,
    title: "Installation",
    desc: "Pose par nos techniciens qualifiés en site occupé. Aménagement propre, respect des délais.",
  },
  {
    num: "04",
    icon: Award,
    title: "Livraison & Suivi",
    desc: "Réception des travaux, formation à l'utilisation, garantie décennale et service après-vente réactif.",
  },
];

const acousticScale = [
  { db: "25dB", label: "Chuchotement", color: "bg-green-200" },
  { db: "35dB", label: "Bureau calme", color: "bg-green-300" },
  { db: "42dB", label: "Cloison vitrée ABS", color: "bg-brand-gold" },
  { db: "50dB", label: "Cloison pleine ABS", color: "bg-brand-gold" },
  { db: "56dB", label: "Mur mobile ABS", color: "bg-brand-gold" },
  { db: "60dB", label: "Conversation normale", color: "bg-orange-300" },
  { db: "80dB", label: "Trafic routier", color: "bg-red-300" },
];

export default function Expertise() {
  return (
    <div data-testid="expertise-page">
      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" animate="visible">
            <motion.p variants={fadeUp} custom={0} className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              Expertise Technique
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-navy mb-6 leading-tight">
              La science du<br /><span className="font-accent italic text-brand-gold">confort acoustique</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Indices d'affaiblissement, résistance au feu, certifications : notre expertise technique est votre garantie de performance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ACOUSTIC SCALE */}
      <section data-testid="acoustic-scale" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-navy mb-4">
              Échelle Acoustique
            </h2>
            <p className="text-slate-500 max-w-2xl">
              Comprenez l'impact de nos solutions sur le confort sonore de vos espaces.
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="space-y-3">
            {acousticScale.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
                className="flex items-center gap-4"
              >
                <span className="w-14 text-right font-heading font-bold text-brand-navy text-sm">{item.db}</span>
                <div className="flex-1 h-10 bg-slate-100 relative overflow-hidden rounded-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((idx + 1) / acousticScale.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full ${item.color} flex items-center justify-end pr-3`}
                  >
                    <span className="text-xs font-semibold text-brand-navy whitespace-nowrap">{item.label}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE AREAS */}
      {expertiseAreas.map((area, idx) => (
        <section
          key={idx}
          data-testid={`expertise-area-${idx}`}
          className={`py-20 md:py-28 ${idx % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-brand-navy flex items-center justify-center">
                    <area.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-navy">
                    {area.title}
                  </h2>
                </motion.div>
                <motion.p variants={fadeUp} custom={1} className="text-slate-500 leading-relaxed text-lg">
                  {area.description}
                </motion.p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="grid grid-cols-2 gap-4">
                  {area.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      custom={i}
                      className={`p-6 ${detail.highlight ? "bg-brand-navy text-white" : "bg-white border border-slate-200"}`}
                    >
                      <p className={`text-xs uppercase tracking-wider mb-2 ${detail.highlight ? "text-brand-gold" : "text-slate-400"}`}>
                        {detail.label}
                      </p>
                      <p className={`font-heading font-bold text-lg ${detail.highlight ? "text-white" : "text-brand-navy"}`}>
                        {detail.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* PROCESS */}
      <section data-testid="process-section" className="py-20 md:py-32 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              Notre Processus
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
              De l'étude à la livraison
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
                data-testid={`process-step-${idx}`}
                className="relative"
              >
                <span className="font-heading font-bold text-6xl text-white/5 absolute -top-4 -left-2">
                  {step.num}
                </span>
                <div className="relative pt-8">
                  <step.icon className="w-8 h-8 text-brand-gold mb-4" strokeWidth={1.5} />
                  <h3 className="font-heading font-bold text-white text-lg mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="font-heading font-bold text-3xl md:text-4xl text-brand-navy mb-6">
              Une question technique ?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-slate-500 text-lg mb-10">
              Nos experts sont à votre disposition pour vous conseiller sur la meilleure solution pour votre projet.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                data-testid="expertise-cta"
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-navy-light transition-colors"
              >
                Contactez nos experts <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
