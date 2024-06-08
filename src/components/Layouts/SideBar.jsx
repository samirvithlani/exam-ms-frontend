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

export const SideBar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = 250;
  const partialWidth = 0;
  const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar expansion
  const [openLogoutDialog, setOpenLogoutDialog] = useState(!isMobile);
  const [subjects, setsubjects] = useState([]);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [Loading,setisloading] = useState(false)
  useEffect(() => {
    setOpenLogoutDialog(false);
    // fetchsubject()
  }, []);
 const fetchsubject = async () =>{
  try {
    setisloading(true)
    const response = await axios.get("/subject");
    if(response.status===200){
      setsubjects(response.data)
      setisloading(false)
    }
    // console.log(response.data,"data");
  } catch (error) {
    console.log(error,"error");
  }
 
}
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
    {
      id: 16,
      name: "Add Faculty",
      linkUrl: "addfaculty",
      activeMenuFor: ["addfaculty"],
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
      id: 19,
      name: "Credit Request List",
      linkUrl: "creditRequestList",
      activeMenuFor: ["creditRequestList"],
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

  
  //   <div>
  //     <AdminHeader
  //       isExpanded={isExpanded}
  //       toggleSidebar={toggleSidebar}
  //       name = {'ADMIN PANEL'}
  //     ></AdminHeader>
  //     <CssBaseline />
  //     <Box
  //       sx={{
  //         display: "flex",
  //         backgroundColor: "rgb(238,242,246)",
  //         width: "100%",
  //         fontFamily: "Lato",
  //       }}
  //     >
  //       <Drawer
  //         PaperProps={{
  //           sx: {
  //             marginRight: "5px",
  //             position: "inherit",
  //             borderRight: 0,
  //             width: isExpanded ? drawerWidth : partialWidth,
  //             height: "100%", // Set height to 100% of the viewport height
  //             flexShrink: 0,
  //             overflowX: "hidden",
  //             border: "5px solid #F0F0F0",
  //             borderRadius: "30px",
  //             backgroundColor: "white",
  //             "& .MuiDrawer-paper": {
  //               boxSizing: "border-box",
  //             },
  //           },
  //         }}
  //         variant="permanent"
  //         anchor="left"
  //       >
  //         <List>
  //           {filteredRouteArray.map((res, index) => (
  //             <ListItem
  //               className={
  //                 res.activeMenuFor.some((x) =>
  //                   location.pathname.includes(x)
  //                 )
  //                   ? "activebtn"
  //                   : res.linkUrl == "null"
  //                   ? "disabled-link"
  //                   : ""
  //               }
  //               key={res.name}
  //               disablePadding
  //               component={Link}
  //               to={res.linkUrl != "null" ? res.linkUrl : "#"}
  //               style={{ marginTop: "5px" }}
  //               sx={{
  //                 "&:hover": {
  //                   backgroundColor: "#7776EE",
  //                 },
  //               }}
  //             >
  //               <ListItemButton>
  //                 <ListItemIcon>
  //                   <Avatar
  //                     sx={{ bgcolor: "#010080", width: 24, height: 24 }}
  //                   >
  //                     {res?.logoImage && <res.logoImage />}
  //                   </Avatar>
  //                 </ListItemIcon>
  //                 <ListItemText
  //                   className="sidebartext"
  //                   sx={{ color: "black" }}
  //                   primary={res.name}
  //                 />
  //               </ListItemButton>
  //             </ListItem>
  //           ))}
  //         </List>
  //         <Box sx={{ marginTop: "auto" }}>
  //           <Button
  //             variant="contained"
  //             sx={{ color: "#whitesmoke", bgcolor: "#010080" }}
  //             startIcon={<ExitToAppIcon />}
  //             onClick={handleOpenLogoutDialog}
  //             fullWidth
  //           >
  //             Logout
  //           </Button>
  //         </Box>
  //       </Drawer>
  //       {/* Main Content */}
  //       <Box
  //         component="main"
  //         sx={{
  //           width: "100%",
  //           mt: "50px",
  //           height: "100%",
  //         }}
  //       >
  //         <Outlet />
  //       </Box>
  //     </Box>
  //     {/* Logout Dialog */}
  //     <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
  //       <DialogTitle>Confirm Logout</DialogTitle>
  //       <DialogContent>Are you sure you want to exit?</DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
  //         <Button onClick={handleLogout} color="error">
  //           Logout
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   </div>
  // );
  return (
    <div>
      <AdminHeader
        isExpanded={isExpanded}
        toggleSidebar={toggleSidebar}
        name={"ADMIN PANEL"}
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
          <List>
            {filteredRouteArray.map((res, index) => (
              <div key={res.name}>
                <ListItem
                  className={
                    res.activeMenuFor.some((x) =>
                      location.pathname.includes(x)
                    )
                      ? "activebtn"
                      : res.linkUrl == "null"
                      ? "disabled-link"
                      : ""
                  }
                  disablePadding
                  sx={{
                    "&:hover": {
                      backgroundColor: "#7776EE",
                    },
                  }}
                >
                  {res.name === "List" ? (
                    <ListItemButton
                      sx={{ paddingLeft: "20px" }}
                      onClick={() => handleToggleSubject(res.id)}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{ bgcolor: "#010080", width: 24, height: 24 }}
                        >
                          {res?.logoImage && <res.logoImage />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        className="sidebartext"
                        sx={{ color: "black" }}
                        primary={res.name}
                      />
                      {expandedSubject === res.id ? (
                        <ChevronLeftIcon />
                      ) : (
                        <ChevronRightIcon />
                      )}
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      component={Link}
                      to={res.linkUrl != "null" ? res.linkUrl : "#"}
                      style={{ marginTop: "5px" }}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{ bgcolor: "#010080", width: 24, height: 24 }}
                        >
                          {res?.logoImage && <res.logoImage />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        className="sidebartext"
                        sx={{ color: "black" }}
                        primary={res.name}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
                {expandedSubject === res.id &&
                  res.children &&
                  res.children.map((subject) => (
                    <ListItem
                      className="nested-subject"
                      key={subject.id}
                      button
                      component={Link}
                      to={subject.linkUrl}
                      // onClick={handleCloseDrawer}
                    >
                      <ListItemText primary={subject.name} />
                    </ListItem>
                  ))}
              </div>
            ))}
          </List>
          <Box sx={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              sx={{ color: "#whitesmoke", bgcolor: "#010080" }}
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
          sx={{ width: "100%",  height: "100%",mt:3,ml:1,mr:1}}
        >
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