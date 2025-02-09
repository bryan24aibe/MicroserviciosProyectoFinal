from flask import Blueprint, request, jsonify
from services.service_product import ProductService  # Updated file name

product_bp = Blueprint("product", __name__, url_prefix="/api/products")
product_service = ProductService()

@product_bp.route("", methods=["POST"])
def create_product():
    try:
        product_data = request.get_json()
        response, status = product_service.create_product(product_data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500
