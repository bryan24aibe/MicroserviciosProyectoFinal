from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

# Configuración de conexión a la base de datos
DB_CONFIG = {
    "host": "host.docker.internal",
    "user": "root",
    "password": "843228",
    "database": "authentication",
    "port": 3306
}

# Endpoint para actualizar el username y el email
@app.route('/update-user', methods=['POST'])
def update_user():
    data = request.get_json()  # Obtener datos del cuerpo de la solicitud
    if not data or 'username' not in data or 'new_username' not in data or 'new_email' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    username = data['username']
    new_username = data['new_username']
    new_email = data['new_email']

    try:
        # Conexión a la base de datos
        mydb = pymysql.connect(**DB_CONFIG)
        cursor = mydb.cursor()

        # Consulta SQL para actualizar los datos
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

# Iniciar el servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
