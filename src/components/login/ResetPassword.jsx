import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
  const  data={"email":email,"newPassword":password}
    const result = await axios.put("/resetpassword",data)
    const { message } = result.data;
    if (result.status === 200) {
      toast.success(message);
      setTimeout(() => {
        navigate("/");
      }, 10000);
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
        Reset Password
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
        <TextField
          margin="normal"
          fullWidth
          label="New Password"
          type="string"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Reset Password
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

export default ResetPassword;
