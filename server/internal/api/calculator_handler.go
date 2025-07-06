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
	Result float64 `json:"result,omitempty"`
	Error  string  `json:"error,omitempty"`
}

func NewCalculatorHandler(logger *log.Logger) *CalculatorHandler {
	return &CalculatorHandler{
		logger: logger,
	}
}

func (h *CalculatorHandler) HandleCalculate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		h.writeResponse(w, CalculatorResponse{Error: "Method not allowed"})
		return
	}

	var req calculator.Calculator
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.logger.Printf("ERROR: Failed to decode request: %v", err)
		h.writeResponse(w, CalculatorResponse{Error: "Invalid JSON"})
		return
	}

	result, err := req.Calculate()
	if err != nil {
		h.logger.Printf("ERROR: Failed to calculate: %v", err)
		h.writeResponse(w, CalculatorResponse{Error: err.Error()})
		return
	}

	response := CalculatorResponse{Result: result}
	h.writeResponse(w, response)
	h.logger.Printf("INFO: Response: %v", response)
}

func (h *CalculatorHandler) writeResponse(w http.ResponseWriter, response CalculatorResponse) {
	if err := utils.WriteJSON(w, response); err != nil {
		h.logger.Printf("ERROR: Failed to write response: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}
