export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operator: string | null;
  waitingForOperand: boolean;
}

export const buttons = [
  ["C", "+/-", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export const initialCalculatorState: CalculatorState = {
  display: "0",
  previousValue: null,
  operator: null,
  waitingForOperand: false,
};
