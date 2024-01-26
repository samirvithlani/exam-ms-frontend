import React from "react";
import {
  CircularProgress,
  createTheme,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export const CustomeLoader = () => {
  return(
  <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Set the height of the container to 100% of the viewport height
      }}
    >
      <CircularProgress />
    </div>
  )
};
