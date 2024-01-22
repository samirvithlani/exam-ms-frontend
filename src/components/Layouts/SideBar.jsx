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
import HomeIcon from '@mui/icons-material/Home';

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
    {
      id: 10,
      name: "Add subject",
      linkUrl: "subject",
      textColor: "#7D8FB3",
      activeMenuFor: ["subject"],
      logoImage: AddIcon,
    },
    {
      id: 11,
      name: "Add standard",
      linkUrl: "standard",
      textColor: "#7D8FB3",
      activeMenuFor: ["standard"],
      logoImage: AddIcon,
    },
    {
      id: 12,
      name: "Add stream",
      linkUrl: "stream",
      textColor: "#7D8FB3",
      activeMenuFor: ["stream"],
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
  ];
  const filteredRouteArray = RouteArray.filter((route) => route.name !== "View Exam" && route.name !== "Update Exam");

  return (
    <div>
    <AdminHeader isExpanded={isExpanded} toggleSidebar={toggleSidebar} ></AdminHeader>
      <CssBaseline />
      <Box sx={{ display: "flex" ,backgroundColor:"rgb(238,242,246)",width:"100%" }}>
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
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
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
              width: "100%",
              mt: "50px",
              backgroundColor:"rgb(240,235,247)",
              borderRadius: "8px",
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
