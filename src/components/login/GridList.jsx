import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";

export const GridList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exams, setExams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showContestExams, setShowContestExams] = useState(false);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/exams/${id}`);
      if (response.status === 200) {
        const filteredExams = response.data.filter(
          (data) => data.isContestExam === showContestExams
        );
        setExams(filteredExams);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [id, showContestExams]);

  const handleClick = (examId) => {
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

    navigate(`/${dashboardPath}/examdetails/${examId}`);
  };

  const handleBackClick = () => {
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

    navigate(`/${dashboardPath}/subjectlist`);
  };

  const handleRadioChange = (event) => {
    setShowContestExams(event.target.value === "contest");
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box padding="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          style={{ marginBottom: "20px" }}
          startIcon={<ArrowBackIcon />}
        >
          Back to Subject List
        </Button>

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 3, color: constant.backgroundColor }}
        >
          Exam List
        </Typography>

        <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
          <RadioGroup
            row
            aria-label="exam-filter"
            name="exam-filter"
            value={showContestExams ? "contest" : "regular"}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="regular"
              control={<Radio />}
              label="Regular Exams"
            />
            <FormControlLabel
              value="contest"
              control={<Radio />}
              label="Contest Exams"
            />
          </RadioGroup>
        </FormControl>

        {loading && <CustomeLoader />}

        {!loading && exams?.length === 0 && (
          <Typography variant="h6" color="error" textAlign="center">
            No Exams Found!
          </Typography>
        )}

        <Grid container spacing={3}>
          {exams?.length > 0 &&
            exams.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Box
                  bgcolor="white"
                  border="1px solid #ccc"
                  borderRadius="10px"
                  padding="20px"
                  textAlign="center"
                  onClick={() => handleClick(item._id)}
                  sx={{
                    cursor: "pointer",
                    boxShadow: 3,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Avatar
                    src={item?.subject?.image_url} 
                    sx={{
                      width: 80,
                      height: 80,
                      margin: "0 auto 10px auto",
                    }}
                  />
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: "bold",
                      mt: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%", // Ensure the text does not overflow the box
                      color: constant.backgroundColor,
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
