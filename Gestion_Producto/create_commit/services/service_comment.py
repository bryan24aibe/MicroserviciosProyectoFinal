from models.comment_model import CommentModel

class CommentService:
    def __init__(self):
        self.comment_model = CommentModel()

   
    def create_comment(self, comment_data):
        if not comment_data.get("text"):
            return {"error": "Missing required field: 'text'"}, 400
        return self.comment_model.create(comment_data)

    
    def get_all_comments(self):
        return self.comment_model.get_all()

  
    def get_comment_by_id(self, comment_id):
        return self.comment_model.get_by_id(comment_id)

  
    def update_comment(self, comment_id, comment_data):
        if not comment_data.get("text"):
            return {"error": "Missing required field: 'text'"}, 400
        return self.comment_model.update(comment_id, comment_data)

    
    def delete_comment(self, comment_id):
        return self.comment_model.delete(comment_id)
