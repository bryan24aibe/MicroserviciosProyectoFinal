import requests
from models.product_model import ProductModel
from config.config import Config

class ProductService:
    def __init__(self):
        self.product_model = ProductModel()

    def create_product(self, product_data):
        if not product_data.get("name") or not product_data.get("price"):
            return {"error": "Missing required fields: 'name' or 'price'"}, 400

        # Save the product to the database
        response, status = self.product_model.create(product_data)

        # If the product is discounted, we send a notification
        if "discount" in product_data and product_data["discount"] > 0:
            notificacion = {
                "usuario_id": "publico",
                "mensaje": f"¡Nuevo descuento en {product_data['name']}! Ahora a ${product_data['price']} con {product_data['discount']}% de descuento."
            }
            try:
                requests.post(Config.NOTIFICATIONS_SERVICE_URL, json=notificacion)
            except Exception as e:
                print(f"Error al enviar notificación: {e}")

        return response, status
