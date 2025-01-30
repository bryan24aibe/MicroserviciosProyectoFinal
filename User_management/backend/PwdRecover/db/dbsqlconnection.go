package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB

func InitMySQL() {
	_ = godotenv.Load("../.env") // Cargar .env desde la raíz

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?parseTime=true", dbUser, dbPassword, dbHost, dbName)

	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("❌ Failed to connect to MySQL: %v", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatalf("❌ MySQL connection error: %v", err)
	}

	fmt.Println("✅ Connected to MySQL successfully")
}
