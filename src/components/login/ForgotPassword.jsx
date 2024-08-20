import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
  const  data={"email":email}
    const result = await axios.post("/resetpassword-mail",data)
    if(result.status===200){
      toast.success(result.data.message);
    }else{
      toast.error(result.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Send Reset Link
        </Button>
      </Box>
      <Link to="/" variant="body2" sx={{ mt: 2 }}>
        Back to Login
      </Link>
      <ToastContainer/>
    </Box>
  </Container>
);
};

export default ForgotPassword;
