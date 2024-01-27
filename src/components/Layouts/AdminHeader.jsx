import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { deepOrange, deepPurple } from "@mui/material/colors";

const AdminHeader = ({ isExpanded, toggleSidebar }) => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const role = Cookies.get("name");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = () => {
    Cookies.remove("token", { path: "" });
    Cookies.remove("name", { path: "" });
    Cookies.remove("id", { path: "" });
    navigate("/login");
  };

  return (
    <Box className="main-box">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgb(94,114,228)",
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
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              ADMIN PANEL
            </Typography>
            <Box sx={{ width: "100px" }}></Box>
            <div style={{ flexGrow: 1 }} />
            <IconButton color="rgb(255 255 255)" sx={{color:"rgb(255 255 255)"}}>
              <NotificationsIcon />
            </IconButton>
            <IconButton color="white" onClick={handleMenuClick} sx={{color:"rgb(255 255 255)"}}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={Link}
                to="/adminDashboard"
                onClick={handleMenuClose}
              >
                <Typography variant="inherit">Home</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/adminDashboard/userprofile"
                onClick={handleMenuClose}
              >
                <Typography variant="inherit">Profile</Typography>
              </MenuItem>
              <MenuItem
                sx={{ color: "#whitesmoke" }}
                onClick={handleOpenLogoutDialog}
              >
                <Typography variant="inherit">Logout</Typography>
              </MenuItem>
            </Menu>
            <Typography sx={{ mr: 2, color: "white", fontSize: "14px" }}>
              {role}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to exit?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AdminHeader;
