import React, { useState, useEffect } from 'react';
import { Grid, Box, List, ListItem, ListItemText, Avatar } from '@mui/material'; // Removed IconButton import
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
  navigate(`/adminDashboard/examdetails/${examId}`)
  };

  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Grid container spacing={2} style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
      {exam && (
        <Grid item xs={12}>
          <List style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {exam.map((item) => (
              <ListItem key={item.id} style={{ backgroundColor: '#ffffff', borderRadius: '10px', margin: '5px', padding: '10px', textAlign: 'center' }}>
                <Avatar >{getAvatarLetter(item.name)}</Avatar>
                <ListItemText primary={item.name} onClick={()=>handleClick(item._id)} />
                {/* <div onClick={() => handleClick(item._id)} style={{ cursor: 'pointer' }}> */}
                  {/* Your clickable content */}
                  {/* Click me
                </div> */}
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
};
