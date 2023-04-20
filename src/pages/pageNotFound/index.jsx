import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
//
function Error404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        textAlign: "center",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h2">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{
          borderRadius: 2,
          fontSize: 14,
          width: 200,
          height: 45,
          bgcolor: "#001EB9",
          textTransform: "none",
          mt: 2,
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
}

export default Error404;
