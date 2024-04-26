import React, { useState, useEffect } from 'react';
import { Grid, Box, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ExamSubjectList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [standards, setstandards] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, [id]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/subjects/${id}`);
      // console.log(response.data);
      setstandards(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleClick = (subjectID) => {
    // console.log("Clicked on subject ID:", subjectID);
    // navigate(`/adminDashboard/subject/${subjectID}`);
  };

  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Grid container spacing={2} style={{ padding: '20px' }}>
      {standards.map((item) => (
        <Grid key={item._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Box
            bgcolor="white"
            border="1px solid #ccc"
            borderRadius="5px" // Adjust border radius as desired
            padding="10px"
            textAlign="center"
            onClick={() => handleClick(item._id)}
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
