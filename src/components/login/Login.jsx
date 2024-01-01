import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
        email: data.get('email'),
        password: data.get('password'),
      };
      console.log(userData);
      if (userData.email === 'admin@gmail.com'&& userData.password === 'admin') {
       Cookies.set('name','admin')
        navigate('/adminDashboard')
        return;
      }
      try {
       
        const response =  await axios.post('/login', userData);
          console.log(response.data,"login data");
        const { message } = response.data;
        console.log(message,"message");
        if (response.status === 200) {
          toast.success(message);
          const {_id,name,role} = response.data; 
          Cookies.set('_id', _id);
          Cookies.set('name',name) ;
          if(role == "student"){
            navigate('/userDasboard')
          } else{
            navigate('/adminDashboard')
          }
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
          // navigate('/dashboard')
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
                <Link to={'/'}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer/>
    </ThemeProvider>
  );
}