import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
export default function UserRegistration() {
  const navigate = useNavigate();
    const [email,setemail] = useState('')
    const {id} = useParams();
    useEffect(()=>{
        fetchdata();
    },[])
    const fetchdata = async() =>{
        try {
            let result = await axios.get(`/user/${id}`)
            let email = result.data.email;
            setemail(email);
        } catch (error) {
            
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
          firstname: data.get('firstname'),
          lastname: data.get('lastname'),
          password: data.get('password'),
          phone:data.get('phone')
        };
    
        try {
          const response = await axios.put(`/update/${id}`, userData);
          const { message } = response.data;
          if (response.status === 200) {
            toast.success(message);
          }
          else {
            console.error('Signup failed');
          }
          navigate('/login')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message;
                toast.error(errorMessage);
                console.error('Server responded with a 400 error:', errorMessage);
              } else {
                console.error('Error occurred:', error);
              }
            }
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
            Registration
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                //   label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            
          </Box>
        </Box>
      </Container>
      <ToastContainer /> 

    </ThemeProvider>
  );
}
//UserRegistration