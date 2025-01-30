package handlers

import (
	"PwdRecover/db"
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/redis/go-redis/v9"
	"golang.org/x/crypto/bcrypt"
)

var ctx = context.Background()

func generateRecoveryCode() string {
	randBytes := make([]byte, 3)
	_, err := rand.Read(randBytes)
	if err != nil {
		log.Fatal("❌ Error generating recovery code:", err)
	}
	return hex.EncodeToString(randBytes)[:6]
}

// Check if email exists in MySQL
func emailExists(email string) bool {
	var exists bool
	err := db.DB.QueryRow("SELECT COUNT(*) > 0 FROM users WHERE email = ?", email).Scan(&exists)
	return err == nil && exists
}

func RequestPasswordReset(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("email")

	if !emailExists(email) {
		http.Error(w, "❌ Email not found", http.StatusNotFound)
		return
	}

	client := db.GetRedisClient()
	code := generateRecoveryCode()

	err := client.Set(ctx, email, code, 5*time.Minute).Err()
	if err != nil {
		http.Error(w, "❌ Failed to store recovery code", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "✅ Recovery code generated: %s", code)
}

func VerifyAndResetPassword(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("email")
	code := r.FormValue("code")
	newPassword := r.FormValue("password")

	client := db.GetRedisClient()
	storedCode, err := client.Get(ctx, email).Result()

	if err == redis.Nil || storedCode != code {
		http.Error(w, "❌ Invalid or expired code", http.StatusUnauthorized)
		return
	}

	if !emailExists(email) {
		http.Error(w, "❌ Email not found", http.StatusNotFound)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), 10)
	if err != nil {
		http.Error(w, "❌ Error hashing password", http.StatusInternalServerError)
		return
	}

	_, err = db.DB.Exec("UPDATE users SET password = ? WHERE email = ?", string(hashedPassword), email)
	if err != nil {
		http.Error(w, "❌ Error updating password", http.StatusInternalServerError)
		return
	}

	client.Del(ctx, email)

	fmt.Fprintln(w, "✅ Password reset successfully")
}
