import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ContestDetail = () => {
  const { id } = useParams();
  const [exams, setExams] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`/contest/${id}`);
      setExams(response.data.exam);
    } catch (error) {
      console.error('Error fetching contest details:', error);
    }
  };

  const handleCardClick = (examId) => {
    console.log('Clicked exam id:', examId);
    navigate(`/adminDashboard/examdetails/${examId}`)
  };

  return (
    <div>
      <h1>Exam Details</h1>
      <Grid container spacing={2}>
        {exams.map(exam => (
          <Grid item key={exam._id} xs={12} sm={6} md={4}>
            <Card onClick={() => handleCardClick(exam._id)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {exam.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Exam Time: {exam.examtime} minutes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number of Questions: {exam.noofquestions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ContestDetail;
