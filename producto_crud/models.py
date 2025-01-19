from pymongo import MongoClient
from bson import ObjectId
from flask import jsonify
from config import Config

class ProductModel:
    def __init__(self):
        # Conectar a MongoDB usando la configuración cargada desde config.py
        self.client = MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.MONGODB_DB]
        self.collection = self.db["products"]

    # Obtener todos los productos
    def get_all(self):
        try:
            products = list(self.collection.find())
            for product in products:
                product["_id"] = str(product["_id"])  # Convertir ObjectId a string
            return jsonify(products), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Crear un nuevo producto
    def create(self, product_data):
        try:
            result = self.collection.insert_one(product_data)
            return jsonify({"message": "Product created", "id": str(result.inserted_id)}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Obtener un producto por su ID
    def get_by_id(self, product_id):
        try:
            product = self.collection.find_one({"_id": ObjectId(product_id)})
            if product:
                product["_id"] = str(product["_id"])  # Convertir ObjectId a string
                return jsonify(product), 200
            else:
                return jsonify({"error": "Product not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Actualizar un producto por su ID
    def update(self, product_id, product_data):
        try:
            result = self.collection.update_one({"_id": ObjectId(product_id)}, {"$set": product_data})
            if result.matched_count:
                return jsonify({"message": "Product updated"}), 200
            else:
                return jsonify({"error": "Product not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Eliminar un producto por su ID
    def delete(self, product_id):
        try:
            result = self.collection.delete_one({"_id": ObjectId(product_id)})
            if result.deleted_count:
                return jsonify({"message": "Product deleted"}), 200
            else:
                return jsonify({"error": "Product not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
