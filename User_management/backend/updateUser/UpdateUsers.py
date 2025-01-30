from flask import Flask, request, jsonify
from flask_cors import CORS
from dbconnection import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route('/update-user', methods=['POST'])
def update_user():
    data = request.get_json()
    if not data or 'username' not in data or 'new_username' not in data or 'new_email' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    username = data['username']
    new_username = data['new_username']
    new_email = data['new_email']

    db_conn = get_db_connection()
    if db_conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = db_conn.cursor()
        sqlquery = "UPDATE users SET username=%s, email=%s WHERE username=%s"
        cursor.execute(sqlquery, (new_username, new_email, username))
        db_conn.commit()

        if cursor.rowcount > 0:
            return jsonify({"message": "User updated successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        if db_conn and db_conn.open:
            db_conn.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
