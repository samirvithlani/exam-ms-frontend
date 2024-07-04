import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const UserContestDetail = () => {
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

  

  const click = () => {
    navigate(`/userDasboard/contestdetails/${id}`)
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
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={click}>
            Show Exam Details
          </Button>
        </Grid>
      </Grid>  
    </div>
  );
};

export default UserContestDetail;
