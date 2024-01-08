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
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AddIcon from "@mui/icons-material/Add";
import { deepOrange, deepPurple } from "@mui/material/colors";
import ListIcon from "@mui/icons-material/List";
import "../../assets/layouts/layout.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Cookies from "js-cookie";

export const SideBar = () => {
  const navigate = useNavigate();
  const drawerWidth = 250;
  const partialWidth = 70;
  const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar expansion

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const RouteArray = [
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
      linkUrl: "examlist",
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
      id: 7,
      name: "Faculty List",
      linkUrl: "facultylist",
      textColor: "#7D8FB3",
      activeMenuFor: ["facultylist"],
      logoImage: ListIcon,
    },
    {
      id: 8,
      name: "Company List",
      linkUrl: "Companylist",
      textColor: "#7D8FB3",
      activeMenuFor: ["companylist"],
      logoImage: ListIcon,
    },
    {
      id: 9,
      name: "Student List",
      linkUrl: "studentlist",
      textColor: "#7D8FB3",
      activeMenuFor: ["studentlist"],
      logoImage: ListIcon,
    },
  ];

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
              marginRight: "5px",
              position: "inherit",
              borderRight: 0,
              width: isExpanded ? drawerWidth : partialWidth,
              height: "100vh", // Set height to 100% of the viewport height
              flexShrink: 0,
              overflowX: "hidden",
              backgroundColor: "black",
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
            {RouteArray.map((res, index) => (
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
          <Box sx={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              sx={{ color: "#whitesmoke", bgcolor: deepPurple[500] }}
              startIcon={<ExitToAppIcon />}
              onClick={() => {
                //remove cookie
                //Cookies.remove("token");
                //clear cookie
                Cookies.remove("token", { path: "" });
                Cookies.remove("name", { path: "" });
                Cookies.remove("id", { path: "" });
                navigate("/login");
              }}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={
            {
              // transition: "width 0.2s ease-in-out",
            }
          }
        >
          {/* <Toolbar /> */}
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};
