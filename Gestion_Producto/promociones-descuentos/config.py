import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Cargar variables de entorno 1
load_dotenv()

# Conectar a MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client["promocionesDB"]
notificaciones_collection = db["notificaciones"]
