from flask import Flask
from flask_cors import CORS
from controllers.comment_controller import comment_bp
import os

app = Flask(__name__)

# Configuration the CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register
app.register_blueprint(comment_bp)

if __name__ == '__main__':
    # Port 5000 
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
