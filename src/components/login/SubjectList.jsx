import React, { useState, useEffect } from 'react';
import { Grid, Box, Avatar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomeLoader } from '../Layouts/CustomeLoader';

export const SubjectList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [Loading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, [id]);

  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/subject");
      if (response.status === 200) {
        setSubjects(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error, "error");
      setIsLoading(false);
    }
  };

  const handleClick = (subjectID) => {
    navigate(`/adminDashboard/subject/${subjectID}`);
  };

  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Box padding="20px">
      <Typography variant="h4" gutterBottom>
        Subject List
      </Typography>

      {Loading && <CustomeLoader />}

      {!Loading && subjects.length === 0 && (
        <Typography variant="h6">
          No data found
        </Typography>
      )}

      <Grid container spacing={2}>
        {subjects.map((item) => (
          <Grid key={item._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Box
              bgcolor="white"
              border="1px solid #ccc"
              borderRadius="5px"
              padding="10px"
              textAlign="center"
              onClick={() => handleClick(item._id)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar>{getAvatarLetter(item.name)}</Avatar>
              <Typography variant="body1">{item.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
