import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AllContest = () => {
  const [contests, setContests] = useState([]);
  const [participantContests, setParticipantContests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const Id = Cookies.get("_id");

  useEffect(() => {
    fetchContests();
    if (location.pathname === '/userDasboard/allcontest') {
      fetchParticipantContests();
    }
  }, [location.pathname]);

  const fetchContests = async () => {
    try {
      const response = await axios.get(`/contest`);
      setContests(response?.data);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  const fetchParticipantContests = async () => {
    try {
      const response = await axios.get(`/contest_participant/${Id}`);
      setParticipantContests(response?.data);
    } catch (error) {
      console.error('Error fetching participant contests:', error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/adminDashboard/contestdetail/${id}`);
  };

  const handleParticipantButtonClick = async (contestId) => {
    try {
      Cookies.set("contestid",contestId)
      const data = { contest: contestId, userId: Id };
      const response = await axios.post('/contest_participant', data);
      if (response.status === 200) {
        navigate(`/userDasboard/contestdetails/${contestId}`);
      }
    } catch (error) {
      console.error('Error participating in contest:', error);
    }
  };

  const isParticipant = (contestId) => {
    Cookies.set("contestid",contestId)
    return participantContests.some(participant => participant?.contest?._id === contestId);
  };

  const isContestExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div>
      <h1>Contests</h1>
      <Grid container spacing={2}>
        {contests.map(contest => (
          <Grid item key={contest._id} xs={12} sm={6} md={4}>
            <Card onClick={() => !isContestExpired(contest.endDate) && handleCardClick(contest._id)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {contest.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Date: {new Date(contest.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Date: {new Date(contest.endDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subjects:
                  {contest.subject.map(subject => (
                    <span key={subject._id}> {subject.name},</span>
                  ))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Exams:
                  {contest.exam.map(exam => (
                    <span key={exam._id}> {exam.name},</span>
                  ))}
                </Typography>
                {location.pathname === '/userDasboard/allcontest' && (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isParticipant(contest._id)) {
                        navigate(`/userDasboard/contestdetails/${contest._id}`);
                      } else {
                        handleParticipantButtonClick(contest._id);
                      }
                    }}
                    disabled={isContestExpired(contest.endDate)}
                  >
                    {isParticipant(contest._id) ? 'View Contest' : 'Participant Contest'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllContest;
