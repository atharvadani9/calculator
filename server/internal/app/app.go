package app

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"server/internal/api"
)

type Application struct {
	Logger            *log.Logger
	CalculatorHandler *api.CalculatorHandler
}

func NewApplication() *Application {
	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)
	calculatorHandler := api.NewCalculatorHandler(logger)

	app := &Application{
		Logger:            logger,
		CalculatorHandler: calculatorHandler,
	}
	return app
}

func (a *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	a.Logger.Println("INFO: Health check")
	fmt.Fprintf(w, "App is healthy!")
}
