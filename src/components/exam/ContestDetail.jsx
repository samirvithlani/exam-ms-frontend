import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ContestDetail = () => {
  const { id } = useParams();
  const [exams, setExams] = useState([]);
  const [contest, setContest] = useState({});
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`/contest/${id}`);
      setExams(response.data.exam);
      setContest(response.data);
      console.log(response.data, "data in contest");
    } catch (error) {
      console.error('Error fetching contest details:', error);
    }
  };

  const fetchContestUser = async () => {
    try {
      const response = await axios.get(`/participant/${id}`);
      setParticipants(response.data);
      console.log(response.data, "response");
    } catch (error) {
      console.error('Error fetching contest participants:', error);
    }
  };

  const handleShowParticipants = () => {
    setShowParticipants(!showParticipants);
    if (!showParticipants) {
      fetchContestUser();
    }
  };

  const handleCardClick = (examId) => {
    console.log('Clicked exam id:', examId);
    navigate(`/adminDashboard/examdetails/${examId}`);
  };

  return (
    <div>
      <h1>Contest Details</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
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
              <Typography variant="h6">
                Start Date
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(contest.startDate).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                End Date
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(contest.endDate).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {contest.subject?.map((sub) => (
          <Grid item xs={12} sm={6} md={4} key={sub._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Subject
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {sub.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <h2>Exam Details</h2>
      <Grid container spacing={2}>
        {exams.map((exam) => (
          <Grid item key={exam._id} xs={12} sm={6} md={4}>
            <Card onClick={() => handleCardClick(exam._id)}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Name: {exam.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleShowParticipants}>
        {showParticipants ? 'Hide Participants' : 'Show Participants'}
      </Button>
      {showParticipants && (
        <TableContainer component={Paper}>
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
    </div>
  );
};

export default ContestDetail;
