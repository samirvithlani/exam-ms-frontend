import { React, useState, useEffect } from "react";
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
  useTheme,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search, Sort } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { constant } from "../../constant";

export const AddSubject = () => {
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [standards, setStandards] = useState([]);
  const [selectedStandards, setSelectedStandards] = useState([]);
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    fetchStd();
    fetchStreams();
    fetchSubject();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [subjects, searchTerm, sortOrder]);

  const fetchSubject = async () => {
    try {
      const response = await axios.get("/subject");
      const filterdata = response.data.map((exam, index) => ({
        displayid: index + 1,
        name: exam.name,
        id: exam._id,
      }));
      setSubjects(filterdata);
      setFilteredSubjects(filterdata);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchStreams = async () => {
    try {
      const response = await axios.get("/stream");
      setStreams(response.data);
    } catch (error) {
      console.log(error, "error");
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

  const handleStandardChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStandards(typeof value === "string" ? value.split(",") : value);
  };

  const handleStreamChange = (event) => {
    setSelectedStream(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const uploadResponse = await axios.post("/upload", formData);
      const userData = {
        name: event.target.name.value,
        std: selectedStandards,
        stream: selectedStream||null,
        image_url: uploadResponse?.data?.url,
      };
      const response = await axios.post("/subject", userData);
      const { message } = response.data;
      if (response.status === 200) {
        toast.success("Subject Added Sucessfully");
        navigate("/adminDashboard");
      } else {
        console.error("Failed to add subject");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const applyFilters = () => {
    let tempSubjects = [...subjects];

    if (searchTerm) {
      tempSubjects = tempSubjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "a-z") {
      tempSubjects.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredSubjects(tempSubjects);
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
    { field: "name", headerName: "Subject Name", width: 200 },
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
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Lato",
                  mb: 1,
                  color: "#010080",
                }}
              >
                Add Subject ::
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Subject"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="standard-label">Standard</InputLabel>
                  <Select
                    labelId="standard-label"
                    id="standard-select"
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
                <FormControl fullWidth margin="normal">
                  <InputLabel id="stream-label">Select Stream</InputLabel>
                  <Select
                    labelId="stream-label"
                    id="stream-select"
                    value={selectedStream}
                    onChange={handleStreamChange}
                  >
                    {streams.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2 }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {imageName && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected Image: {imageName}
                    </Typography>
                  )}
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
             <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Lato",mb:1,color:"#010080" }}>All Subjects ::</Typography>
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
                <DataGrid rows={filteredSubjects} columns={columns} pageSize={5} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};
