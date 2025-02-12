from flask import Blueprint, request, jsonify
from services.service_comment import CommentService

comment_bp = Blueprint("comment", __name__, url_prefix="/api/comments")
comment_service = CommentService()

@comment_bp.route("/<comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    try:
        response, status = comment_service.delete_comment(comment_id)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500
