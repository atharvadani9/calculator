import { Button, Grid, Typography } from "@mui/material";
import { JSX, useState } from "react";
import { calculateAPI } from "../services/api";
import { buttons, CalculatorState, initialCalculatorState } from "./Config";

const Calculator = (): JSX.Element => {
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);

  const calculateResult = async (
    operandOne: number,
    operandTwo: number,
    operator: string
  ) => {
    const payload = {
      operandOne,
      operandTwo,
      operator,
    };
    const resp = await calculateAPI(payload);
    if (resp.error && resp.error !== "") {
      return resp.error;
    } else {
      console.log("Success:", resp.result);
      return resp.result;
    }
  };

  //when the operator button is clicked highlight it
  const handleButtonClick = async (button: string) => {
    const isNumber = /^[0-9]$/.test(button) || button === ".";
    const isOperator = ["/", "*", "-", "+", "%"].includes(button);
    const isFunction = ["C", "+/-"].includes(button);

    if (isNumber) {
      handleNumberClick(button);
    } else if (isOperator) {
      await handleOperatorClick(button);
    } else if (button === "=") {
      await handleEqualsClick();
    } else if (isFunction) {
      handleFunctionClick(button);
    }
  };

  const handleNumberClick = (number: string) => {
    if (number === "." && state.display.includes(".")) {
      return; // Don't allow multiple decimal points
    }

    setState((prevState) => ({
      ...prevState,
      display:
        prevState.waitingForOperand || prevState.display === "0"
          ? number
          : prevState.display + number,
      waitingForOperand: false,
    }));
  };

  const handleOperatorClick = async (operator: string) => {
    if (state.display === "0") {
      return;
    }

    if (state.previousValue === null) {
      setState((prevState) => ({
        ...prevState,
        previousValue: parseFloat(prevState.display),
        operator,
        waitingForOperand: true,
      }));
    } else {
      await handleEqualsClick();
      setState((prevState) => ({
        ...prevState,
        previousValue: parseFloat(prevState.display),
        operator,
        waitingForOperand: true,
      }));
    }
  };

  const handleEqualsClick = async () => {
    if (state.previousValue === null || state.operator === null) {
      return;
    }

    const result = await calculateResult(
      state.previousValue,
      parseFloat(state.display),
      state.operator
    );

    setState({
      display: result.toString(),
      previousValue: null,
      operator: null,
      waitingForOperand: true,
    });
  };

  const handleFunctionClick = (button: string) => {
    if (button === "C") {
      setState((prevState) => ({
        ...prevState,
        display: "0",
        previousValue: null,
        operator: null,
        waitingForOperand: false,
      }));
    } else if (button === "+/-") {
      setState((prevState) => ({
        ...prevState,
        display: (parseFloat(prevState.display) * -1).toString(),
      }));
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ alignItems: "center", px: 2 }}
      direction={"column"}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 2,
          borderRadius: 1,
          py: 2,
        }}
      >
        <Typography variant="h2">{"Calculator"}</Typography>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#333333",
          borderRadius: 1,
          p: 2,
          flexDirection: "column",
        }}
      >
        <Grid
          sx={{
            backgroundColor: "#1a1a1a",
            borderRadius: 1,
            px: 4,
            py: 2,
            textAlign: "right",
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: "2rem" }}>{state.display}</Typography>
        </Grid>
        {buttons.map((row, i) => (
          <Grid
            key={i}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              mb: i < buttons.length - 1 ? 1 : 0,
            }}
          >
            {row.map((button, j) => {
              const isNumber = /^[0-9]$/.test(button) || button === ".";
              const isFunction = ["C", "+/-", "%"].includes(button);
              const isOperator = ["/", "*", "-", "+", "="].includes(button);

              let backgroundColor = "#222222"; // default
              let hoverColor = "#333333"; // default

              if (isNumber) {
                backgroundColor = "#424242";
                hoverColor = "#525252";
              } else if (isFunction) {
                backgroundColor = "#757575";
                hoverColor = "#858585";
              } else if (isOperator) {
                backgroundColor = "#ff9500";
                hoverColor = "#ffb333";
              }

              return (
                <Button
                  key={j}
                  variant="contained"
                  sx={{
                    backgroundColor,
                    borderRadius: 1,
                    px: 2,
                    py: 2,
                    flex: button === "0" ? 3.15 : 1,
                    "&:hover": {
                      backgroundColor: hoverColor,
                    },
                  }}
                  onClick={() => handleButtonClick(button)}
                >
                  <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
                    {button}
                  </Typography>
                </Button>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Calculator;
