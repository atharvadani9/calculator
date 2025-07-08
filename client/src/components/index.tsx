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

  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h2">{"Calculator App"}</Typography>
    </Grid>
  );
};

export default Calculator;
