import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, useTheme, Paper } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";
import { CustomeLoader } from "../Layouts/CustomeLoader";

const UserGrid = () => {
  const navigate = useNavigate();
  const [facultyUsers, setFacultyUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [rolesData, setRolesData] = useState([]);
  const theme = useTheme();
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });
  const paperStyle = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: "auto",
    backgroundColor: "white",
    m1: 2,
  };
  useEffect(() => {
    fetchdata();
    fetchRolesData();
  }, []);
  const fetchRolesData = async () => {
    try {
      const response = await axios.get("/role");
      let data = response.data;
      setRolesData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAddRoleClick = (role) => {
    const roleData = rolesData.find((item) => item.role === role);
    if (roleData) {
      navigate(`/adminDashboard/add/${roleData._id}`);
    } else {
      console.log(`No data found for the ${role} role.`);
    }
  };
  const fetchdata = async () => {
    setisLoading(true);
    let response = await axios.get("/user");
    const facultyData = response.data.filter(
      (user) => user.role.role === "faculty"
    );
    let filterdata = facultyData.map((faculty, index) => ({
      displayid: index + 1,
      id: faculty._id,
      firstname: faculty.firstname,
      email: faculty.email,
      role: faculty.role?.role,
      status: faculty.status,
    }));
    setFacultyUsers(filterdata);
    setisLoading(false);
  };
  const columns = [
    { field: "displayid", headerName: "ID", width: 90 },
    { field: "firstname", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Role", width: 300 },
    { field: "status", headerName: "Status", width: 300 },
  ];
  return (
    <Paper sx={paperStyle} className="responsive-container">
      {isLoading ? <CustomeLoader /> : null}
      <Grid style={{ height: 400, width: "100%" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Lato" }}
        >
          Faculty List
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleAddRoleClick("faculty")}
          sx={{
            fontSize: "12px",
            padding: "5px 10px",
            backgroundColor: "rgb(103,58,183)",
            color: "white",
            marginLeft: { xs: "auto", sm: 0 }, // Adjusted for responsiveness
            mt: { xs: "10px", sm: 0 }, // Adjusted for responsiveness
          }}
        >
          Add Faculty
        </Button>
        <Grid
          container
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            width: "80vw",
            height: "50vh",
            overflowX: "auto",
            [theme.breakpoints.down("sm")]: {
              width: "100vw",
              height: "50vh",
            },
          }}
        >
          <DataGrid
            sx={{
              border: "none",
              fontFamily: "Lato",
            }}
            rows={facultyUsers}
            columns={columns.map((column) => ({
              ...column,
              renderCell: (params) => {
                return (
                  <Grid container justifyContent="center" alignItems="center">
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      fontFamily="Lato"
                    >
                      {params.value}
                    </Typography>
                  </Grid>
                );
              },
            }))}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 5 } },
              
            }}
            rowHeight={80}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserGrid;
