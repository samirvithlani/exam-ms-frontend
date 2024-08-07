import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  createTheme,
  ThemeProvider,
  FormControl,
  MenuItem,
  Typography,
  InputLabel,
  Select,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from "js-cookie";
import { constant } from '../../constant';

export const AddModule = () => {
  const navigate = useNavigate();
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  
  const [modules, setModule] = useState([]);
  

  useEffect(() => {
    fetchModule();
  }, []);


  const fetchModule = async () => {
    try {
      const response = await axios.get('/module');
      const allTopics = response?.data?.data.map((exam, index) => ({
        displayid: index + 1,
        name: exam.name,
        id: exam._id,
      }));
        setModule(allTopics);
    } catch (error) {
      console.error(error, 'error');
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const userData = {
      name: data.get('name'),
    };
  
    const role = Cookies.get("role");
    let dashboardPath = "";
  
    switch (role) {
      case "faculty":
        dashboardPath = "facultyDashboard";
        break;
      case "superAdmin":
        dashboardPath = "adminDashboard";
        break;
      default:
        dashboardPath = "dashboard"; 
    }
  
    try {
      const response = await axios.post('/module', userData);
      if (response.status === 200) {
        toast.success("Module Added");
        navigate(`/${dashboardPath}`);
      } else {
        console.error('Failed');
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
  };
  

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const columns = [
    { field: 'displayid', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Module Name', width: 200 },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Add Module
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                
               
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Add
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mt={4}>
              <Typography variant="h2" sx={{ fontSize: { xs: 30, sm: 40, md: 50 } }}>
                All Modules
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  marginTop: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: '#f0f0f0',
                }}
              >
                <DataGrid rows={modules} columns={columns} pageSize={5} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};
