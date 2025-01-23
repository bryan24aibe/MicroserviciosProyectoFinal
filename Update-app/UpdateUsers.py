import pymysql

try:
    mydb = pymysql.connect(
    host="host.docker.internal",
    user="root",
    password="843228",
    database="authentication"
)

    cursor = mydb.cursor()
    username = input("Enter the name to update: ")
    newname = input("Enter new name: ")
    
    sqlquery = "UPDATE users SET username=%s WHERE username=%s"
    cursor.execute(sqlquery, (newname, username))
    mydb.commit()
    print("Update successful")
except pymysql.MySQLError as e:
    print(f"Error: {e}")
finally:
    if 'mydb' in locals() and mydb.open:
        mydb.close()
