import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { constant } from "../../constant";
import { CustomeLoader } from "../Layouts/CustomeLoader";

const ContestDetail = () => {
  const { id } = useParams();
  const [exams, setExams] = useState([]);
  const [contest, setContest] = useState({});
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(`/contest/${id}`);
      setExams(response.data.exam);
      setContest(response.data);
      // console.log(response.data, "data in contest");
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching contest details:", error);
      setisLoading(false);
    }
  };

  const fetchContestUser = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(`/participant/${id}`);
      setParticipants(response.data);
      // console.log(response.data, "response");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error("Error fetching contest participants:", error);
    }
  };

  const handleShowParticipants = () => {
    setShowParticipants(!showParticipants);
    if (!showParticipants) {
      fetchContestUser();
    }
  };

  const handleCardClick = (examId) => {
    // console.log("Clicked exam id:", examId);
    navigate(`/adminDashboard/examdetails/${examId}`);
  };

  const handleDeleteContest = async () => {
    try {
      setisLoading(true);
      const data = {isActive:false}
      const response = await axios.put(`/contest/${id}`,data);
      navigate("/adminDashboard/contestlist");
      setisLoading(false);
    } catch (error) {
      console.error("Error deleting contest:", error);
      setisLoading(false);
    }
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor,
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <CustomeLoader />}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: constant.backgroundColor }}>
          Contest Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: constant.backgroundColor }}>
                  Contest Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {contest.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: constant.backgroundColor }}>
                  Start Date
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {new Date(contest.startDate).toLocaleString('en-GB', { timeZone: 'UTC' })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: constant.backgroundColor }}>
                  End Date
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {new Date(contest.endDate).toLocaleString('en-GB', { timeZone: 'UTC' })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {contest.subject?.map((sub) => (
            <Grid item xs={12} sm={6} md={4} key={sub._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ color: constant.backgroundColor }}>
                    Subjects
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {sub.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" gutterBottom sx={{ mt: 4, color: constant.backgroundColor }}>
          Exam Details
        </Typography>
        <Grid container spacing={2}>
          {exams.map((exam) => (
            <Grid item key={exam._id} xs={12} sm={6} md={4}>
              <Card onClick={() => handleCardClick(exam._id)}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ color: constant.backgroundColor }}>
                    Name: {exam.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowParticipants}
          >
            {showParticipants ? "Hide Participants" : "Show Participants"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteContest}
          >
            Delete Contest
          </Button>
        </Box>
        {showParticipants && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map((participant, index) => (
                  <TableRow key={participant._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{`${participant.userId.firstname} ${participant.userId.lastname}`}</TableCell>
                    <TableCell>{participant.userId.email}</TableCell>
                    <TableCell>{participant.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ContestDetail;
