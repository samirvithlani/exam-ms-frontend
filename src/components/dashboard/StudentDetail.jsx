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
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const StudentDetail = () => {
  const [userData, setUserData] = useState({
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    profilePic: "https://via.placeholder.com/150", // Placeholder image
  });
  const id = useParams().id;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    // fetchData(); // Commented out for now, we'll fill in data later
  }, []);

  // Function to handle form submission
  const onSubmit = async (data) => {
    // Update user data
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
              alt="Profile"
              src={userData.profilePic}
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
              Given Exams
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Mathematics</Typography>
                    <Typography variant="body2">
                      Score: 85 / 100
                    </Typography>
                    <Typography variant="body2">Date: 2024-06-12</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Science</Typography>
                    <Typography variant="body2">
                      Score: 78 / 100
                    </Typography>
                    <Typography variant="body2">Date: 2024-06-11</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Chart 1
            </Typography>
            {/* Space for first chart */}
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Chart 2
            </Typography>
            {/* Space for second chart */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentDetail;
