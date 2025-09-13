package main

import (
	"database/sql"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

type Question struct {
	Subject  string `json:"subject"`
	Question string `json:"question"`
	A        string `json:"a"`
	B        string `json:"b"`
	C        string `json:"c"`
	D        string `json:"d"`
	Answer   string `json:"answer"`
}

func main() {
	rand.Seed(time.Now().UnixNano())

	// connect to DB
	db, err := sql.Open("sqlite3", "../assets/questions")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	r := gin.Default()

	// Simple CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // allow all origins
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// GET /questions/:subject
	r.GET("/questions/:subject", func(c *gin.Context) {
		subject := c.Param("subject")

		rows, err := db.Query(`
			SELECT subject, question, a, b, c, d, answer
			FROM questions
			WHERE subject = ?
			ORDER BY RANDOM()
			LIMIT 10
		`, subject)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var qs []Question
		for rows.Next() {
			var q Question
			if err := rows.Scan(&q.Subject, &q.Question, &q.A, &q.B, &q.C, &q.D, &q.Answer); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			qs = append(qs, q)
		}

		c.JSON(http.StatusOK, qs)
	})

	r.Run(":5000")
}
