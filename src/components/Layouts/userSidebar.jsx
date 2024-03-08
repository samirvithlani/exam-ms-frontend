import {
    Avatar,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Dialog, DialogActions, DialogContent, DialogTitle,
    useMediaQuery
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useContext ,useEffect} from "react";
  import { Link, Outlet ,useNavigate} from "react-router-dom";
  import AdminHeader from "./AdminHeader";
  import AddIcon from "@mui/icons-material/Add";
  import { deepOrange, deepPurple } from "@mui/material/colors";
  import ListIcon from '@mui/icons-material/List';
  import "../../assets/layouts/layout.module.css";
  import MenuIcon from '@mui/icons-material/Menu';
  import IconButton from "@mui/material/IconButton";
  import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
  import { useState } from "react";
  import Cookies from "js-cookie";
  import {Button} from "@mui/material";
  import ExitToAppIcon from "@mui/icons-material/ExitToApp";
  import HomeIcon from '@mui/icons-material/Home';

  export const UserSideBar = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");
    const drawerWidth = 250;
    const partialWidth = 0; 
    const [isExpanded, setIsExpanded] = useState(true); 
    const [openLogoutDialog, setOpenLogoutDialog] = useState(!isMobile);
  
    useEffect(() => {
      
      setOpenLogoutDialog(false);
    }, []);
      const handleOpenLogoutDialog = () => {
      setOpenLogoutDialog(true);
    };
  
    const handleCloseLogoutDialog = () => {
      setOpenLogoutDialog(false);
    };
  
    const handleLogout = () => {
      // Remove cookies and navigate to login page
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
        linkUrl: "currentexam",
        textColor: "#7D8FB3",
        activeMenuFor: ["currentexam"],
      },
      {
        id: 3,
        name: "result",
        linkUrl: "history",
        textColor: "#7D8FB3",
        activeMenuFor: ["history"],
        logoImage:ListIcon
      },
      {
        id: 4,
        name: "Answer",
        linkUrl: "Viewanswers",
        textColor: "#7D8FB3",
        activeMenuFor: ["viewanswers"],
        logoImage:ListIcon
      },
      {
        id: 5,
        name: "Question",
        linkUrl: "question",
        textColor: "#7D8FB3",
        activeMenuFor: ["question"],
        logoImage:ListIcon
      },
      {
        id: 6,
        name: "userprofile",
        linkUrl: "userprofile",
        activeMenuFor: ["userprofile"],
      },
      {
        id: 7,
        name: "wallet",
        linkUrl: "wallet",
        activeMenuFor: ["wallet"],
      },
      
    ];
    const filteredRouteArray = RouteArray.filter(
      (route) =>
       route.name !== "Answer"&& 
       route.name !== "Question"&&
       route.name != "userprofile"&&
       route.name !== "wallet"
       );
    return (
      <div>
        <AdminHeader
          isExpanded={isExpanded}
          toggleSidebar={toggleSidebar}
          name = {'STUDENT PANEL'}
        ></AdminHeader>
        <CssBaseline />
        
        <Box
          sx={{
            display: "flex",
            backgroundColor: "rgb(238,242,246)",
            width: "100%",
            fontFamily: "Lato",
          }}
        >
          <Drawer
            PaperProps={{
              sx: {
                marginRight: "5px",
                position: "inherit",
                borderRight: 0,
                width: isExpanded ? drawerWidth : partialWidth,
                height: "100%", // Set height to 100% of the viewport height
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
            variant="permanent"
            anchor="left"
          >
            {" "}
            <List>
              {filteredRouteArray.map((res, index) => (
                <ListItem
                  className={
                    res.activeMenuFor.some((x) => location.pathname.includes(x))
                      ? "activebtn"
                      : res.linkUrl == "null"
                      ? "disabled-link"
                      : ""
                  }
                  // className={location.pathname.includes(res.linkUrl) ? 'activebtn' : res.linkUrl == 'null' ? 'disabled-link' : ''}
                  key={res.name}
                  disablePadding
                  component={Link}
                  to={res.linkUrl != "null" ? res.linkUrl : "#"}
                  style={{ marginTop: "5px" }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#7776EE",
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: "rgb(94,114,228)" }}>
                        {res?.logoImage && <res.logoImage />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      className="sidebartext"
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
                sx={{ color: "#whitesmoke", bgcolor: deepPurple[500] }}
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
          sx={{
            width: "100%",
            mt: "50px",
            height: "100%",
            // backgroundColor:"rgb(240,235,247)",
            // borderRadius: "8px",
            // transition: "width 0.2s ease-in-out",
          }}
        >
          {/* <Toolbar /> */}
          <Outlet />
        </Box>
        </Box>
        <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>Are you sure you want to exit?</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
            <Button onClick={()=>{handleLogout()}} color="error">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  