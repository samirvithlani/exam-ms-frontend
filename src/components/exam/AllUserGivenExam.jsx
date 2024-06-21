import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container, ThemeProvider, createTheme } from '@mui/material';
import { CustomeLoader } from '../Layouts/CustomeLoader';
import { constant } from '../../constant';

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
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Typography variant="h4" gutterBottom sx={{color:constant.backgroundColor}}>
        All User Given Exams ::
      </Typography>
      <Typography variant="h6"sx={{color:constant.backgroundColor}}>
        Total Given Exams : {exams?.length}
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
    </ThemeProvider>
  );
};

export default AllUserGivenExam;
