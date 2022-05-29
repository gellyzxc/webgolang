package main

import (
	"notice/controllers"
	"github.com/gin-gonic/gin"
	// "github.com/gin-contrib/cors"
	"net/http"
	// "time"
	"notice/services"
)


func Api(c *gin.Context) {
	c.JSON(200, gin.H{
		"api": "notice",
	})
}

func main() {
	r := gin.Default()

	r.LoadHTMLGlob("./ui/build/index.html");
	r.Static("public", "./ui/build")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	r.Use(service.CORS())

	r.GET("/api", Api)


	rApi := r.Group("/api")
	{
		rApi.GET("/notes", controller.GetNotes)
		rNote := rApi.Group("/notes")
		{
			rNote.POST("/add", controller.AddNote)
			rNote.GET("/:id", controller.GetNote)
			rNote.PUT("/edit", controller.EditNote)
			rNote.DELETE("/:id", controller.DelNote)
		}
	}
    // r.Use(cors.New(cors.Config{
    // 		AllowOrigins:     []string{"https://foo.com"},
    // 		AllowMethods:     []string{"PUT", "PATCH"},
    // 		AllowHeaders:     []string{"Origin"},
    // 		ExposeHeaders:    []string{"Content-Length"},
    // 		AllowCredentials: true,
    // 		AllowOriginFunc: func(origin string) bool {
    // 			return origin == "https://github.com"
    // 		},
    // 		MaxAge: 12 * time.Hour,
    // 	}))
	r.Run("0.0.0.0:9090")
}
