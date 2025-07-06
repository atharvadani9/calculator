package api

import (
	"encoding/json"
	"log"
	"net/http"
	"server/internal/calculator"
	"server/internal/utils"
)

type CalculatorHandler struct {
	logger *log.Logger
}

type CalculatorResponse struct {
	Result float64 `json:"result"`
	// Error  error   `json:"error,omitempty"`
}

func NewCalculatorHandler(logger *log.Logger) *CalculatorHandler {
	return &CalculatorHandler{
		logger: logger,
	}
}

func (h *CalculatorHandler) HandleCalculate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req calculator.Calculator
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.logger.Printf("ERROR: Failed to decode request: %v", err)
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	result, err := req.Calculate()

	if err != nil {
		h.logger.Printf("ERROR: Failed to calculate: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := CalculatorResponse{
		Result: result,
	}

	if err := utils.WriteJSON(w, response); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		h.logger.Printf("ERROR: Failed to encode response: %v", err)
		return
	}
	h.logger.Printf("INFO: Calculation result: %v", response)
}
