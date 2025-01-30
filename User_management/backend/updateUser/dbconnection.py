import pymysql
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path='../../.env')

# Database configuration
DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
    "port": int(os.getenv("DB_PORT"))
}

# Function to get a new database connection
def get_db_connection():
    try:
        return pymysql.connect(**DB_CONFIG)
    except pymysql.MySQLError as e:
        print(f"Error connecting to the database: {str(e)}")
        return None
