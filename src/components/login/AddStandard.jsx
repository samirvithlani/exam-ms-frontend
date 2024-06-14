import { React, useState, useEffect } from 'react';
import {
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
  useTheme,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search, Sort } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { constant } from '../../constant';

export const AddStandard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  const [standards, setStandards] = useState([]);
  const [filteredStandards, setFilteredStandards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchStandard();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [standards, searchTerm, sortOrder]);

  const fetchStandard = async () => {
    try {
      const response = await axios.get('/getstd');
      const filterData = response.data.data.map((exam, index) => ({
        name: exam.std,
        displayid: index + 1,
        id: exam._id,
      }));
      setStandards(filterData);
      setFilteredStandards(filterData);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      std: data.get('std'),
    };
    try {
      const response = await axios.post('/addstd', userData);
      const { message } = response.data;
      if (response.status === 200) {
        toast.success(message);
        fetchStandard(); // Refresh the standard list
      } else {
        console.error(' failed');
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
    navigate('/adminDashboard');
  };

  const applyFilters = () => {
    let tempStandards = [...standards];

    if (searchTerm) {
      tempStandards = tempStandards.filter((standard) =>
        standard.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "a-z") {
      tempStandards.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredStandards(tempStandards);
  };

  const columns = [
    { field: "displayid", headerName: "ID", width: 90 },
    { field: 'name', headerName: 'Standard', width: 200 },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: '#f0f0f0',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Lato",mb:1,color:"#010080" }}>Add Standard::</Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="std"
                  label="Standard"
                  name="std"
                  autoComplete="name"
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
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: '#f0f0f0',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Lato",mb:1,color:"#010080" }}>Standard List ::</Typography>
              <Box sx={{ width: '100%', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Search"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button
                variant="outlined"
                startIcon={<Sort />}
                onClick={() => setSortOrder(sortOrder === "a-z" ? "" : "a-z")}
              >
                Sort A-Z
              </Button>
              <Box sx={{ width: '100%', height: 400, mt: 2 }}>
                <DataGrid rows={filteredStandards} columns={columns} pageSize={5} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};
