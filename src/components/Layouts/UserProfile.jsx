import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { PieComponent } from "../charts/PieComponent"; // Assuming PieComponent is imported from the correct location

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const id = Cookies.get("_id");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get(`/user/${id}`);
      console.log("User data:", result.data);
      setUserData(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`/user/${id}`, data);
      // Refresh user data after update
      fetchData();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
            <Avatar
              src={userData.profilePic}
              alt="Profile"
              sx={{
                width: 100,
                height: 100,
                marginBottom: 2,
                bgcolor: "#010080",
                fontSize: 40,
              }}
            >
              {userData?.firstname?.charAt(0)}
              {userData?.lastname?.charAt(0)}
            </Avatar>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Name: {userData.firstname} {userData.lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Email: {userData.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Phone: {userData.phone}
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Edit Profile
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("firstname")}
                label="First Name"
                defaultValue={userData.firstname}
                fullWidth
                margin="normal"
              />
              <TextField
                {...register("lastname")}
                label="Last Name"
                defaultValue={userData.lastname}
                fullWidth
                margin="normal"
              />
              <TextField
                {...register("email")}
                label="Email"
                defaultValue={userData.email}
                fullWidth
                margin="normal"
              />
              <TextField
                {...register("phone")}
                label="Phone"
                defaultValue={userData.phone}
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Exam History
            </Typography>
            <div style={{ width: "100%", maxWidth: 400, margin: "auto" }}>
              <PieComponent chartType="pie" apiToCall="subject" />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
