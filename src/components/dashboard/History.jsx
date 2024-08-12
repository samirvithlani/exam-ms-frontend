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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";

const Historyofuser = () => {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");
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
        examId: exam?.exam_id?._id,
        reattemptRequest: exam?.ReAttemp_request, // Tracking reattempt request status
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

  const handleClickOpen = (id) => {
    setSelectedExamId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRequestMessage("");
  };

  const handleSubmit = async () => {
    try {
      const data = { ReAttemp_requestmsg: requestMessage, ReAttemp_request: 'pending' };
      await axios.put(`/user_exam/${selectedExamId}`, data);
      handleClose();
    } catch (error) {
      console.error("Error submitting reattempt request:", error);
    }
  };

  const attemptExam = (id) => {
    navigate(`/userDasboard/examdetails/${id}`);
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
            {histories.map((history) => (
              <Grid item xs={12} sm={6} md={4} key={history.id}>
                <Paper sx={paperStyle}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: constant.backgroundColor, fontWeight: "bold", textAlign: "center" }}
                  >
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
                  <Typography variant="h6" gutterBottom sx={{ color: constant.backgroundColor, fontWeight: "bold" }}>
                    {history.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: constant.backgroundColor, fontWeight: "bold" }}>
                    <strong>Exam Type:</strong> {history.examType}
                  </Typography>
                  <Typography variant="body1" sx={{ color: constant.backgroundColor, fontWeight: "bold" }}>
                    <strong>No. of Questions:</strong> {history.noOfQuestions}
                  </Typography>
                  <Typography variant="body1" sx={{ color: constant.backgroundColor, fontWeight: "bold" }}>
                    <strong>Total Marks:</strong> {history.totalmarks}
                  </Typography>
                  <Typography variant="body1" sx={{ color: constant.backgroundColor, fontWeight: "bold" }}>
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
                      sx={{ backgroundColor: "#28a745" }}
                      onClick={() => attemptExam(history?.examId)}
                      disabled={history.reattemptRequest !== "Accepted"} // Enable/Disable based on status
                    >
                      Attempt Exam
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: constant.backgroundColor }}
                      onClick={() => viewAnswer(history.id)}
                    >
                      View Answer
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#FF0000" }}
                      onClick={() => handleClickOpen(history.id)}
              
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reattempt Exam</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a message for your reattempt request.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reattempt Request Message"
            type="text"
            fullWidth
            variant="outlined"
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Historyofuser;
