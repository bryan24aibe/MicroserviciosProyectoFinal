from flask import Blueprint, jsonify
from logic.product_logic import ProductLogic

product_bp = Blueprint("product", __name__, url_prefix="/api/products")
product_logic = ProductLogic()

@product_bp.route("/<product_id>", methods=["DELETE"])
def delete_product(product_id):
    try:
        response, status = product_logic.delete_product(product_id)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500
