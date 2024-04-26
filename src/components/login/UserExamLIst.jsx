import React, { useState, useEffect } from 'react';
import { Grid, Box, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export const UserExamList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exams, setexams] = useState([]);
  const [userHistory, setUserHistory] = useState([]);

  const _id = Cookies.get("_id");
  
  useEffect(() => {
    Exams();
    fetchhistory()
  }, [id]);

  const Exams = async () => {
    try {
      const response = await axios.get("/exam");
      // console.log(response.data);
      setexams  (response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleClick = (subjectID) => {
    // console.log("Clicked on subject ID:", subjectID);
    navigate(`/userDasboard/examdetails/${subjectID}`);
  };
  const fetchhistory = async () => {
    try {
      const response = await axios.get(`/userhistory/${_id}`);
      let data = response.data.map((item) => item.exam_id._id);
      setUserHistory(data);
    } catch (err) {
      console.log(err, "error");
    }
  };
  const filterExamsByHistory = () => {
    return exams.filter((exam) => !userHistory.includes(exam._id));
  };
  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };
  const filteredExams = filterExamsByHistory();
  return (
    <>
    <h2>Recently Added Exam</h2>

    <Grid container spacing={2} style={{ padding: '20px' }}>
      {filteredExams.map((item) => (
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
    </>
  );
};
