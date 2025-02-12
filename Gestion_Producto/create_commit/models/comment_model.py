from pymongo import MongoClient
from config.config import Config

class CommentModel:
    def __init__(self):
        self.client = MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.MONGODB_DB]
        self.collection = self.db["comments"]

   
    def create(self, comment_data):
        try:
            result = self.collection.insert_one(comment_data)
            return {"message": "Comment created", "id": str(result.inserted_id)}, 201
        except Exception as e:
            return {"error": str(e)}, 500

   
    def get_all(self):
        try:
            comments = list(self.collection.find())
            for comment in comments:
                comment["_id"] = str(comment["_id"])  
            return comments, 200
        except Exception as e:
            return {"error": str(e)}, 500

    
    def get_by_id(self, comment_id):
        try:
            comment = self.collection.find_one({"_id": comment_id})
            if not comment:
                return {"error": "Comment not found"}, 404
            comment["_id"] = str(comment["_id"])  
            return comment, 200
        except Exception as e:
            return {"error": str(e)}, 500

   
    def update(self, comment_id, comment_data):
        try:
            result = self.collection.update_one(
                {"_id": comment_id}, {"$set": comment_data}
            )
            if result.matched_count == 0:
                return {"error": "Comment not found"}, 404
            return {"message": "Comment updated"}, 200
        except Exception as e:
            return {"error": str(e)}, 500

    
    def delete(self, comment_id):
        try:
            result = self.collection.delete_one({"_id": comment_id})
            if result.deleted_count == 0:
                return {"error": "Comment not found"}, 404
            return {"message": "Comment deleted"}, 200
        except Exception as e:
            return {"error": str(e)}, 500
