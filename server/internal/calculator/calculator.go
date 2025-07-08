package calculator

import (
	"errors"
)

type Calculator struct {
	OperandOne *float64 `json:"operandOne"`
	OperandTwo *float64 `json:"operandTwo"`
	Operator   string   `json:"operator"`
}

func (r *Calculator) Validate() error {
	if r.OperandOne == nil || r.OperandTwo == nil {
		return errors.New("number is required")
	}
	if r.Operator == "" {
		return errors.New("operator is required")
	}
	return nil
}

func (r *Calculator) Calculate() (float64, error) {
	var result float64
	var err error

	if err := r.Validate(); err != nil {
		return 0, err
	}

	switch r.Operator {
	case "+":
		result = *r.OperandOne + *r.OperandTwo
	case "-":
		result = *r.OperandOne - *r.OperandTwo
	case "*":
		result = *r.OperandOne * *r.OperandTwo
	case "/":
		if *r.OperandTwo == 0 {
			err = errors.New("cannot divide by zero")
		} else {
			result = *r.OperandOne / *r.OperandTwo
		}
	case "%":
		if *r.OperandTwo == 0 {
			err = errors.New("cannot divide by zero")
		} else {
			result = float64(int(*r.OperandOne) % int(*r.OperandTwo))
		}
	default:
		err = errors.New("invalid operator")
	}

	return result, err
}
