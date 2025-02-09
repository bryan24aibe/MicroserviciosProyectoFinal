from pymongo import MongoClient
from bson import ObjectId
from config.config import Config

class ProductModel:
    def __init__(self):
        self.client = MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.MONGODB_DB]
        self.collection = self.db["products"]

    def delete(self, product_id):
        try:
            result = self.collection.delete_one({"_id": ObjectId(product_id)})
            if result.deleted_count > 0:
                return {"message": "Product deleted"}, 200
            else:
                return {"error": "Product not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 500
