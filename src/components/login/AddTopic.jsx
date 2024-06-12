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

export const AddTopic = () => {
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const [subjects, setSubjects] = useState([]);
  const [standards, setStandards] = useState([]);
  const [selectedStandards, setSelectedStandards] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [topics, setTopics] = useState([]);
  const [userSubjects, setUserSubjects] = useState([]);
  const userId = Cookies.get("_id");
  const role = Cookies.get("role");

  useEffect(() => {
    fetchStd();
    fetchSubject();
    fetchUser();
  }, []);

  useEffect(() => {
    if (userSubjects.length > 0 || role !== 'faculty') {
      fetchTopic();
    }
  }, [userSubjects, role]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/facultysubject/${userId}`);
      const subjects = response?.data?.[0]?.subject || [];
      setUserSubjects(subjects.map((subject) => subject._id));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchTopic = async () => {
    try {
      const response = await axios.get('/Topic');
      const allTopics = response.data.result.map((exam, index) => ({
        displayid: index + 1,
        name: exam.name,
        id: exam._id,
        subjectId: exam.subject._id,
      }));

      if (role === 'faculty') {
        const filteredTopics = allTopics.filter(topic => userSubjects.includes(topic.subjectId));
        setTopics(filteredTopics);
      } else {
        setTopics(allTopics);
      }
    } catch (error) {
      console.error(error, 'error');
    }
  };

  const fetchSubject = async () => {
    try {
      const response = await axios.get('/subject');
      if(role === 'faculty'){
        const filteredSubjects = response.data.filter(subject => userSubjects.includes(subject._id));
        setSubjects(filteredSubjects)
      }else{
      setSubjects(response.data);
      }
    } catch (error) {
      console.error(error, 'error');
    }
  };

  const fetchStd = async () => {
    try {
      const response = await axios.get('/getstd');
      setStandards(response.data.data);
    } catch (error) {
      console.error(error, 'error');
    }
  };

  const handleStandardChange = (event) => {
    const { target: { value } } = event;
    setSelectedStandards(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const userData = {
      name: data.get('name'),
      subject: selectedSubject,
      std: selectedStandards,
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
        dashboardPath = "dashboard"; // Fallback path
    }
  
    try {
      const response = await axios.post('/Topic', userData);
      const { message } = response.data;
      if (response.status === 200) {
        toast.success(message);
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
    { field: 'name', headerName: 'Topic Name', width: 200 },
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
                Add Subject
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Topic"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <FormControl sx={{ m: 1, width: '100%' }}>
                  <InputLabel id="demo-multiple-name-label">Standard</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedStandards}
                    onChange={handleStandardChange}
                    MenuProps={MenuProps}
                  >
                    {standards.map((std) => (
                      <MenuItem key={std._id} value={std._id}>
                        {std.std}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '100%' }}>
                  <InputLabel id="demo-multiple-name-label">Subject</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    MenuProps={MenuProps}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject._id} value={subject._id}>
                        {subject.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Add
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mt={4}>
              <Typography variant="h2" sx={{ fontSize: { xs: 30, sm: 40, md: 50 } }}>
                All Topics
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
                <DataGrid rows={topics} columns={columns} pageSize={5} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};
