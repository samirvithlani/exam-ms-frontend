import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { CustomeLoader } from '../Layouts/CustomeLoader';

const AllUserGivenExam = () => {
  const [exams, setExams] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get('/get');
      if(response.status === 200){
        setisLoading(false);
      }
      // Sort the exams data by date in descending order
      const sortedExams = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExams(sortedExams);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All User Given Exams
      </Typography>
      {isLoading ? <CustomeLoader /> : null}
    
      <Grid container spacing={3}>
        {exams.map((exam, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  User: {exam.user_id ? `${exam.user_id.firstname} ${exam.user_id.lastname}` : 'Unknown'}
                </Typography>
                <Typography variant="subtitle1">
                  Exam: {exam.exam_id?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(exam.date).toLocaleString()} {/* Format date */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllUserGivenExam;
