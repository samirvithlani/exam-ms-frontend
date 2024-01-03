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

  export const SideBar = () => {
    const drawerWidth = 200;
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
        logoImage:ListIcon
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
        <AdminHeader></AdminHeader>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
        <Drawer
          PaperProps={{
            sx: {
              position: "inherit",
              borderRight: 0,
              width: drawerWidth,
              // height:"17cm",
              flexShrink: 0,
              backgroundColor:"black",
              borderRadius: "0 50px 50px 0",
              "& .MuiDrawer-paper": {
                // width: drawerWidth,
                boxSizing: "border-box",
              },
            },
          }}
          variant="permanent"
          anchor="left"
        >   <List>
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
                      sx={{ color:"whitesmoke" }}
                      primary={res.name}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
            {/* <Toolbar /> */}
            <Outlet />
          </Box>
        </Box>
      </div>
    );
  };
  