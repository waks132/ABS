import { useState } from "react";
import { Phone, X, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : null;

export default function StickyButton() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [nom, setNom] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    if (!API) {
      alert("Service temporairement indisponible. Veuillez nous appeler ou reessayer plus tard.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/rappel`, { telephone: phone, nom: nom || undefined });
      setSubmitted(true);
    } catch {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Desktop: Side Tab */}
      <div className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          data-testid="sticky-cta-desktop"
          onClick={() => setOpen(true)}
          className="bg-brand-gold hover:bg-brand-gold-light text-white px-3 py-6 rounded-l-lg shadow-lg transition-all duration-300 hover:px-4 group"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
            <Ruler className="w-4 h-4 rotate-90" />
            Conseil technique
          </span>
        </button>
      </div>

      {/* Mobile: Floating Button */}
      <button
        data-testid="sticky-cta-mobile"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-gold hover:bg-brand-gold-light text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 pulse-ring"
      >
        <Phone className="w-5 h-5" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => { setOpen(false); setSubmitted(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md p-8 shadow-2xl"
              data-testid="rappel-modal"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-xl text-brand-navy">
                  {submitted ? "Demande envoyée" : "On vous rappelle"}
                </h3>
                <button
                  onClick={() => { setOpen(false); setSubmitted(false); }}
                  data-testid="close-rappel-modal"
                  className="text-slate-400 hover:text-brand-navy transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div data-testid="rappel-success">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-center text-slate-600 mb-2">
                    Un conseiller technique vous rappelle
                  </p>
                  <p className="text-center text-brand-gold font-bold text-lg">
                    sous 15 minutes
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-slate-500 text-sm mb-4">
                    Conseil technique gratuit. Un expert vous rappelle sous 15 minutes.
                  </p>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">
                      Votre nom
                    </label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Jean Dupont"
                      data-testid="rappel-nom-input"
                      className="w-full h-12 bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 transition-colors placeholder:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">
                      Votre téléphone *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07 00 00 00 00"
                      required
                      data-testid="rappel-phone-input"
                      className="w-full h-12 bg-transparent border-b border-slate-200 focus:border-brand-navy focus:outline-none px-0 transition-colors placeholder:text-slate-300 text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="rappel-submit-btn"
                    className="w-full bg-brand-navy text-white h-12 text-sm font-semibold tracking-wider uppercase hover:bg-brand-navy-light transition-colors disabled:opacity-50"
                  >
                    {loading ? "Envoi..." : "Demander un rappel"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
