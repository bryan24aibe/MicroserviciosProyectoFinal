from flask import Flask
from flask_cors import CORS
from routes.product_routes import product_bp
import os

app = Flask(__name__)

# CORS Configuration
CORS(app, resources={r"/api/*": {"origins": "*"}})
#Array 1
# Register the blueprint
app.register_blueprint(product_bp)

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
