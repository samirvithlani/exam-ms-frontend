import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Popover,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { constant } from "../../constant";
import axios from "axios";

const AdminHeader = ({ isExpanded, toggleSidebar, name }) => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [announcement, setAnnouncement] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const navigate = useNavigate();
  const role = Cookies.get("name");

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const response = await axios.get('/announcement');
      console.log(response.data,"--");
      setAnnouncement(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
    Cookies.clear();
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

  const handleWallet = () => {
    navigate("/userDasboard/wallet");
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotificationPopover = () => {
    setNotificationAnchorEl(null);
  };

  const open = Boolean(notificationAnchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <Box className="main-box">
      <AppBar
        position="static"
        sx={{
          backgroundColor: constant.backgroundColor,
          color: "#6B7A99",
          boxShadow: 0,
          borderBottom: "2px solid #F0F0F0",
        }}
      >
        <Container maxWidth="fluid">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ color: isExpanded ? "#fff" : "#fff" }}
            >
              {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
              {name}
            </Typography>
            <Box sx={{ width: "100px" }}></Box>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              color="rgb(255 255 255)"
              sx={{ color: "rgb(255 255 255)" }}
              onClick={handleNotificationClick}
            >
              <NotificationsIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={notificationAnchorEl}
              onClose={handleCloseNotificationPopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ p: 2, maxWidth: '300px' }}>
                <Typography variant="h6">Notifications</Typography>
                <List>
                  {announcement.map((item) => (
                    <ListItem key={item._id}>
                      <ListItemText
                        primary={item.title}
                        secondary={item.type.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Popover>
            <IconButton
              color="white"
              onClick={handleMenuClick}
              sx={{ color: "rgb(255 255 255)" }}
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="white" onClick={handleWallet}>
              <AccountBalanceWalletIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={Link}
                to={name === "STUDENT PANEL" ? "/userDasboard" : "/adminDashboard"}
                onClick={handleMenuClose}
              >
                <Typography variant="inherit">Home</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to={name === "STUDENT PANEL" ? "/userDasboard/userprofile" : "/adminDashboard/userprofile"}
                onClick={handleMenuClose}
              >
                <Typography variant="inherit">Profile</Typography>
              </MenuItem>
              <MenuItem sx={{ color: "#whitesmoke" }} onClick={handleOpenLogoutDialog}>
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
