import { Button, Grid, Typography } from "@mui/material";
import { JSX } from "react";
// import { calculateAPI } from "../services/api";
import { buttons } from "./Config";

const Calculator = (): JSX.Element => {
  // const payload = {
  //   operandOne: 10,
  //   operandTwo: 2,
  //   operator: "/",
  // };

  // const calculate = async (payload: any) => {
  //   const resp = await calculateAPI(payload);
  //   if (resp.error && resp.error !== "") {
  //     console.log("Error:", resp.error);
  //   } else {
  //     console.log("Success:", resp.result);
  //   }
  // };

  // calculate(payload);

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
          <Typography sx={{ fontSize: "2rem" }}>{"0"}</Typography>
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
