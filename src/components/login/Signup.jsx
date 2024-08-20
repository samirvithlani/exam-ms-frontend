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
import signupImage from "../../assets/images/signup.svg";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import ReCAPTCHA from "react-google-recaptcha";
import {constant} from '../../constant'

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: constant.backgroundColor, // Change this to your desired color
    },
  },
});

export default function SignUp() {
  const navigate = useNavigate();
  const [validation, setValidation] = useState({
    firstname: true,
    lastname: true,
    email: true,
    password: true,
    phone: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const recaptchaRef = useRef();

  const handleFieldChange = (fieldName, value) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: !!value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!recaptchaValue) {
      toast.error("Please complete the reCAPTCHA verification.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
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
        setTimeout(() => {
          navigate("/"); 
        }, 10000);
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
    } finally {
      setIsLoading(false); 
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://exam-ms.onrender.com/google/callback";
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
                src={signupImage}
                alt="signup"
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
                <Typography component="h1" variant="h4" sx={{ fontWeight:"bold",color:constant.backgroundColor}}>
                  Create new Account
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    <Grid item xs={12}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LdxxukpAAAAAM_jYKu2zRotH0QyiYucU1q4ipWr"
                        onChange={(value) => setRecaptchaValue(value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    disabled={isLoading}
                  >
                    Sign Up
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
                    Sign up with Google
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to="/">Already have an account? Log in</Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
