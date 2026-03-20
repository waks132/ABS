from fastapi import FastAPI, APIRouter, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Try to import resend for email
try:
    import resend
    resend_api_key = os.environ.get('RESEND_API_KEY')
    if resend_api_key:
        resend.api_key = resend_api_key
        EMAIL_ENABLED = True
    else:
        EMAIL_ENABLED = False
except ImportError:
    EMAIL_ENABLED = False

RECIPIENT_EMAIL = "abscloison@gmail.com"
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# Models
class DevisRequest(BaseModel):
    cloison_type: str
    metrage: Optional[str] = None
    hauteur: Optional[str] = None
    confidentialite: Optional[str] = None
    nom: str
    email: EmailStr
    telephone: str
    entreprise: Optional[str] = None
    message: Optional[str] = None

class DevisResponse(BaseModel):
    id: str
    status: str
    message: str

class ContactRequest(BaseModel):
    nom: str
    email: EmailStr
    telephone: str
    sujet: str
    message: str

class ContactResponse(BaseModel):
    id: str
    status: str
    message: str

class RappelRequest(BaseModel):
    telephone: str
    nom: Optional[str] = None

class Testimonial(BaseModel):
    id: str
    entreprise: str
    nom: str
    poste: str
    texte: str
    note: int

class PortfolioItem(BaseModel):
    id: str
    titre: str
    categorie: str
    description: str
    image: str
    lieu: str


# Helper: send notification email
async def send_notification_email(subject: str, html_content: str):
    if not EMAIL_ENABLED:
        logger.info("Email not configured, skipping notification")
        return
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [RECIPIENT_EMAIL],
            "subject": subject,
            "html": html_content
        }
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Notification email sent: {subject}")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")


# Seed data
async def seed_data():
    # Seed testimonials
    count = await db.testimonials.count_documents({})
    if count == 0:
        testimonials = [
            {
                "id": str(uuid.uuid4()),
                "entreprise": "Groupe Lacroix",
                "nom": "Philippe Moreau",
                "poste": "Directeur des Opérations",
                "texte": "ABS Cloison a transformé nos bureaux de Lyon en un espace moderne et acoustiquement performant. L'installation s'est faite en site occupé, sans aucune perturbation. Un vrai professionnalisme.",
                "note": 5
            },
            {
                "id": str(uuid.uuid4()),
                "entreprise": "Cabinet Arthaud & Associés",
                "nom": "Marie-Claire Arthaud",
                "poste": "Associée Gérante",
                "texte": "Nos salles de réunion nécessitaient une confidentialité totale. Les cloisons acoustiques installées par ABS dépassent nos attentes avec un affaiblissement de 45dB. Résultat impeccable.",
                "note": 5
            },
            {
                "id": str(uuid.uuid4()),
                "entreprise": "TechHub Villeurbanne",
                "nom": "Julien Bertrand",
                "poste": "CEO & Fondateur",
                "texte": "Le rendu des cloisons vitrées bord à bord est spectaculaire. Notre espace de coworking est lumineux et modulable. ABS a su comprendre notre vision architecturale.",
                "note": 5
            },
        ]
        await db.testimonials.insert_many(testimonials)
        logger.info("Seeded testimonials")

    # Seed portfolio
    count = await db.portfolio.count_documents({})
    if count == 0:
        portfolio = [
            {
                "id": str(uuid.uuid4()),
                "titre": "Aménagement Bureaux Direction",
                "categorie": "Bureaux",
                "description": "Installation de cloisons vitrées toute hauteur pour les bureaux de direction. Vitrage Stadip Silence pour une confidentialité optimale.",
                "image": "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/kk51kuyc_IMG-20260318-WA0015.jpg",
                "lieu": "Lyon 6ème"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Transformation Open Space",
                "categorie": "Bureaux",
                "description": "Création de 12 bureaux individuels et 3 salles de réunion dans un open space de 800m². Cloisons mixtes vitrées et pleines.",
                "image": "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/gn7jonju_IMG-20260318-WA0011.jpg",
                "lieu": "Villeurbanne"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Espace Showroom Premium",
                "categorie": "Showrooms",
                "description": "Cloisons vitrées bord à bord sans montants visibles pour un showroom automobile. Finitions aluminium anodisé noir.",
                "image": "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/83edbda040d467ca43b00584687d301b51d1431ae132839ffc7f7cbae0bdfff7.png",
                "lieu": "Lyon Part-Dieu"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Aménagement Industriel",
                "categorie": "Industrie",
                "description": "Cloisons pleines acoustiques haute performance (50dB) pour séparer les zones de production des bureaux techniques.",
                "image": "https://customer-assets.emergentagent.com/job_4b731054-35b8-4aa7-b551-25e79cfee9fa/artifacts/7qtav35z_IMG-20260318-WA0021.jpg",
                "lieu": "Anse"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Salles de Réunion Acoustiques",
                "categorie": "Bureaux",
                "description": "Installation de murs mobiles pour salles de conférence modulables. Système de rails plafond invisible.",
                "image": "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/8058b222ce41d61914c2a04595441fe394564838a8ef1cbc18a196633eee740e.png",
                "lieu": "Écully"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Verrière Bureau Design",
                "categorie": "Showrooms",
                "description": "Verrière de bureau sur mesure avec profilés minimalistes noirs. Design épuré inspiré du style atelier.",
                "image": "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/1507d3bcd194f4e0485d214aafc3a8598d322e4224359a5026bb88d60656f7eb.png",
                "lieu": "Caluire-et-Cuire"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Cloisons Vitrées sur Allège",
                "categorie": "Bureaux",
                "description": "Installation de cloisons vitrées sur allège avec soubassement stratifié pour le passage des câbles et prises. Partie haute vitrée pour la luminosité naturelle.",
                "image": "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/1ac9a27799c98e563545a877cfb31d0d4863c8f0045eeaab1b739722d15d064e.png",
                "lieu": "Lyon 3ème"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Portes Coulissantes Vitrées",
                "categorie": "Bureaux",
                "description": "Système de portes coulissantes vitrées avec rail encastré et fermeture soft-close. Poignées design intégrées et vitrage sécurit.",
                "image": "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/5c7039b31efd8060bc11f4f3754d788de688a2290ecbd461821889c4bfdb3f2f.png",
                "lieu": "Vaulx-en-Velin"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Phone Box Open Space",
                "categorie": "Bureaux",
                "description": "Installation de 6 cabines acoustiques individuelles dans un open space de 500m². Ventilation silencieuse, éclairage LED et prises USB intégrées.",
                "image": "https://static.prod-images.emergentagent.com/jobs/4b731054-35b8-4aa7-b551-25e79cfee9fa/images/06cbd343ec18aa745dc4c6c63b71d0e663c5ced31df4f49d636e80b2dcaaa9e8.png",
                "lieu": "Saint-Priest"
            },
        ]
        await db.portfolio.insert_many(portfolio)
        logger.info("Seeded portfolio")


