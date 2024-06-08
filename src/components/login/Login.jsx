import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import loginImage from "../../assets/images/loginImage3.svg";
import { Link } from "react-router-dom";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#673AB7", // Change this to your desired color
    },
  },
});

export default function Login() {
  const [isLogin, setisLogin] = useState(false);
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

  const handleGoogleSignIn = () => {
    window.location.href = "https://exam-ms.onrender.com/google/callback";
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
      setisLoading(false);
      return;
    }
    try {
      const response = await axios.post("/login", userData);
      const { message } = response.data;
      if (response.status === 200) {
        setisLogin(true);
        setisLoading(false);
        const { _id, name, role, token } = response.data;
        Cookies.set("_id", _id);
        Cookies.set("name", name);
        Cookies.set("token", token);
        Cookies.set("role", role);
        if (role === "student") {
          navigate("/userDasboard");
        } else if (role === "faculty") {
          navigate("/facultyDashboard");
        } else {
          navigate("/adminDashboard");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setisLoading(false);
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        console.error("Server responded with a 401 error:", errorMessage);
      } else {
        console.error("Error occurred:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading ? (
        <CustomeLoader />
      ) : (
        <>
          <CssBaseline />
          <Container component="main" maxWidth="md">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img
                    src={loginImage}
                    alt="login"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "#673AB7" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{ fontFamily: "Lato" }}
                    >
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
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
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
                        helperText={
                          !validation.password && "Password is required"
                        }
                        onChange={(e) =>
                          handleFieldChange("password", e.target.value)
                        }
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Log In
                      </Button>
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mb: 1 }}
                        onClick={handleGoogleSignIn}
                        startIcon={<GoogleIcon />}
                      >
                        Log in with Google
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Typography>
                            <Link to="/">
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Typography>
                            <Link to="/forgotpassword">
                              {"Forgot password?"}
                            </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <ToastContainer />
        </>
      )}
    </ThemeProvider>
  );
}
