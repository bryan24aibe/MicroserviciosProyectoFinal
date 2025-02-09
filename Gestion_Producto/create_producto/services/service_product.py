from models.product_model import ProductModel

class ProductService:
    def __init__(self):
        self.product_model = ProductModel()

    def create_product(self, product_data):
        # Here you can add validations or additional logic
        if not product_data.get("name") or not product_data.get("price"):
            return {"error": "Missing required fields: 'name' or 'price'"}, 400
        return self.product_model.create(product_data)
