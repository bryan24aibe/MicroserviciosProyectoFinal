import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

class Config:
    MONGODB_URI = os.getenv("MONGODB_URI")
    MONGODB_DB = os.getenv("MONGODB_DB")
