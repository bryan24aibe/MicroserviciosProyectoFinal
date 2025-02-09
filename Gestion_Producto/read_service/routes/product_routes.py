from flask import Blueprint, jsonify
from logic.product_logic import ProductLogic

product_bp = Blueprint("product", __name__, url_prefix="/api/products")
product_logic = ProductLogic()

@product_bp.route("", methods=["GET"])
def get_all_products():
    try:
        response, status = product_logic.get_all_products()
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500
