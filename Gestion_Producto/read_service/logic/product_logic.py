from models.product_model import ProductModel

class ProductLogic:
    def __init__(self):
        self.product_model = ProductModel()

    def get_all_products(self):
        # Here you can add additional logic if needed
        return self.product_model.get_all()
