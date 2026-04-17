import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight, Check, Shield, Clock, Blocks, Award } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { publicAsset } from "@/lib/publicAsset";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] } }),
};

const cities = {
  lyon: {
    name: "Lyon",
    region: "Rhône (69)",
    codePostal: "69000",
    description: "Depuis notre siège d'Anse, ABS Cloison intervient sur l'ensemble de la métropole de Lyon pour l'installation de cloisons amovibles haut de gamme. Bureaux du 6ème, Part-Dieu, Confluence ou Gerland : nous transformons vos espaces professionnels avec élégance et performance acoustique.",
    specificContent: "Lyon, capitale de la région Auvergne-Rhône-Alpes, est un pôle économique majeur avec des milliers d'entreprises nécessitant des aménagements de bureaux modernes. ABS Cloison accompagne les entreprises lyonnaises dans la création d'espaces de travail optimisés, du centre-ville aux zones d'activité périphériques.",
    quartiers: ["Part-Dieu", "Confluence", "Gerland", "Vaise", "6ème arrondissement", "3ème arrondissement"],
    distance: "25 km",
  },
  villeurbanne: {
    name: "Villeurbanne",
    region: "Rhône (69)",
    codePostal: "69100",
    description: "ABS Cloison réalise de nombreux projets d'aménagement à Villeurbanne, ville dynamique aux portes de Lyon. Nos cloisons vitrées et acoustiques équipent les espaces de coworking, les sièges sociaux et les laboratoires de recherche de la métropole.",
    specificContent: "Villeurbanne, avec son pôle universitaire et ses zones d'activité comme le Tonkin ou Charpennes, attire de nombreuses entreprises innovantes. ABS Cloison propose des solutions de cloisonnement adaptées aux espaces modernes et aux contraintes acoustiques des environnements de travail partagés.",
    quartiers: ["Tonkin", "Charpennes", "Gratte-Ciel", "République", "Cusset"],
    distance: "27 km",
  },
  ecully: {
    name: "Écully",
    region: "Rhône (69)",
    codePostal: "69130",
    description: "ABS Cloison intervient à Écully pour l'aménagement de bureaux premium dans les zones d'activité et les campus d'entreprises. Nos solutions de cloisons vitrées sans montants visibles sont particulièrement prisées par les entreprises écullioises.",
    specificContent: "Écully, commune résidentielle et économique de l'Ouest lyonnais, abrite de nombreux sièges sociaux et le campus d'emlyon. ABS Cloison y réalise des installations de prestige pour des entreprises exigeantes en matière d'esthétique et de performance acoustique.",
    quartiers: ["Techlid", "Source", "Centre-ville", "Campus emlyon"],
    distance: "30 km",
  },
  anse: {
    name: "Anse",
    region: "Rhône (69)",
    codePostal: "69480",
    description: "Basée au 642 Route de Lyon à Anse, ABS Cloison est votre partenaire local pour tous vos projets de cloisonnement. Notre proximité nous permet d'intervenir rapidement et efficacement pour l'aménagement de vos espaces professionnels.",
    specificContent: "Anse, commune du Beaujolais aux portes de Lyon, est le siège d'ABS Cloison. Notre implantation locale nous donne une connaissance parfaite du tissu économique de la vallée de la Saône et nous permet de proposer un service réactif et personnalisé à toutes les entreprises du secteur.",
    quartiers: ["Centre-ville", "Zone d'activité", "Route de Lyon"],
    distance: "0 km (Siège)",
  },
  "caluire-et-cuire": {
    name: "Caluire-et-Cuire",
    region: "Rhône (69)",
    codePostal: "69300",
    description: "ABS Cloison aménage les bureaux et espaces professionnels de Caluire-et-Cuire avec des cloisons amovibles haut de gamme. Nos solutions allient design contemporain et performance technique pour des espaces de travail optimaux.",
    specificContent: "Caluire-et-Cuire, au nord de Lyon, est une commune dynamique avec un tissu économique varié. ABS Cloison y intervient pour des projets allant de la création de bureaux individuels à la transformation complète de plateaux d'entreprise.",
    quartiers: ["Cuire", "Saint-Clair", "Montessuy", "Centre"],
    distance: "22 km",
  },
  "villefranche-sur-saone": {
    name: "Villefranche-sur-Saône",
    region: "Rhône (69)",
    codePostal: "69400",
    description: "ABS Cloison accompagne les entreprises de Villefranche-sur-Saône et du Beaujolais dans leurs projets d'aménagement de bureaux. Notre expertise en cloisons acoustiques et vitrées répond aux besoins spécifiques de la capitale du Beaujolais.",
    specificContent: "Villefranche-sur-Saône, sous-préfecture du Rhône et capitale du Beaujolais, est un centre économique important. ABS Cloison, située à proximité à Anse, est le partenaire idéal pour l'aménagement de vos locaux professionnels.",
    quartiers: ["Centre-ville", "Zone industrielle Nord", "Gleizé", "Arnas"],
    distance: "5 km",
  },
  "saint-priest": {
    name: "Saint-Priest",
    region: "Rhône (69)",
    codePostal: "69800",
    description: "ABS Cloison réalise des aménagements de bureaux haut de gamme à Saint-Priest, dans les zones d'activité et parcs technologiques de l'Est lyonnais. Cloisons vitrées et acoustiques pour vos espaces professionnels.",
    specificContent: "Saint-Priest, dans l'Est lyonnais, concentre de nombreuses zones d'activité et entreprises industrielles et tertiaires. ABS Cloison intervient sur l'ensemble de la commune pour des installations de cloisons amovibles sur mesure.",
    quartiers: ["Mi-Plaine", "Berliet", "Zone Industrielle", "Centre"],
    distance: "35 km",
  },
  "vaulx-en-velin": {
    name: "Vaulx-en-Velin",
    region: "Rhône (69)",
    codePostal: "69120",
    description: "ABS Cloison intervient à Vaulx-en-Velin pour l'aménagement d'espaces professionnels avec des solutions de cloisonnement premium. Nos cloisons vitrées et acoustiques transforment les bureaux et espaces de travail de la commune.",
    specificContent: "Vaulx-en-Velin, en pleine transformation urbaine, accueille de nombreuses entreprises qui nécessitent des aménagements de bureaux modernes et performants. ABS Cloison propose des solutions adaptées à tous les budgets et toutes les exigences.",
    quartiers: ["Carré de Soie", "La Soie", "Centre-ville", "Sept Chemins"],
    distance: "30 km",
  },
};

