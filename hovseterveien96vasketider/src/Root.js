import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import App from "./App";

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: blue
  }
});

const Root = () => (
  <>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </>
);

export default Root;
