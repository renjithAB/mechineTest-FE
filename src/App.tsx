import React from "react";
import Header from "./layout/header";
import SideNav from "./layout/sidebar";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import RoutesList from "./routes";
import SnackBar from "./components/snackbar";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <SnackBar></SnackBar>
        <RoutesList />
      </Box>
      <SideNav />
    </Box>
  );
}

export default App;
