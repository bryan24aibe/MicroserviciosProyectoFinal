from flask import Blueprint, request, jsonify
from logic.product_logic import ProductLogic

product_bp = Blueprint("product", __name__, url_prefix="/api/products")
product_logic = ProductLogic()

@product_bp.route("/<product_id>", methods=["PUT"])
def update_product(product_id):
    try:
        product_data = request.get_json()
        response, status = product_logic.update_product(product_id, product_data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500
