import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, createTheme, ThemeProvider } from '@mui/material';
import Cookies from 'js-cookie';
import { constant } from '../../constant';

const UserContestexam = () => {
  const { id } = useParams();
  const [exams, setExams] = useState([]);
  const [userExams, setUserExams] = useState([]);
  const navigate = useNavigate();
  const Id = Cookies.get("_id");

  useEffect(() => {
    fetchDetails();
    fetchUserExam();
  }, []);

  const fetchUserExam = async () => {
    try {
      const response = await axios.get(`/contest_participant/${Id}`,id);
      const userExamData = response?.data;
      setUserExams(userExamData);
      fetchDetails(userExamData);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchDetails = async (userExamData = []) => {
    try {
      const response = await axios.get(`/contest/${id}`);
      const fetchedExams = response.data?.exam;

      const updatedExams = fetchedExams.map((exam, index) => {
        let isActive = index === 0; 

        if (index > 0) {
          const prevExam = fetchedExams[index - 1];
          const prevExamCompleted = userExamData.some(
            userExam => userExam?.exam.some(userExamDetail => userExamDetail?._id === prevExam?._id)
          );
          if (prevExamCompleted) {
            isActive = true;
          }
        }

        return {
          ...exam,
          isActive,
          isTaken: userExamData.some(userExam => userExam?.exam.some(userExamDetail => userExamDetail?._id === exam._id))

        };
      });

      setExams(updatedExams);
    } catch (error) {
      console.error('Error fetching contest details:', error);
    }
  };

  const handleCardClick = (exam) => {
    if (exam.isTaken) {
      alert("You have already taken this exam.")
    } else {
   navigate(`/userDasboard/examdetails/${exam?._id}`);
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
      <Typography variant="h4" component="h2" style={{margin: '20px 0',color:constant.backgroundColor }}>
        Contest Exams
      </Typography>
      <Grid container spacing={2}>
        {exams.map((exam) => (
          <Grid item key={exam._id} xs={12} sm={6} md={4}>
            <Card
              onClick={() => handleCardClick(exam)}
              style={{ backgroundColor: exam.isActive ? 'white' : 'grey' , pointerEvents: exam.isActive ? 'auto' : 'none',
                cursor: exam.isActive ? 'pointer' : 'default',}} 
            >
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
    </ThemeProvider>
  );
};

export default UserContestexam;
