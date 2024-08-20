import React, { useEffect, useState } from "react";
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
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  GlobalStyles,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cookies from "js-cookie";
import { constant } from "../../constant";

export const UserSideBar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = 250;
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openContestMenu, setOpenContestMenu] = useState(false);
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
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleContestMenu = () => {
    setOpenContestMenu(!openContestMenu);
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
      id: 6,
      name: "Subject Prefrence",
      linkUrl: "subjectprefrence",
      textColor: "#7D8FB3",
      activeMenuFor: ["subjectprefrence"],
      logoImage: ListIcon,
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
      name: "Result",
      linkUrl: "history",
      textColor: "#7D8FB3",
      activeMenuFor: ["history"],
      logoImage: ListIcon,
    },
    {
      id: 4,
      name: "Contest",
      logoImage: ListIcon,
      linkUrl: "#", // The main "Contest" item does not link to any URL
      textColor: "#7D8FB3",
      activeMenuFor: ["allcontest", "contestdetails"],
      submenu: [
        {
          name: "All Contest",
          linkUrl: "allcontest", // URL remains the same
        },
        // {
        //   name: "Contest Details",
        //   linkUrl: "contestdetails", // URL remains the same
        // },
      ],
    },
    {
      id: 5,
      name: "Leaderboard",
      linkUrl: "leaderboard",
      textColor: "#7D8FB3",
      activeMenuFor: ["leaderboard"],
      logoImage: ListIcon,
    },
   
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

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor,
      },
    },
  });

  const GlobalScrollbarStyles = ({ backgroundColor }) => (
    <GlobalStyles
      styles={{
        "*::-webkit-scrollbar": {
          width: "10px",
          height: "4px",
        },
        "*::-webkit-scrollbar-track": {
          background: "white",
        },
        "*::-webkit-scrollbar-thumb": {
          background: backgroundColor,
          borderRadius: "4px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: backgroundColor,
        },
      }}
    />
  );

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
        <GlobalScrollbarStyles backgroundColor={constant.backgroundColor} />
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
              <React.Fragment key={res.name}>
                <ListItem
                  disablePadding
                  component={res.submenu ? "div" : Link}
                  to={res.submenu ? undefined : res.linkUrl}
                  onClick={
                    res.submenu
                      ? toggleContestMenu
                      : () => isMobile && setIsExpanded(false)
                  }
                  sx={{
                    fontWeight: "bold",
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
                      sx={{
                        color: constant.backgroundColor,
                        fontWeight: "bold",
                      }}
                      primary={res.name}
                    />
                    {res.submenu && (openContestMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
                  </ListItemButton>
                </ListItem>

                {res.submenu && (
                  <Collapse in={openContestMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {res.submenu.map((submenu) => (
                        <ListItem
                          key={submenu.name}
                          disablePadding
                          component={Link}
                          to={submenu.linkUrl}
                          onClick={() => isMobile && setIsExpanded(false)}
                          sx={{
                            paddingLeft: 4,
                            "&:hover": {
                              backgroundColor: constant.backgroundColor,
                            },
                            "&:hover .MuiListItemText-root": {
                              color: "white",
                            },
                          }}
                        >
                          <ListItemButton>
                            <ListItemText
                              sx={{ color: constant.backgroundColor, fontWeight: "bold" }}
                              primary={submenu.name}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
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
