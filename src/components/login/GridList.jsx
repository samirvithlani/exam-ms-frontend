import React, { useState, useEffect } from 'react';
import { Grid, Box, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GridList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`/exams/${id}`);
        setExam(response.data); // Assuming the exam data is stored in the 'data' field of the response
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchExams();
  }, [id]);

  const handleClick = (examId) => {
    console.log("Clicked on exam ID:", examId);
    navigate(`/adminDashboard/examdetails/${examId}`);
  };

  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Grid container spacing={2} style={{ padding: '20px' }}>
      {exam && exam.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Box
            bgcolor="white"
            border="1px solid #ccc"
            borderRadius="5px"
            padding="10px"
            textAlign="center"
            onClick={() => handleClick(item._id)}
            boxShadow="0 2px 4px rgba(0,0,0,0.1)" // Add shadow here

            style={{ cursor: 'pointer' }}
          >
            <Avatar>{getAvatarLetter(item.name)}</Avatar>
            <ListItemText primary={item.name} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
