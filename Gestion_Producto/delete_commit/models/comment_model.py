from pymongo import MongoClient
from config.config import Config

class CommentModel:
    def __init__(self):
        self.client = MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.MONGODB_DB]
        self.collection = self.db["comments"]  # Colección de comentarios

    def delete(self, comment_id):
        try:
            result = self.collection.delete_one({"_id": comment_id})
            if result.deleted_count == 1:
                return {"message": "Comment deleted successfully"}, 200
            else:
                return {"error": "Comment not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 500
