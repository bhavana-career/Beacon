from pymongo import MongoClient
from app.config import MONGO_URI

client = MongoClient(MONGO_URI)

db = client["beacon"]

reports_collection = db["business_reports"]