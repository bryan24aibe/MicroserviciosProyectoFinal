import os
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

class Config:
    # Leer las variables de entorno del archivo .env
    MONGODB_URI = os.getenv("MONGODB_URI")
    MONGODB_DB = os.getenv("MONGODB_DB")
