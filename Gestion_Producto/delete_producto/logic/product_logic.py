from models.product_model import ProductModel

class ProductLogic:
    def __init__(self):
        self.product_model = ProductModel()

    def delete_product(self, product_id):
        # Validate the ID before interacting with the database
        if not product_id:
            return {"error": "Product ID is required"}, 400

        return self.product_model.delete(product_id)
