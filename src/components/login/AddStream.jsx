import { React, useState, useEffect } from "react";
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
  InputAdornment,
  Paper,
  IconButton,
} from "@mui/material";
import { Search, Sort } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

export const AddStream = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const [standards, setStandards] = useState([]);
  const [streams, setStreams] = useState([]);
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [selectedStandards, setSelectedStandards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchStd();
    fetchStreams();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [streams, searchTerm, sortOrder]);

  const fetchStreams = async () => {
    try {
      const response = await axios.get("/stream");
      const filterData = response.data.map((exam, index) => ({
        displayid: index + 1,
        name: exam.name,
        id: exam._id,
      }));
      setStreams(filterData);
      setFilteredStreams(filterData);
    } catch (error) {
      console.error(error, "error");
    }
  };

  const fetchStd = async () => {
    try {
      const response = await axios.get("/getstd");
      setStandards(response.data.data);
      setSelectedStandards([]);
    } catch (error) {
      console.error(error, "error");
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

  const handleStandardChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStandards(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      name: data.get("name"),
      std: selectedStandards,
    };
    try {
      const response = await axios.post("/stream", userData);
      const { message } = response.data;
      if (response.status === 200) {
        toast.success(message);
        fetchStreams(); // Refresh the stream list
      } else {
        console.error(" failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        console.error("Server responded with a 400 error:", errorMessage);
      } else {
        console.error("Error occurred:", error);
      }
    }
    navigate("/adminDashboard");
  };

  const applyFilters = () => {
    let tempStreams = [...streams];

    if (searchTerm) {
      tempStreams = tempStreams.filter((stream) =>
        stream.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "a-z") {
      tempStreams.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredStreams(tempStreams);
  };

  const columns = [
    { field: "displayid", headerName: "ID", width: 90 },
    { field: "name", headerName: "Stream Name", width: 200 },
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f0f0f0",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Lato",mb:1,color:"#010080" }}>Add Stream ::</Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Stream"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <FormControl sx={{ width: "100%", mt: 2 }}>
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f0f0f0",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Lato",mb:1,color:"#010080" }}>Stream List ::</Typography>
              <Box sx={{ width: "100%", mb: 2 }}>
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
              <Box sx={{ width: "100%", height: 400, mt: 2 }}>
                <DataGrid rows={filteredStreams} columns={columns} pageSize={5} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};
