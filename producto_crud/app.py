from flask import Flask
from routes import product_routes

app = Flask(__name__)

# Registro de las rutas
app.register_blueprint(product_routes, url_prefix="/api/products")

if __name__ == '__main__':
    app.run(debug=True)