const services = [
  "Cloisons vitrées bord à bord",
  "Cloisons vitrées sur allège",
  "Cloisons pleines acoustiques",
  "Portes coulissantes vitrées",

  "Phone box et bulles d'isolation",
  "Installation en site occupé",
  "Intervention partout en France",
];

const promises = [
  { icon: Shield, title: "Garantie Décennale" },
  { icon: Clock, title: "Intervention Rapide" },
  { icon: Blocks, title: "Modularité Totale" },
  { icon: Award, title: "Aménagement Propre" },
];

export default function VilleSEO() {
  const { ville } = useParams();
  const city = cities[ville];

  if (!city) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="font-heading font-bold text-3xl text-brand-navy mb-4">Ville non trouvée</h1>
        <Link to="/" className="text-brand-gold hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ABS Cloison",
    "description": `Pose de cloisons amovibles haut de gamme à ${city.name}. Cloisons vitrées et acoustiques.`,
    "url": `https://abscloison.fr/cloison-amovible-${ville}`,
    "telephone": "+33753801260",
    "email": "abscloison@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "642 Route de Lyon",
      "addressLocality": "Anse",
      "postalCode": "69480",
      "addressRegion": "Rhône",
      "addressCountry": "FR"
    },
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00",
    "sameAs": []
  };

  return (
    <div data-testid={`seo-page-${ville}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={publicAsset("/systems/cta-bureau-transforme.png")}
            alt="" className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase">
                {city.name} - {city.region}
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Cloison amovible à {city.name}<br />
              <span className="font-accent italic text-brand-gold">Pose et installation</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-8">
              {city.description}
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-brand-gold text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-all text-center">
                Devis gratuit à {city.name}
              </Link>
              <a href="tel:0753801260" className="border border-white/30 text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-brand-navy transition-all text-center">
                07 53 80 12 60
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-2">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeUp} className="font-heading font-bold text-2xl md:text-3xl text-brand-navy mb-6">
                  Spécialiste des cloisons amovibles à {city.name}
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="text-slate-500 leading-relaxed mb-6">
                  {city.specificContent}
                </motion.p>
                <motion.p variants={fadeUp} custom={2} className="text-slate-500 leading-relaxed mb-8">
                  Que vous souhaitiez créer des bureaux individuels, aménager des salles de réunion acoustiques ou transformer un open space, ABS Cloison vous accompagne avec des solutions sur mesure adaptées à vos contraintes et à votre budget.
                </motion.p>

                <motion.h3 variants={fadeUp} custom={3} className="font-heading font-bold text-xl text-brand-navy mb-4">
                  Nos services à {city.name}
                </motion.h3>
                <motion.div variants={fadeUp} custom={4} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {services.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{s}</span>
                    </div>
                  ))}
                </motion.div>

                {city.quartiers && (
                  <>
                    <motion.h3 variants={fadeUp} custom={5} className="font-heading font-bold text-xl text-brand-navy mb-4">
                      Zones d'intervention à {city.name}
                    </motion.h3>
                    <motion.div variants={fadeUp} custom={6} className="flex flex-wrap gap-2 mb-8">
                      {city.quartiers.map((q, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 text-sm px-4 py-2">
                          {q}
                        </span>
                      ))}
                    </motion.div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-28 space-y-6">
                <div className="bg-slate-50 p-6 border border-slate-200">
                  <h4 className="font-heading font-bold text-brand-navy mb-4">ABS Cloison</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-brand-gold mt-0.5" />
                      <span className="text-slate-600">642 Route de Lyon, Anse</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-brand-gold mt-0.5" />
                      <a href="tel:0753801260" className="text-slate-600 hover:text-brand-navy">07 53 80 12 60</a>
                    </div>
                    <p className="text-slate-400 text-xs pt-2 border-t border-slate-200">
                      Distance depuis notre siège : {city.distance}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {promises.map((p, i) => (
                    <div key={i} className="p-4 bg-brand-navy text-white text-center">
                      <p.icon className="w-5 h-5 text-brand-gold mx-auto mb-2" strokeWidth={1.5} />
                      <p className="text-xs font-semibold">{p.title}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  data-testid={`seo-cta-${ville}`}
                  className="block text-center bg-brand-gold text-white py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-colors"
                >
                  Devis gratuit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER CITIES */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h3 className="font-heading font-bold text-xl text-brand-navy mb-6">
            Nous intervenons également à proximité
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(cities)
              .filter(([key]) => key !== ville)
              .map(([key, c]) => (
                <Link
                  key={key}
                  to={`/cloison-amovible/${key}`}
                  data-testid={`city-link-${key}`}
                  className="bg-white border border-slate-200 text-slate-600 hover:border-brand-gold hover:text-brand-navy text-sm px-4 py-2 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export { cities };
