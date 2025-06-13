from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    reason: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    reason: str
    message: str

class NewsletterSignup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSignupCreate(BaseModel):
    email: EmailStr

# Existing routes
@api_router.get("/")
async def root():
    return {"message": "PrognosCore API - Predict. Prevent. Perform."}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# New routes for PrognosCore
@api_router.post("/contact", response_model=ContactForm)
async def create_contact(input: ContactFormCreate):
    contact_dict = input.dict()
    contact_obj = ContactForm(**contact_dict)
    _ = await db.contacts.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactForm])
async def get_contacts():
    contacts = await db.contacts.find().to_list(1000)
    return [ContactForm(**contact) for contact in contacts]

@api_router.post("/newsletter", response_model=NewsletterSignup)
async def create_newsletter_signup(input: NewsletterSignupCreate):
    # Check if email already exists
    existing = await db.newsletter_signups.find_one({"email": input.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    signup_dict = input.dict()
    signup_obj = NewsletterSignup(**signup_dict)
    _ = await db.newsletter_signups.insert_one(signup_obj.dict())
    return signup_obj

@api_router.get("/newsletter", response_model=List[NewsletterSignup])
async def get_newsletter_signups():
    signups = await db.newsletter_signups.find().to_list(1000)
    return [NewsletterSignup(**signup) for signup in signups]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
