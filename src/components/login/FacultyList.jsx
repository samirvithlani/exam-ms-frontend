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
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";

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

  const typoProps = {
    color: "#000000",
    fontWeight: "bold"
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "auto",
        backgroundColor: "white",
        m: 2,
        boxShadow: 8,
      }}
      className="responsive-container"
    >
      {isLoading && <CustomeLoader />}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: constant.backgroundColor,
        }}
      >
        Faculty List ::
      </Typography>
      <Button
        variant="contained"
        onClick={() => handleAddRoleClick("faculty")}
        sx={{
          // fontSize: 12,
          // padding: "5px 10px",
          width: "fit-content",
          backgroundColor: constant.backgroundColor,
          color: "white",
          mb: 2,
        }}
      >
        Add Faculty
      </Button>
      <Grid container spacing={3}>
        {facultyUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{
                backgroundColor: "#FFFFF",
                boxShadow: 10,
                borderRadius: 4,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.10)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    textTransform: "uppercase",
                    color: constant.backgroundColor,
                  }}
                >
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={typoProps}>
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" sx={typoProps}>
                  Role: {user.role}
                </Typography>
                <Typography variant="body2" sx={typoProps}>
                  Status: {user.status}
                </Typography>
              </CardContent>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                onClick={() => handleViewFacultyClick(user.id)}
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: constant.backgroundColor,
                  color: "white",
                  m: 1,
                }}
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
