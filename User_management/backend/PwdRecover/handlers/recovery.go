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

// Generate a random 6-digit recovery code
func generateRecoveryCode() string {
	randBytes := make([]byte, 3) // 3 bytes → 6 hex characters
	_, err := rand.Read(randBytes)
	if err != nil {
		log.Fatal("❌ Error generating recovery code:", err)
	}
	return hex.EncodeToString(randBytes)[:6]
}

// Store the recovery code in Redis
func RequestPasswordReset(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("email")

	client := db.GetRedisClient()
	code := generateRecoveryCode()

	err := client.Set(ctx, email, code, 5*time.Minute).Err()
	if err != nil {
		http.Error(w, "❌ Failed to store recovery code", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "✅ Recovery code generated: %s", code)
}

// Verify code and reset password
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

	// Hash the new password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), 10)
	if err != nil {
		http.Error(w, "❌ Error hashing password", http.StatusInternalServerError)
		return
	}

	// Update password in MySQL
	_, err = db.DB.Exec("UPDATE users SET password = ? WHERE email = ?", string(hashedPassword), email)
	if err != nil {
		http.Error(w, "❌ Error updating password", http.StatusInternalServerError)
		return
	}

	// Delete the recovery code from Redis
	client.Del(ctx, email)

	fmt.Fprintln(w, "✅ Password reset successfully")
}
