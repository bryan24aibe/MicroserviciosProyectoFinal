from flask import Blueprint, request, jsonify
from services.service_comment import CommentService  # Actualizar el nombre del archivo

comment_bp = Blueprint("comment", __name__, url_prefix="/api/comments")
comment_service = CommentService()

# Crear comentario
@comment_bp.route("", methods=["POST"])
def create_comment():
    try:
        comment_data = request.get_json()
        response, status = comment_service.create_comment(comment_data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtener todos los comentarios
@comment_bp.route("", methods=["GET"])
def get_all_comments():
    try:
        comments, status = comment_service.get_all_comments()
        return jsonify(comments), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtener un comentario por ID
@comment_bp.route("/<comment_id>", methods=["GET"])
def get_comment_by_id(comment_id):
    try:
        comment, status = comment_service.get_comment_by_id(comment_id)
        return jsonify(comment), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Actualizar comentario
@comment_bp.route("/<comment_id>", methods=["PUT"])
def update_comment(comment_id):
    try:
        comment_data = request.get_json()
        response, status = comment_service.update_comment(comment_id, comment_data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Eliminar comentario
@comment_bp.route("/<comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    try:
        response, status = comment_service.delete_comment(comment_id)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500
