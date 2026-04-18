import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : null;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] } }),
};

const cloisonTypes = [
  { value: "vitree", label: "Cloison Vitrée", desc: "Transparence et lumière" },
  { value: "allege", label: "Vitrée sur allège", desc: "Intimité et luminosité" },
  { value: "pleine", label: "Cloison Pleine", desc: "Acoustique et confidentialité" },
  { value: "coulissante", label: "Porte Coulissante", desc: "Fluidité et élégance" },
  { value: "phonebox", label: "Phone Box", desc: "Bulle d'isolation acoustique" },
  { value: "mixte", label: "Solution Mixte", desc: "Combinaison sur mesure" },
];

const confidentialiteLevels = [
  { value: "standard", label: "Standard", desc: "Séparation visuelle, acoustique normale" },
  { value: "confidentiel", label: "Confidentiel", desc: "Isolation acoustique renforcée" },
  { value: "total", label: "Total", desc: "Isolation maximale, opacité complète" },
];

const stepLabels = ["Type", "Dimensions", "Acoustique", "Contact"];

export default function Contact() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cloison_type: "",
    metrage: "",
    hauteur: "",
    confidentialite: "",
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
    message: "",
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 0) return form.cloison_type !== "";
    if (step === 1) return true;
    if (step === 2) return true;
    if (step === 3) return form.nom && form.email && form.telephone;
    return false;
  };

  const handleSubmit = async () => {
    if (!canNext()) return;
    if (!API) {
      alert("Service temporairement indisponible. Veuillez nous appeler ou reessayer plus tard.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/devis`, form);
      setSubmitted(true);
    } catch {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  return (
    <div data-testid="contact-page">
      <Helmet>
        <title>Contact & Devis - ABS Cloison | Cloisons Amovibles Lyon</title>
        <meta name="description" content="Demandez votre devis gratuit pour des cloisons amovibles haut de gamme. ABS Cloison, spécialiste à Lyon. Réponse sous 48h." />
      </Helmet>
      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div initial="hidden" animate="visible">
            <motion.p variants={fadeUp} custom={0} className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              Contact & Devis
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-navy mb-6 leading-tight">
              Démarrez votre<br /><span className="font-accent italic text-brand-gold">transformation</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Devis gratuit sous 48h. Nos experts vous accompagnent de A à Z.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-slate-50 p-8 md:p-12" data-testid="devis-form-container">
                <h2 className="font-heading font-bold text-2xl text-brand-navy mb-8">
                  Demande de devis gratuit
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                    data-testid="devis-success"
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-brand-navy mb-3">
                      Demande envoyée
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      Merci pour votre demande. Un expert ABS Cloison vous recontactera sous 48h avec un devis personnalisé.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Step Indicator */}
                    <div className="flex items-center mb-10" data-testid="step-indicator">
                      {stepLabels.map((label, idx) => (
                        <div key={idx} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center">
                            <div
                              className={`step-dot ${
                                idx < step ? "completed" : idx === step ? "active" : "inactive"
                              }`}
                              data-testid={`step-dot-${idx}`}
                            >
                              {idx < step ? <Check className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span className="text-[10px] uppercase tracking-wider mt-2 text-slate-400 hidden sm:block">
                              {label}
                            </span>
                          </div>
                          {idx < stepLabels.length - 1 && (
                            <div className={`step-line mx-2 ${idx < step ? "active" : "inactive"}`} />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[280px]">
                      {/* Step 0: Type */}
                      {step === 0 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} data-testid="step-0-content">
                          <h3 className="font-heading font-semibold text-lg text-brand-navy mb-2">
                            Quel type de cloison recherchez-vous ?
                          </h3>
                          <p className="text-slate-400 text-sm mb-6">Sélectionnez la solution qui correspond à votre besoin.</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {cloisonTypes.map((type) => (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => update("cloison_type", type.value)}
                                data-testid={`cloison-type-${type.value}`}
                                className={`p-5 text-left border-2 transition-all duration-300 ${
                                  form.cloison_type === type.value
                                    ? "border-brand-navy bg-brand-navy text-white"
                                    : "border-slate-200 hover:border-brand-navy/30"
                                }`}
                              >
                                <p className={`font-heading font-bold text-sm ${form.cloison_type === type.value ? "text-white" : "text-brand-navy"}`}>
                                  {type.label}
                                </p>
                                <p className={`text-xs mt-1 ${form.cloison_type === type.value ? "text-slate-300" : "text-slate-400"}`}>
                                  {type.desc}
                                </p>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 1: Dimensions */}
                      {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} data-testid="step-1-content">
                          <h3 className="font-heading font-semibold text-lg text-brand-navy mb-2">
                            Dimensions estimées
                          </h3>
                          <p className="text-slate-400 text-sm mb-6">Ces informations nous aident à affiner votre devis. Estimations suffisantes.</p>
                          <div className="space-y-6">
                            <div>
                              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">
                                Métrage linéaire estimé (m)
                              </label>
                              <input
                                type="text"
                                value={form.metrage}
                                onChange={(e) => update("metrage", e.target.value)}
                                placeholder="Ex: 25m"
                                data-testid="metrage-input"
                                className="w-full h-12 bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 transition-colors placeholder:text-slate-300 text-brand-navy"
                              />
                            </div>
                            <div>
                              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">
                                Hauteur sous plafond (m)
                              </label>
                              <input
                                type="text"
                                value={form.hauteur}
                                onChange={(e) => update("hauteur", e.target.value)}
                                placeholder="Ex: 2.70m"
                                data-testid="hauteur-input"
                                className="w-full h-12 bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 transition-colors placeholder:text-slate-300 text-brand-navy"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Confidentiality */}
                      {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} data-testid="step-2-content">
                          <h3 className="font-heading font-semibold text-lg text-brand-navy mb-2">
                            Niveau de confidentialité souhaité
                          </h3>
                          <p className="text-slate-400 text-sm mb-6">Quel niveau d'isolation acoustique recherchez-vous ?</p>
                          <div className="space-y-3">
                            {confidentialiteLevels.map((level) => (
                              <button
                                key={level.value}
                                type="button"
                                onClick={() => update("confidentialite", level.value)}
                                data-testid={`confidentialite-${level.value}`}
                                className={`w-full p-5 text-left border-2 transition-all duration-300 ${
                                  form.confidentialite === level.value
                                    ? "border-brand-navy bg-brand-navy text-white"
                                    : "border-slate-200 hover:border-brand-navy/30"
                                }`}
                              >
                                <p className={`font-heading font-bold text-sm ${form.confidentialite === level.value ? "text-white" : "text-brand-navy"}`}>
                                  {level.label}
                                </p>
                                <p className={`text-xs mt-1 ${form.confidentialite === level.value ? "text-slate-300" : "text-slate-400"}`}>
                                  {level.desc}
                                </p>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Contact */}
                      {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} data-testid="step-3-content">
                          <h3 className="font-heading font-semibold text-lg text-brand-navy mb-2">
                            Vos coordonnées
                          </h3>
                          <p className="text-slate-400 text-sm mb-6">Nous vous recontacterons sous 48h avec votre devis personnalisé.</p>
                          <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div>
                                <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">Nom *</label>
                                <input
                                  type="text"
                                  value={form.nom}
                                  onChange={(e) => update("nom", e.target.value)}
                                  placeholder="Jean Dupont"
                                  required
                                  data-testid="contact-nom"
                                  className="w-full h-12 bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 transition-colors placeholder:text-slate-300 text-brand-navy"
                                />
                              </div>
                              <div>
                                <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">Entreprise</label>
                                <input
                                  type="text"
                                  value={form.entreprise}
                                  onChange={(e) => update("entreprise", e.target.value)}
                                  placeholder="Nom de l'entreprise"
                                  data-testid="contact-entreprise"
                                  className="w-full h-12 bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 transition-colors placeholder:text-slate-300 text-brand-navy"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">Email *</label>
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="jean@entreprise.com"
                                required
                                data-testid="contact-email"
                                className="w-full h-12 bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 transition-colors placeholder:text-slate-300 text-brand-navy"
                              />
                            </div>
                            <div>
                              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">Téléphone *</label>
                              <input
                                type="tel"
                                value={form.telephone}
                                onChange={(e) => update("telephone", e.target.value)}
                                placeholder="07 00 00 00 00"
                                required
                                data-testid="contact-telephone"
                                className="w-full h-12 bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 transition-colors placeholder:text-slate-300 text-brand-navy"
                              />
                            </div>
                            <div>
                              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">Message (optionnel)</label>
                              <textarea
                                value={form.message}
                                onChange={(e) => update("message", e.target.value)}
                                placeholder="Décrivez brièvement votre projet..."
                                rows={3}
                                data-testid="contact-message"
                                className="w-full bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 pt-3 transition-colors placeholder:text-slate-300 text-brand-navy resize-none"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                      {step > 0 ? (
                        <button
                          onClick={() => setStep(step - 1)}
                          data-testid="form-prev-btn"
                          className="flex items-center gap-2 text-slate-500 hover:text-brand-navy text-sm font-medium transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" /> Précédent
                        </button>
                      ) : (
                        <div />
                      )}
                      <button
                        onClick={next}
                        disabled={!canNext() || loading}
                        data-testid="form-next-btn"
                        className="flex items-center gap-2 bg-brand-navy text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-brand-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {loading ? "Envoi..." : step === 3 ? "Envoyer la demande" : "Suivant"}
                        {!loading && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 space-y-8">
                <div>
                  <h3 className="font-heading font-bold text-xl text-brand-navy mb-6">
                    Nous contacter directement
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-brand-navy">Adresse</p>
                        <p className="text-slate-500 text-sm">642 Route de Lyon, Anse</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-brand-navy">Téléphone</p>
                        <a href="tel:0753801260" className="text-slate-500 hover:text-brand-navy text-sm transition-colors block">07 53 80 12 60</a>
                        <a href="tel:0482839186" className="text-slate-500 hover:text-brand-navy text-sm transition-colors block">04 82 83 91 86</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-brand-navy">Email</p>
                        <a href="mailto:abscloison@gmail.com" className="text-slate-500 hover:text-brand-navy text-sm transition-colors">abscloison@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-brand-navy">Horaires</p>
                        <p className="text-slate-500 text-sm">Lun - Ven : 8h00 - 18h00</p>
                        <p className="text-slate-500 text-sm">Sam : Sur rendez-vous</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="p-6 bg-slate-50 border border-slate-200">
                  <h4 className="font-heading font-bold text-sm text-brand-navy mb-4 uppercase tracking-wider">
                    Nos Engagements
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Devis gratuit sous 48h",
                      "Garantie décennale",
                      "Installation en site occupé",
                      "Aménagement propre garanti",
                      "Conseil technique gratuit",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS */}
      <section data-testid="google-maps-section" className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8">
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4">Localisation</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-navy mb-2">
              Nous trouver
            </h2>
            <p className="text-slate-500 text-sm">642 Route de Lyon, 69480 Anse - Intervention sur toute la région lyonnaise</p>
          </motion.div>
          <div className="w-full h-[400px] border border-slate-200">
            <iframe
              title="ABS Cloison - Localisation"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776.8!2d4.7167!3d45.9353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c1c7f3b7c9e7%3A0x0!2s642+Route+de+Lyon%2C+69480+Anse!5e0!3m2!1sfr!2sfr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="google-maps-embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
