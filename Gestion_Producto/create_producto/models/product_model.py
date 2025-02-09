from pymongo import MongoClient
from config.config import Config

class ProductModel:
    def __init__(self):
        self.client = MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.MONGODB_DB]
        self.collection = self.db["products"]

    def create(self, product_data):
        try:
            result = self.collection.insert_one(product_data)
            return {"message": "Product created", "id": str(result.inserted_id)}, 201
        except Exception as e:
            return {"error": str(e)}, 500
