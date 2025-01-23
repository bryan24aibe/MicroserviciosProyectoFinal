from models.product_model import ProductModel

class ProductLogic:
    def __init__(self):
        self.product_model = ProductModel()

    def update_product(self, product_id, product_data):
        # Validate data before passing it to the model
        if not product_id or not product_data:
            return {"error": "Missing product ID or data"}, 400
        return self.product_model.update(product_id, product_data)
