import React, { useState, useEffect } from 'react';
import { Grid, Box, Avatar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CustomeLoader } from '../Layouts/CustomeLoader';
import { constant } from '../../constant';

export const SubjectList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [userSubjects, setUserSubjects] = useState([]);
  const userId = Cookies.get("_id");
  const role = Cookies.get("role");

  useEffect(() => {
    fetchSubjects();
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/facultysubject/${userId}`);
      const subjects = response?.data?.[0]?.subject || [];
      setUserSubjects(subjects.map((subject) => subject._id));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
    let dashboardPath = '';

    switch (role) {
      case 'faculty':
        dashboardPath = 'facultyDashboard';
        break;
      case 'superAdmin':
        dashboardPath = 'adminDashboard';
        break;
      default:
        dashboardPath = 'dashboard'; // Fallback path
    }

    navigate(`/${dashboardPath}/subject/${subjectID}`);
  };

  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const filteredSubjects = role === 'faculty'
    ? subjects.filter(subject => userSubjects.includes(subject._id))
    : subjects;

  return (
    <Box padding="20px">
      <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Lato", mb: 3, color: constant.backgroundColor }}>
        Subject List ::
      </Typography>

      {loading && <CustomeLoader />}

      {!loading && filteredSubjects.length === 0 && (
        <Typography variant="h6">
          No data found
        </Typography>
      )}

      <Grid container spacing={3}>
        {filteredSubjects.map((item) => (
          <Grid key={item._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Box
              bgcolor="white"
              border="1px solid #ccc"
              borderRadius="10px"
              padding="20px"
              textAlign="center"
              onClick={() => handleClick(item._id)}
              sx={{ 
                cursor: 'pointer',
                boxShadow: 3,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Avatar
                src={`/path/to/your/images/${item._id}.jpg`} // replace with your image path logic
                sx={{ 
                  width: 80, 
                  height: 80, 
                  margin: '0 auto 10px auto' 
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2,color:constant.backgroundColor }}>
                {item.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
