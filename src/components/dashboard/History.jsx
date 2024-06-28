import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";

const Historyofuser = () => {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const _id = Cookies.get("_id");
    try {
      setIsLoading(true);
      const response = await axios.get(`/userhistory/${_id}`);
      console.log("response", response);
      const filteredData = response.data.map((exam, index) => ({
        id: exam._id || index,
        displayid: index + 1,
        name: exam.exam_id?.name,
        examType: exam.exam_type?.type,
        noOfQuestions: exam.exam_id?.noofquestions || 0,
        totalmarks: exam?.total_marks,
        result: exam?.result,
        subject: exam.exam_id?.subject,
      }));
      console.log("filteredData", filteredData);
      setHistories(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const viewAnswer = (id) => {
    navigate(`/userDasboard/viewAnswers/${id}`);
  };

  const reattemptExam = (id) => {
    navigate(`/userDasboard/reattemptExam/${id}`);
  };

  const paperStyle = {
    padding: 2,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    margin: 2,
    boxShadow: 10,
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ p: 1 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#010080" }}
        >
          Attempted Exams
        </Typography>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CustomeLoader />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {}
            {histories.map((history) => (
              <Grid item xs={12} sm={6} md={4} key={history.id}>
                <Paper sx={paperStyle}>
                <Typography variant="h4" gutterBottom sx={{color:constant.backgroundColor,fontWeight:"bold",textAlign:"center"}}>
                    {history?.subject?.name}
                  </Typography>
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={history?.subject?.image_url}
                      alt="image"
                      height="100"
                      width="100"
                      style={{ display: "block", margin: "0 auto" }}
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{color:constant.backgroundColor,fontWeight:"bold"}}>
                    {history.name}
                  </Typography>
                  <Typography variant="body1" sx={{color:constant.backgroundColor,fontWeight:"bold"}}>
                    <strong>Exam Type:</strong> {history.examType}
                  </Typography>
                  <Typography variant="body1" sx={{color:constant.backgroundColor,fontWeight:"bold"}}>
                    <strong>No. of Questions:</strong> {history.noOfQuestions}
                  </Typography>
                  <Typography variant="body1" sx={{color:constant.backgroundColor,fontWeight:"bold"}}>
                    <strong>Total Marks:</strong> {history.totalmarks}
                  </Typography>
                  <Typography variant="body1" sx={{color:constant.backgroundColor,fontWeight:"bold"}}>
                    <strong>Result:</strong> {history.result}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: constant.backgroundColor }}
                      onClick={() => viewAnswer(history.id)}
                    >
                      View Answer
                    </Button>
                    <Button
                      disabled
                      variant="contained"
                      sx={{ backgroundColor: "#FF0000" }}
                      onClick={() => reattemptExam(history.id)}
                    >
                      Reattempt Exam
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Historyofuser;
