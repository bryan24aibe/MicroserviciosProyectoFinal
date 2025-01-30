package main

import (
	"PwdRecover/db"
	"PwdRecover/handlers"
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Manejar preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("❌ Error loading .env file")
	}

	db.InitRedis()
	db.InitMySQL()

	mux := http.NewServeMux()
	mux.HandleFunc("/request-reset", handlers.RequestPasswordReset)
	mux.HandleFunc("/reset-password", handlers.VerifyAndResetPassword)

	fmt.Println("🚀 Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", enableCORS(mux)))
}
