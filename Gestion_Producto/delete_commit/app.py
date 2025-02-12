from flask import Flask
from flask_cors import CORS
from controllers.comment_controller import comment_bp

app = Flask(__name__)

# Configuration the CORS 
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register the blueprint
app.register_blueprint(comment_bp)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
