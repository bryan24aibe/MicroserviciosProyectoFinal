from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='../../.env')

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
    "port": int(os.getenv("DB_PORT"))
}

@app.route('/update-user', methods=['POST'])
def update_user():
    data = request.get_json()
    if not data or 'username' not in data or 'new_username' not in data or 'new_email' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    username = data['username']
    new_username = data['new_username']
    new_email = data['new_email']

    try:
        mydb = pymysql.connect(**DB_CONFIG)
        cursor = mydb.cursor()

        sqlquery = "UPDATE users SET username=%s, email=%s WHERE username=%s"
        cursor.execute(sqlquery, (new_username, new_email, username))
        mydb.commit()

        if cursor.rowcount > 0:
            return jsonify({"message": "User updated successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        if 'mydb' in locals() and mydb.open:
            mydb.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
