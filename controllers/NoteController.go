package controller

import (
	"net/http"
	"time"
	"strconv"

	"notice/models"

	"github.com/gin-gonic/gin"
)

func GetNotes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, model.SelectNotes())
}

func GetNote(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	c.IndentedJSON(http.StatusOK, model.SelectNote(id))
}

func DelNote(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	// log.(c.Param("id"))
	err := model.DeleteNote(id)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": "Deleting object error occurred",
		})
	} else {
		c.IndentedJSON(http.StatusOK, gin.H{
			"message": "Object deleted successfully",
		})
	}
}

func AddNote(c *gin.Context) {
	var note model.Note

	err := c.BindJSON(&note)

	if err != nil {
		return
	}

	currentTime := time.Now()

	note.CreatedAt = currentTime.Format("2006-01-02T15:04:05")

	c.IndentedJSON(http.StatusOK, model.InsertNote(note))
}

func EditNote(c *gin.Context) {
	var note model.Note

	err := c.BindJSON(&note)
	if err != nil {
		return
	}

	c.IndentedJSON(http.StatusOK, model.UpdateNote(note))
}