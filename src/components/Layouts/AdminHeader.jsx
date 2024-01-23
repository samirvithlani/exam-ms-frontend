import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
//import barterLogo from "../../assets/BXI_LOGO.png";
import Cookies from "js-cookie";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
const AdminHeader = ({ isExpanded, toggleSidebar }) => {
  const role = Cookies.get("name");
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <Box className="main-box">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#D6E4E9",
          color: "#6B7A99",
          boxShadow: 0,
          borderBottom: "2px solid #F0F0F0",
        }}
      >
        <Container maxWidth="fluid">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            
            <IconButton onClick={toggleSidebar}>
              {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            ADMIN PANEL
            <Box sx={{ width: "100px" }}></Box>
            <Typography
              sx={{
                mr: 5,
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "#6B7A99",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              {/* Admin Panel */}
            </Typography>

            <div style={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/userprofile">
              <AccountCircleIcon />
            </IconButton>
            <Typography sx={{ mr: 2, color: "#6B7A99", fontSize: "14px" }}>
              {role}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default AdminHeader;
