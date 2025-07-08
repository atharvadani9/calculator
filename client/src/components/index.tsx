import { Grid, Typography } from "@mui/material";
import { JSX } from "react";
// import { calculateAPI } from "../services/api";

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

  const buttons = [
    ["C", "+/-", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

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
          // border: "1px solid #333",
        }}
      >
        <Grid
          container
          sx={{
            backgroundColor: "#1a1a1a",
            borderRadius: 1,
            px: 4,
            py: 2,
            textAlign: "center",
            direction: "row",
          }}
        >
          <Typography>{"0"}</Typography>
        </Grid>
        {buttons.map((row, i) => (
          <Grid
            container
            key={i}
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 2,
            }}
          >
            {row.map((button, j) => (
              <Grid
                key={j}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#222222",
                  borderRadius: 1,
                  px: 4,
                  py: 2,
                  minWidth: "50px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                }}
              >
                <Typography>{button}</Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Calculator;
