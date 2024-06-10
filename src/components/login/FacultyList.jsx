import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDemoData } from "@mui/x-data-grid-generator";
import { CustomeLoader } from "../Layouts/CustomeLoader";

const UserGrid = () => {
  const navigate = useNavigate();
  const [facultyUsers, setFacultyUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchRolesData();
  }, []);

  const fetchRolesData = async () => {
    try {
      const response = await axios.get("/role");
      setRolesData(response.data);
    } catch (error) {
      console.error("Error fetching roles data:", error);
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

  const handleViewFacultyClick = (id) => {
    navigate(`/adminDashboard/facultyDetails/${id}`);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/user");
      const facultyData = response.data.filter(
        (user) => user.role.role === "faculty"
      );
      const formattedFacultyData = facultyData.map((faculty, index) => ({
        id: faculty._id,
        name: faculty.firstname,
        email: faculty.email,
        role: faculty.role?.role,
        status: faculty.status,
      }));
      setFacultyUsers(formattedFacultyData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, backgroundColor: "white", mt: 2 }}>
      {isLoading && <CustomeLoader />}
      <Typography variant="h4" fontWeight="bold" color="#010080" mb={1}>
        Faculty List
      </Typography>
      <Button
        variant="contained"
        onClick={() => handleAddRoleClick("faculty")}
        sx={{
          fontSize: 12,
          padding: "5px 10px",
          backgroundColor: "rgb(103,58,183)",
          color: "white",
          mt: { xs: 2, sm: 0 },
          mb: 2,
        }}
      >
        Add Faculty
      </Button>
      <Grid container spacing={2}>
        {facultyUsers.map((user) => (
          <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: "100%",bgcolor:"gray" }}>
              <CardContent>
                <Typography variant="h5" component="div" mb={1}>
                  {user.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Role: {user.role}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Status: {user.status}
                </Typography>
              </CardContent>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                onClick={() => handleViewFacultyClick(user.id)}
                size="small"
                variant="contained"
              >
                View Faculty
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default UserGrid;
