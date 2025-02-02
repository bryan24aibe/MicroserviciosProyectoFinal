package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var client *redis.Client

func InitRedis() {
	_ = godotenv.Load("../.env")

	client = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("DB_redisHOST") + ":6379",
		Password: os.Getenv("DB_redisPASSWORD"),
		DB:       0,
	})

	_, err := client.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("❌ Failed to connect to Redis: %v", err)
	}

	fmt.Println("✅ Connected to Redis successfully")
}

func GetRedisClient() *redis.Client {
	if client == nil {
		InitRedis()
	}
	return client
}
