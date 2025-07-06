package main

import (
	"net/http"
	"server/internal/app"
	"server/routes"
)

func main() {
	app := app.NewApplication()
	r := routes.SetupRoutes(app)

	app.Logger.Println("INFO: Starting server on port 8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		app.Logger.Fatal(err)
	}
}
