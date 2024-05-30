import {
  Avatar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AddIcon from "@mui/icons-material/Add";
import { deepOrange, deepPurple } from "@mui/material/colors";
import ListIcon from '@mui/icons-material/List';
import "../../assets/layouts/layout.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from '@mui/icons-material/Home';
import { useParams } from "react-router-dom";

export const UserSideBar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = 250;
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const { token } = useParams();
  
  useEffect(() => {
    setIsExpanded(!isMobile);
  }, [isMobile]);

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("_id");  
    Cookies.remove("role");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const RouteArray = [
    {
      id: 1,
      name: "Home",
      logoImage: HomeIcon,
      linkUrl: "",
      textColor: "#7D8FB3",
      activeMenuFor: ["dashboard"],
    },
    {
      id: 2,
      name: "Current Exam",
      logoImage: ListIcon,
      linkUrl: "subject",
      textColor: "#7D8FB3",
      activeMenuFor: ["subject"],
    },
    {
      id: 3,
      name: "result",
      linkUrl: "history",
      textColor: "#7D8FB3",
      activeMenuFor: ["history"],
      logoImage: ListIcon,
    },
    // ... other routes
  ];

  const filteredRouteArray = RouteArray.filter(
    (route) =>
      route.name !== "Answer" && 
      route.name !== "Question" &&
      route.name !== "userprofile" &&
      route.name !== "wallet" &&
      route.name !== "subjects" &&
      route.name !== "Exam Details"
  );

  return (
    <div>
      <AdminHeader
        isExpanded={isExpanded}
        toggleSidebar={toggleSidebar}
        name={'STUDENT PANEL'}
      />
      <CssBaseline />
      <Box sx={{ display: "flex", backgroundColor: "rgb(238,242,246)", width: "100%", fontFamily: "Lato" }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isExpanded}
          onClose={() => setIsExpanded(false)}
          PaperProps={{
            sx: {
              position: "inherit",
              borderRight: 0,
              width: isExpanded ? drawerWidth : 0,
              height: "650px",
              flexShrink: 0,
              overflowX: "hidden",
              border: "5px solid #F0F0F0",
              borderRadius: "30px",
              backgroundColor: "white",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            },
          }}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          anchor="left"
        >
          <List>
            {filteredRouteArray.map((res, index) => (
              <ListItem
                key={res.name}
                disablePadding
                component={Link}
                to={res.linkUrl !== "null" ? res.linkUrl : "#"}
                onClick={() => isMobile && setIsExpanded(false)} // Close drawer on link click if mobile
                sx={{ "&:hover": { backgroundColor: "#7776EE" } }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: "rgb(1,0,128)" }}>
                      {res?.logoImage && <res.logoImage />}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "black" }}
                    primary={res.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              sx={{ color: "#whitesmoke", bgcolor: "rgb(1,0,128)" }}
              startIcon={<ExitToAppIcon />}
              onClick={handleOpenLogoutDialog}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ width: "100%", mt: "50px", height: "100%" }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
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
    </div>
  );
};
