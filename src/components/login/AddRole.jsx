import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export const AddRole = () => {
    const navigate = useNavigate()
    const defaultTheme = createTheme();
    const {role} = useParams();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const userData = {
            email: data.get('email'),
            role:role,
          };
          try {
           
            const response =  await axios.post('/signup', userData);
            const { message } = response.data;
            if (response.status === 200) {
              toast.success(message)
            }
            else {
              console.error('Signup failed');
            }
          } catch (error) {
              if (error.response && error.response.status === 401) {
                  const errorMessage = error.response.data.message;
                  toast.error(errorMessage);
                  console.error('Server responded with a 400 error:', errorMessage);
                } else {
                  console.error('Error occurred:', error);
                }
              }
              navigate('/adminDashboard')
        };
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
         Add 
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Container>
    <ToastContainer/>
  </ThemeProvider>
);
}
