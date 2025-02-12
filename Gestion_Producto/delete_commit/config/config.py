import os
from dotenv import load_dotenv

# variables
load_dotenv()

class Config:
    MONGODB_URI = os.getenv("MONGODB_URI")  # Conexión MongoDB
    MONGODB_DB = os.getenv("MONGODB_DB")    # BD
