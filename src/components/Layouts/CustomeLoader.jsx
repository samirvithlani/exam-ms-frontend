import React from "react";
import {
  CircularProgress,
  createTheme,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import "../../assets/css/loadercust.css";

export const CustomeLoader = () => {
  console.log("called....11")
  return (
    <div class="banter-loader">
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
    </div>
  );
};
