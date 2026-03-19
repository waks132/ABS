# ABS CLOISON - PRD (Product Requirements Document)

## Problème Initial
Création d'un site vitrine haut de gamme pour ABS CLOISON, entreprise de vente et pose de cloisons amovibles premium en région lyonnaise. Le site doit fusionner esthétique luxueuse et crédibilité technique, optimisé pour la conversion publicitaire.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + MongoDB (Motor async)
- **Design**: Minimaliste architectural nordique (Navy #0F172A, Gold #CCA43B)
- **Fonts**: Manrope (headings), DM Sans (body), Playfair Display (accents)

## Informations Entreprise
- **Nom**: ABS 69 (Au Bon Service) / ABS CLOISON
- **Adresse**: 642 Route de Lyon, Anse
- **Tél**: 07 53 80 12 60 / 04 82 83 91 86
- **Email**: abscloison@gmail.com
- **Slogan**: "L'élégance de la transparence, l'exigence de l'acoustique"

## User Personas
1. **Directeur d'entreprise** - Cherche à transformer ses bureaux
2. **Architecte/Designer** - Besoin de solutions techniques premium
3. **Office Manager** - Optimise les espaces de travail

## Implémenté (19 mars 2026)
### Pages
- [x] **Accueil** - Hero slider, promesses, systèmes, stats, portfolio preview, témoignages, CTA
- [x] **Nos Systèmes** - Fiches produits détaillées (Vitrées, Pleines, Mobiles) avec specs techniques
- [x] **Expertise** - Échelle acoustique, certifications, process en 4 étapes
- [x] **Portfolio** - Galerie filtrable par catégorie, vidéos réelles, modal détail
- [x] **Contact** - Formulaire de devis 4 étapes, infos contact, badges de confiance

### Fonctionnalités
- [x] Navigation responsive avec effect glass au scroll
- [x] Hero slider auto-rotate (5s)
- [x] Formulaire de devis 4 étapes (type, dimensions, acoustique, contact)
- [x] Bouton sticky "Conseil technique" avec modal de rappel
- [x] Témoignages clients depuis MongoDB
- [x] Portfolio avec filtres par catégorie
- [x] Vidéos de chantier intégrées
- [x] Animations Framer Motion sur toutes les sections
- [x] Backend API (devis, contact, rappel, testimonials, portfolio)
- [x] SEO meta tags et titre optimisés

### Backend API
- POST /api/devis - Soumission demande de devis
- POST /api/contact - Formulaire de contact
- POST /api/rappel - Demande de rappel téléphonique
- GET /api/testimonials - Liste des témoignages
- GET /api/portfolio - Liste des réalisations

### Email (Configuration requise)
- Resend intégré mais nécessite API key (RESEND_API_KEY dans backend/.env)
- Notifications vers abscloison@gmail.com lors de soumissions

## Résultats Tests
- Backend: 100% (8/8 tests passés)
- Frontend: 95% (tous les flux core fonctionnels)

## Backlog Priorité
### P0 (Critique)
- [ ] Ajouter RESEND_API_KEY pour notifications email réelles

### P1 (Important)
- [ ] Pages SEO local par ville (Lyon, Villeurbanne, Écully, etc.)
- [ ] Schema JSON-LD pour entreprise locale
- [ ] Google Maps intégré sur page contact
- [ ] Upload de plan/photo dans le formulaire de devis

### P2 (Nice to have)
- [ ] Slider Avant/Après interactif
- [ ] Page admin pour gérer les demandes de devis
- [ ] Intégration Google Analytics
- [ ] Blog/Actualités pour SEO
- [ ] Chat en direct
