import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { UserExamDetails } from './UserExamDetails';
import { toast } from 'react-toastify';

const UserContestDetail = () => {
  const { id } = useParams();
  const [exams, setExams] = useState([]);
  const [contest, setContest] = useState({});
  const [participants, setParticipants] = useState([]);
  const [isParticipant, setIsParticipant] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const navigate = useNavigate();
  const userId = Cookies.get('_id');

  useEffect(() => {
    fetchDetails();
    checkParticipantStatus();
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

  const checkParticipantStatus = async () => {
    try {
      const response = await axios.get(`/userparticipant/${userId}`);
      const participantContest = response?.data?.some(participant => participant?.contest?._id === id);
      setIsParticipant(participantContest);
    } catch (error) {
      console.error('Error checking participant status:', error);
    }
  };

  const handleParticipantButtonClick = async () => {
    try {
      const data = { contest: id, userId: userId };
      const response = await axios.post("/contest_participant", data);
      if (response.status === 200) {
        toast.success("Sucessfully Particpipant in contest")
        setIsParticipant(true);
      }
    } catch (error) {
      console.error("Error participating in contest:", error);
    }
  };

  const isContestExpired = () => {
    return new Date(contest.endDate) < new Date();
  };

  const click = () => {
    console.log(isParticipant,"pa");
    
    navigate(`/userDasboard/contestdetails/${id}`,{
      state: {isParticipant}
    })
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
        <Grid item xs={12}>
          {!isParticipant && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleParticipantButtonClick}
              disabled={isContestExpired()}
            >
              Participate in Contest
            </Button>
          )}
          
        </Grid>
      </Grid>  
    </div>
  );
};

export default UserContestDetail;
