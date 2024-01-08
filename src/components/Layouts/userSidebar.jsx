import {
    Avatar,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useContext } from "react";
  import { Link, Outlet } from "react-router-dom";
  import AdminHeader from "./AdminHeader";
  import AddIcon from "@mui/icons-material/Add";
  import { deepOrange, deepPurple } from "@mui/material/colors";
  import ListIcon from '@mui/icons-material/List';
  import "../../assets/layouts/layout.module.css";
  import MenuIcon from '@mui/icons-material/Menu';
  import IconButton from "@mui/material/IconButton";
  import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
  import { useState } from "react";
  export const UserSideBar = () => {
    const drawerWidth = 250;
    const partialWidth = 70; 
    const [isExpanded, setIsExpanded] = useState(true); 

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
    const RouteArray = [
      {
        id: 1,
        name: "Dashboard",
        logoImage: AddIcon,
        linkUrl: "dashboard",
        textColor: "#7D8FB3",
        activeMenuFor: ["dashboard"],
      },
      {
        id: 2,
        name: "result",
        linkUrl: "history",
        textColor: "#7D8FB3",
        activeMenuFor: ["history"],
        logoImage:ListIcon
      },
      {
        id: 3,
        name: "Answer",
        linkUrl: "Viewanswers",
        textColor: "#7D8FB3",
        activeMenuFor: ["viewanswers"],
        logoImage:ListIcon
      },
      {
        id: 4,
        name: "Question",
        linkUrl: "question",
        textColor: "#7D8FB3",
        activeMenuFor: ["question"],
        logoImage:ListIcon
      },


    ];
    const filteredRouteArray = RouteArray.filter((route) => route.name !== "Answer"&& route.name !== "Question");

    return (
      <div>

        <CssBaseline />
        <IconButton onClick={toggleSidebar}>
        {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>
        <Box sx={{ display: "flex" }}>
        <Drawer
          PaperProps={{
            sx: {
              // marginRight: "5px",
              position: "inherit",
              borderRight: 0,
              width: isExpanded ? drawerWidth : partialWidth,
              flexShrink: 0,
              backgroundColor:"black",
              height: "100vh",
              // borderRadius: "0 50px 50px 0",
              "& .MuiDrawer-paper": {
                // width: drawerWidth,
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
                  style={{ marginTop: "10px" }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#7776EE", 
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar sx={{ m: 1, bgcolor: deepPurple[500] }}>
                        {res?.logoImage && <res.logoImage />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      className="sidebartext"
                      sx={{ color: "whitesmoke" }}
                      primary={res.name}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
           component="main"
           sx={{
            //  width:   "100%",
             // transition: "width 0.2s ease-in-out",
           }}>
            {/* <Toolbar /> */}
            <Outlet />
          </Box>
        </Box>
      </div>
    );
  };
  