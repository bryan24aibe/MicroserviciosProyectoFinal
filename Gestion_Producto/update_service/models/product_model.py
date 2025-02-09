from pymongo import MongoClient
from bson import ObjectId
from config.config import Config

class ProductModel:
    def __init__(self):
        self.client = MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.MONGODB_DB]
        self.collection = self.db["products"]

    def update(self, product_id, product_data):
        try:
            result = self.collection.update_one({"_id": ObjectId(product_id)}, {"$set": product_data})
            if result.matched_count:
                return {"message": "Product updated"}, 200
            else:
                return {"error": "Product not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 500
