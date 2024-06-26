import {
  Avatar,
  Button,
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
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AddIcon from "@mui/icons-material/Add";
import { deepOrange, deepPurple } from "@mui/material/colors";
import ListIcon from "@mui/icons-material/List";
import "../../assets/layouts/layout.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Cookies from "js-cookie";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { constant } from "../../constant";

export const FacultySideBar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = 250;
  const partialWidth = 0;
  const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar expansion
  const [openLogoutDialog, setOpenLogoutDialog] = useState(!isMobile);
  const [subjects, setsubjects] = useState([]);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [Loading, setisloading] = useState(false);
  useEffect(() => {
    setOpenLogoutDialog(false);
    // fetchsubject()
  }, []);
  const fetchsubject = async () => {
    try {
      setisloading(true);
      const response = await axios.get("/subject");
      if (response.status === 200) {
        setsubjects(response.data);
        setisloading(false);
      }
      // console.log(response.data,"data");
    } catch (error) {
      console.log(error, "error");
    }
  };
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
      id: 12,
      name: "HOME",
      logoImage: HomeIcon,
      linkUrl: "",
      textColor: "#7D8FB3",
      activeMenuFor: ["adminDashboard"],
    },
    {
      id: 3,
      name: "Create Exam",
      logoImage: AddIcon,
      linkUrl: "createexam",
      textColor: "#7D8FB3",
      activeMenuFor: ["createExam"],
    },
    {
      id: 4,
      name: "Exam List",
      linkUrl: "subjectlist",
      textColor: "#7D8FB3",
      activeMenuFor: ["profile"],
      logoImage: ListIcon,
    },

    {
      id: 6,
      name: "ADD MCQ",
      linkUrl: "mcqquestion",
      textColor: "#7D8FB3",
      activeMenuFor: ["createExam"],
      logoImage: AddIcon,
    },

    
    

    {
      id: 13,
      name: "Add Topic",
      linkUrl: "topic",
      textColor: "#7D8FB3",
      activeMenuFor: ["topic"],
      logoImage: AddIcon,
    },
    {
      id: 14,
      name: "View Exam",
      linkUrl: "viewexam",
      textColor: "#7D8FB3",
      activeMenuFor: ["viewexam"],
    },
    {
      id: 15,
      name: "Update Exam",
      linkUrl: "updateexam",
      textColor: "#7D8FB3",
      activeMenuFor: ["updateexam"],
    },

    {
      id: 17,
      name: "userprofile",
      linkUrl: "userprofile",
      activeMenuFor: ["userprofile"],
    },
    {
      id: 18,
      name: "All question",
      linkUrl: "allquestion",
      activeMenuFor: ["allquestion"],
      logoImage: ListIcon,
    },

    {
      id: 21,
      name: "Exam Details",
      linkUrl: "examdetails",
      textColor: "#7D8FB3",
      activeMenuFor: ["examdetails"],
    },
  ];
  const filteredRouteArray = RouteArray.filter(
    (route) =>
      route.name !== "View Exam" &&
      route.name !== "Update Exam" &&
      route.name !== "Add Faculty" &&
      route.name != "userprofile" &&
      route.name !== "Exam Details"
  );
  const handleToggleSubject = (subjectId) => {
    if (expandedSubject === subjectId) {
      setExpandedSubject(null);
    } else {
      setExpandedSubject(subjectId);
    }
  };
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <AdminHeader
        isExpanded={isExpanded}
        toggleSidebar={toggleSidebar}
        name={"STUDENT PANEL"}
      />
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
          variant={isMobile ? "temporary" : "permanent"}
          open={isExpanded}
          onClose={() => setIsExpanded(false)}
          PaperProps={{
            sx: {
              position: "inherit",
              borderRight: 0,
              width: isExpanded ? drawerWidth : 0,
              height: "100%",
              minHeight: "635px",
              flexShrink: 0,
              overflowX: "hidden",
              border: "5px solid #F0F0F0",
              borderRadius: "10px",
              backgroundColor: "white",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            },
          }}
          ModalProps={{ keepMounted: true }}
          anchor="left"
        >
          <List>
            {filteredRouteArray.map((res, index) => (
              <ListItem
                key={res.name}
                disablePadding
                component={Link}
                to={res.linkUrl !== "null" ? res.linkUrl : "#"}
                onClick={() => isMobile && setIsExpanded(false)}
                sx={{
                  "&:hover": {
                    backgroundColor: constant.backgroundColor,
                  },
                  "&:hover .MuiListItemText-root": {
                    color: "white",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: constant.backgroundColor }}>
                      {res?.logoImage && <res.logoImage />}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: constant.backgroundColor,fontWeight:"bold"}}
                    primary={res.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              sx={{
                color: "#whitesmoke",
                bgcolor: constant.backgroundColor,
                fontFamily: "Lato",
                "&:hover": {
                  backgroundColor: constant.backgroundColor,
                  color: "white",
                },
              }}
              startIcon={<ExitToAppIcon />}
              onClick={handleOpenLogoutDialog}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Drawer>
        <Box component="main" sx={{ width: "100%", height: "100%", mt: 3, mr: 2 }}>
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
    </ThemeProvider>
  );
};
