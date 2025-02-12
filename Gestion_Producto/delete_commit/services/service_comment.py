from models.comment_model import CommentModel

class CommentService:
    def __init__(self):
        self.comment_model = CommentModel()

    def delete_comment(self, comment_id):
        if not comment_id:
            return {"error": "Missing required field: 'comment_id'"}, 400
        return self.comment_model.delete(comment_id)
