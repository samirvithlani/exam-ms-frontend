import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllContest = () => {
  const [contests, setContests] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await axios.get('/contest');
      setContests(response.data);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };
  const handleCardClick = (id) => {
    console.log('Clicked card id:', id);
    navigate(`/adminDashboard/contestdetail/${id}`)

};

  return (
    <div>
      <h1>Contests</h1>
      <Grid container spacing={2}>
        {contests.map(contest => (
          <Grid item key={contest._id} xs={12} sm={6} md={4}>
            <Card onClick={() => handleCardClick(contest._id)}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllContest;
