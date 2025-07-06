package routes

import (
	"server/internal/app"

	"github.com/go-chi/chi/v5"
)

func SetupRoutes(app *app.Application) *chi.Mux {
	r := chi.NewRouter()
	r.Get("/health", app.HealthCheck)
	r.Post("/calculate", app.CalculatorHandler.HandleCalculate)

	return r
}
