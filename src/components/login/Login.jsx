import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { Paper } from "@mui/material";
const defaultTheme = createTheme();
import loginpagImage from "../../assets/images/loginpage.jpg";
import loginpagImage1 from "../../assets/images/loginpage1.png";

export default function Login() {
  const [isLogin, setisLogin] = useState(false)
  const [isLoading, setisLoading] = React.useState(false);
  const navigate = useNavigate();
  const [validation, setValidation] = useState({
    email: true,
    password: true,
  });
  const handleFieldChange = (fieldName, value) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: !!value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setisLoading(true);
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
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
      const response = await axios.post("/login", userData);
      const { message } = response.data;
      if (response.status === 200) {
        setisLogin(true)
        setisLoading(false);
        toast.success(message);
        const { _id, name, role, token } = response.data;
        Cookies.set("_id", _id);
        Cookies.set("name", name);
        Cookies.set("token", token);
        Cookies.set("role", role);
        if (role == "student") {
          navigate("/userDasboard");
        } else if (role == "faculty") {
          navigate("/facultyDashboard");
        } else {
        
            navigate("/adminDashboard");
          
          //navigate("/adminDashboard");
        }
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      setisLoading(false);
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        console.error("Server responded with a 400 error:", errorMessage);
      } else {
        setisLoading(false);
        console.error("Error occurred:", error);
      }
    }
    // navigate('/dashboard')
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <CustomeLoader />}
      <CssBaseline />
      <Grid container style={{ height: "100vh" }}>
        <Grid item xs={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!validation.email}
                helperText={!validation.email && "Email is required"}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!validation.password}
                helperText={!validation.password && "Password is required"}
                onChange={(e) => handleFieldChange("password", e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={"/"}>{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <img
            src={loginpagImage1}
            alt="loginpage"
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>

      <ToastContainer />
    </ThemeProvider>
  );
}
