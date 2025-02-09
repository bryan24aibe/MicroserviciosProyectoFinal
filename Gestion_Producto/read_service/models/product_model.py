from pymongo import MongoClient
from config.config import Config

class ProductModel:
    def __init__(self):
        self.client = MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.MONGODB_DB]
        self.collection = self.db["products"]

    def get_all(self):
        try:
            products = list(self.collection.find())
            # Convert ObjectId to string to make it serializable in JSON
            for product in products:
                product["_id"] = str(product["_id"])
            return products, 200
        except Exception as e:
            return {"error": str(e)}, 500
