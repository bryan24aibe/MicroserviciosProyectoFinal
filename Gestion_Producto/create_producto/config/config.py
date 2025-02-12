import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    MONGODB_URI = os.getenv("MONGODB_URI")
    MONGODB_DB = os.getenv("MONGODB_DB")
    NOTIFICATIONS_SERVICE_URL = os.getenv("NOTIFICATIONS_SERVICE_URL")  # Nueva variable
