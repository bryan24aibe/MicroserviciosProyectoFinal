from flask import Blueprint, request, jsonify
from models import ProductModel

# Crear una instancia del modelo de producto
product_model = ProductModel()

# Crear un blueprint para las rutas de productos
product_routes = Blueprint('product_routes', __name__)

# Ruta para obtener todos los productos
@product_routes.route("/", methods=["GET"])
def get_all_products():
    return product_model.get_all()

# Ruta para crear un nuevo producto
@product_routes.route("/", methods=["POST"])
def create_product():
    try:
        product_data = request.get_json()
        return product_model.create(product_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para obtener un producto por su ID
@product_routes.route("/<product_id>", methods=["GET"])
def get_product_by_id(product_id):
    return product_model.get_by_id(product_id)

# Ruta para actualizar un producto por su ID
@product_routes.route("/<product_id>", methods=["PUT"])
def update_product(product_id):
    try:
        product_data = request.get_json()
        return product_model.update(product_id, product_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para eliminar un producto por su ID
@product_routes.route("/<product_id>", methods=["DELETE"])
def delete_product(product_id):
    return product_model.delete(product_id)