@app.on_event("startup")
async def startup():
    await seed_data()


# Routes
@api_router.get("/")
async def root():
    return {"message": "ABS Cloison API"}


@api_router.post("/devis", response_model=DevisResponse)
async def submit_devis(devis: DevisRequest):
    doc = devis.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["status"] = "nouveau"
    await db.devis.insert_one({k: v for k, v in doc.items() if k != "_id"})

    # Send email notification
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0F172A;border-bottom:2px solid #CCA43B;padding-bottom:10px;">Nouvelle Demande de Devis</h2>
        <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;color:#475569;">Type de cloison</td><td style="padding:8px;">{devis.cloison_type}</td></tr>
            <tr style="background:#F8FAFC;"><td style="padding:8px;font-weight:bold;color:#475569;">Métrage</td><td style="padding:8px;">{devis.metrage or 'Non précisé'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#475569;">Hauteur</td><td style="padding:8px;">{devis.hauteur or 'Non précisé'}</td></tr>
            <tr style="background:#F8FAFC;"><td style="padding:8px;font-weight:bold;color:#475569;">Confidentialité</td><td style="padding:8px;">{devis.confidentialite or 'Non précisé'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#475569;">Nom</td><td style="padding:8px;">{devis.nom}</td></tr>
            <tr style="background:#F8FAFC;"><td style="padding:8px;font-weight:bold;color:#475569;">Email</td><td style="padding:8px;">{devis.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#475569;">Téléphone</td><td style="padding:8px;">{devis.telephone}</td></tr>
            <tr style="background:#F8FAFC;"><td style="padding:8px;font-weight:bold;color:#475569;">Entreprise</td><td style="padding:8px;">{devis.entreprise or 'Non précisé'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#475569;">Message</td><td style="padding:8px;">{devis.message or 'Aucun'}</td></tr>
        </table>
    </div>
    """
    await send_notification_email(f"Nouveau Devis - {devis.cloison_type} - {devis.nom}", html)

    return DevisResponse(id=doc["id"], status="success", message="Votre demande de devis a bien été envoyée. Nous vous recontacterons sous 24h.")


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest):
    doc = contact.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contacts.insert_one({k: v for k, v in doc.items() if k != "_id"})

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0F172A;border-bottom:2px solid #CCA43B;padding-bottom:10px;">Nouveau Message de Contact</h2>
        <p><strong>Nom:</strong> {contact.nom}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Téléphone:</strong> {contact.telephone}</p>
        <p><strong>Sujet:</strong> {contact.sujet}</p>
        <p><strong>Message:</strong> {contact.message}</p>
    </div>
    """
    await send_notification_email(f"Contact - {contact.sujet} - {contact.nom}", html)

    return ContactResponse(id=doc["id"], status="success", message="Votre message a bien été envoyé.")


@api_router.post("/rappel")
async def request_rappel(rappel: RappelRequest):
    doc = rappel.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.rappels.insert_one({k: v for k, v in doc.items() if k != "_id"})

    html = f"""
    <div style="font-family:Arial,sans-serif;">
        <h2 style="color:#0F172A;">Demande de Rappel</h2>
        <p><strong>Nom:</strong> {rappel.nom or 'Non précisé'}</p>
        <p><strong>Téléphone:</strong> {rappel.telephone}</p>
    </div>
    """
    await send_notification_email(f"Demande de rappel - {rappel.telephone}", html)

    return {"status": "success", "message": "Nous vous rappelons sous 15 minutes."}


@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    docs = await db.testimonials.find({}, {"_id": 0}).to_list(20)
    return docs


@api_router.get("/portfolio", response_model=List[PortfolioItem])
async def get_portfolio():
    docs = await db.portfolio.find({}, {"_id": 0}).to_list(50)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
