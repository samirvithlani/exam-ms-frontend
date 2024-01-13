  import {React ,useState,useEffect} from 'react'
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
  import FormControl from '@mui/material/FormControl';
  import MenuItem from '@mui/material/MenuItem';
  import Typography from '@mui/material/Typography';
  import InputLabel from '@mui/material/InputLabel';
  import Select from '@mui/material/Select';
  import { Grid, useTheme } from '@mui/material';
  import { DataGrid } from '@mui/x-data-grid';
  export const AddStandard = () => {
      const navigate = useNavigate()
      const theme = useTheme()
      const defaultTheme = createTheme();
      const [standards,setstandards] = useState([])
      useEffect (()=>{
        fetchstandard();
      },[])
      const fetchstandard = async()=>{
        try {
          const response = await axios.get('/getstd');
          console.log(response.data.data);
          const filterdata = response.data.data.map((exam,index)=>({
            name:exam.std,
            displayid:index+1,
            id: exam._id,
          }))
          setstandards(filterdata);
        } catch (error) {
          console.log(error,"error");
        }
      }
      const handleSubmit = async (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const userData = {
              std: data.get('std'),
            };
            try {
              const response =  await axios.post('/addstd', userData);
              const { message } = response.data;
              if (response.status === 200) {
                toast.success(message)
              }
              else {
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
                navigate('/adminDashboard')
          };
          const columns = [
            { field: "displayid", headerName: "ID", width: 90 },
            { field: 'name', headerName: 'Standard', width: 100 },
        ];
        return(
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
                  Add Standard
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="std"
                    label="standard"
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
              </Box>
            </Grid>
  
            <Grid item xs={12} md={6}>
              <Box mt={4}>
                <Typography variant="h2" sx={{ fontSize: { xs: 30, sm: 40, md: 50 } }}>
                  All Standards
                </Typography>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    width: '100%',
                    height: '60vh',
                    overflowX: 'auto',
                    [theme.breakpoints.down('sm')]: {
                      height: '40vh',
                    },
                  }}
                >
                  <DataGrid rows={standards} columns={columns} pageSize={5} />
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <ToastContainer />
        </Container>
      </ThemeProvider>
    )
  };  