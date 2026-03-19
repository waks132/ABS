# ABS CLOISON - PRD (Product Requirements Document)

## Problème Initial
Création d'un site vitrine haut de gamme pour ABS CLOISON, entreprise de vente et pose de cloisons amovibles premium en région lyonnaise. Le site doit fusionner esthétique luxueuse et crédibilité technique, optimisé pour la conversion publicitaire.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + React Router + React Helmet Async
- **Backend**: FastAPI + MongoDB (Motor async) + Resend (email)
- **Design**: Minimaliste architectural nordique (Navy #0F172A, Gold #CCA43B)
- **Fonts**: Manrope (headings), DM Sans (body), Playfair Display (accents)

## Informations Entreprise
- **Nom**: ABS 69 (Au Bon Service) / ABS CLOISON
- **Adresse**: 642 Route de Lyon, 69480 Anse
- **Tél**: 07 53 80 12 60 / 04 82 83 91 86
- **Email**: abscloison@gmail.com
- **Slogan**: "L'élégance de la transparence, l'exigence de l'acoustique"

## User Personas
1. **Directeur d'entreprise** - Cherche à transformer ses bureaux
2. **Architecte/Designer** - Besoin de solutions techniques premium
3. **Office Manager** - Optimise les espaces de travail

## Implémenté

### Session 1 (19 mars 2026)
- [x] **Accueil** - Hero slider, promesses, systèmes, stats, portfolio preview, témoignages, CTA
- [x] **Nos Systèmes** - Fiches produits détaillées (Vitrées, Pleines, Mobiles) avec specs
- [x] **Expertise** - Échelle acoustique, certifications, process 4 étapes
- [x] **Portfolio** - Galerie filtrable, vidéos réelles, modal détail
- [x] **Contact** - Formulaire devis 4 étapes, infos, badges confiance
- [x] Navigation responsive avec effet glass
- [x] Bouton sticky "Conseil technique"
- [x] Backend API complet (devis, contact, rappel, testimonials, portfolio)
- Tests: Backend 100%, Frontend 95%

### Session 2 (19 mars 2026)
- [x] **Logo SVG** - Logo architectural avec icône de cloisons (cadre + vitrage doré)
- [x] **Slider Avant/Après** - Comparaison interactive drag-to-compare
- [x] **Pages SEO locales** - 8 villes (Lyon, Villeurbanne, Écully, Anse, Caluire, Villefranche, Saint-Priest, Vaulx-en-Velin)
- [x] **Google Maps** - Iframe intégré sur page Contact (642 Route de Lyon, Anse)
- [x] **JSON-LD Schema** - Données structurées LocalBusiness complètes
- [x] Footer avec liens "Zones d'Intervention"
- [x] React Helmet pour meta tags par page
- Tests: Frontend 100% (10/10 features)

### Backend API
- POST /api/devis - Soumission demande de devis
- POST /api/contact - Formulaire de contact
- POST /api/rappel - Demande de rappel téléphonique
- GET /api/testimonials - 3 témoignages
- GET /api/portfolio - 6 réalisations

### Email (Configuration requise)
- Resend intégré mais nécessite API key (RESEND_API_KEY dans backend/.env)

## Backlog Priorité
### P0 (Critique)
- [ ] Ajouter RESEND_API_KEY pour notifications email réelles

### P1 (Important)
- [ ] Upload de plan/photo dans formulaire de devis (étape 4)
- [ ] Page admin pour gérer les demandes de devis
- [ ] Intégration Google Analytics / Tag Manager

### P2 (Nice to have)
- [ ] Blog/Actualités pour SEO
- [ ] Chat en direct / WhatsApp
- [ ] Page mentions légales et politique de confidentialité
- [ ] Favicon personnalisé ABS Cloison
- [ ] Annonces Google Ads (landing pages dédiées)
