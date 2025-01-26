from flask import Flask
from flask_cors import CORS
from controllers.product_controller import product_bp
import os


app = Flask(__name__)

# CORS Configuration
CORS(app, resources={r"/api/*": {"origins": "*"}})
#Arreglo

# Register the blueprint
app.register_blueprint(product_bp)

if __name__ == '__main__':
    # Obtener el puerto desde las variables de entorno o usar el puerto 5000 por defecto
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
