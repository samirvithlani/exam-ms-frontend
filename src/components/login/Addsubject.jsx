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
// import { ErrorOutline } from '@mui/icons-material';
import { Grid, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import zIndex from '@mui/material/styles/zIndex';

export const AddSubject = () => {
    const theme = useTheme()
    const navigate = useNavigate();
    const defaultTheme = createTheme();
    const[subjects,setsubjects]= useState([]);
    const [standards, setStandards] = useState([]);
    const [selectedStandards, setSelectedStandards] = useState([]);
    const [stream,setstreams] = useState([]);
    const [selectedstream,setselectedstream] = useState();
    useEffect(() => {
      fetchStd();
      fetchStreams();
      fetchsubject();
    }, []);
    const fetchsubject = async()=>{
      try {
        const response = await axios.get('/subject');
        const filterdata = response.data.map((exam,index)=>({
          displayid:index+1,
          name:exam.name,
          id:exam._id
         }))      
         setsubjects(filterdata)

        } catch (error) {
          console.log(error,"error");
      }
    }
    const fetchStreams = async()=>{
        try {
            const response = await axios.get('/stream');
            console.log(response.data);
            setstreams(response.data);
        } catch (error) {
        console.log(error,"error");
            
        }
    }
    const fetchStd = async () => {
        try {
          const response = await axios.get('/getstd');
          console.log(response.data.data);
          setStandards(response.data.data);
          setSelectedStandards([]);
        } catch (error) {
          console.error(error, "error");
        }
      };
    
      const handleStandardChange = (event) => {
        const {
            target: { value },
          } = event;
          setSelectedStandards(
            typeof value === 'string' ? value.split(',') : value,
          );
    };
    const handleStreamChange = async (event) => {
        const streamId = event.target.value;
        setselectedstream (streamId)
      };
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
  
      const userData = {
        name: data.get('name'),
        std: selectedStandards,
        stream:selectedstream
    };   
      try {
        const response = await axios.post('/subject', userData);
        const { message } = response.data;
        if (response.status === 200) {
          toast.success(message);
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
      navigate('/adminDashboard');
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
      { field: "displayid", headerName: "ID", width: 90 },
      { field: 'name', headerName: 'Subject Name', width: 100 },
  ];
    return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Left Half - Add Subject Form */}
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
                label="Subject"
                name="name"
                autoComplete="name"
                autoFocus
                sx={{ '@media (max-width:600px)': { width: '100%' } }}
                />
              <Grid>
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
            <MenuItem
              key={std}
              value={std._id}
            >
              {std.std}
            </MenuItem> 
        ))}
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Stream</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id='strem'
        value={selectedstream}
        label="Stream"
        onChange={handleStreamChange}
        >
        {stream.map((item) => (
          <MenuItem key={item.id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, '@media (max-width:600px)': { width: '100%' } }}
                >
                Add
              </Button>
            </Box>
          </Box>
          </Grid>

          {/* Right Half - Display All Subjects */}
          <Grid item xs={12} md={6}>
            <Box mt={4}>
              
            <Typography variant="h2" sx={{ fontSize: { xs: 30, sm: 40, md: 50 } }} >
                All Subject
              </Typography>
              <Grid
                container
                item
                xs={12}
                sx={{
                  width: "70vw", 
                  height: "60vh", 
                  // overflowX: "auto",
                  [theme.breakpoints.down("sm")]: {
                    width: "70vw",
                    height: "40vh",
                  },
                }}
              >                
              <DataGrid rows={subjects} columns={columns} pageSize={5} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </ThemeProvider>
    );
  };
  