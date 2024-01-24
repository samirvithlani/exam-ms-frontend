import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signUpImage from "../../assets/images/signup.jpg";
import { useState } from "react";
import signup from "../../assets/images/signup.svg";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#673AB7', // Change this to your desired color
    },
  },
});
export default function SignUp() {
   const navigate = useNavigate()
  const [validation, setValidation] = useState({
    firstname: true,
    lastname: true,
    email: true,
    password: true,
    phone: true,
  });
  const handleFieldChange = (fieldName, value) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: !!value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
    };
    const updatedValidation = {};
    let isValid = true;

    for (const key in userData) {
      updatedValidation[key] = !!userData[key];
      isValid = isValid && updatedValidation[key];
    }

    setValidation(updatedValidation);

    if (!isValid) {
      return;
    }
    try {
      const response = await axios.post("/signup", userData);
      const { message } = response.data;
      if (response.status === 200) {
      toast.success(message);
      navigate('/login');
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        console.error("Server responded with a 400 error:", errorMessage);
      } else {
        console.error("Error occurred:", error);
      }
    }
  };
  const textFieldStyle = { borderRadius: 8 }; 

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container style={{ height: "100vh" }}>
        <Grid item xs={6} sx={{ ml: 1 }}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" sx={{fontFamily:"Lato"}}>
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
             
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                   error={!validation.firstname}
                    helperText={!validation.firstname && "First Name is required"}
                    onChange={(e) => handleFieldChange("firstname", e.target.value)}
                    autoFocus
                    sx={{ borderRadius: 8 }} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    error={!validation.lastname}
                    helperText={!validation.lastname && "Last Name is required"}
                    onChange={(e) => handleFieldChange("lastname", e.target.value)}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!validation.email}
                    helperText={!validation.email && "Email is required"}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!validation.password}
                    helperText={!validation.password && "Password is required"}
                    onChange={(e) => handleFieldChange("password", e.target.value)}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    type="Number"
                    id="phone"
                    error={!validation.phone}
                    helperText={!validation.phone && "Phone Number is required"}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign UP
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/login"}>Already have an account? log in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5} sx={{ ml: 1 }}>
          <img
            src={signup}
            alt="loginpage"
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}
