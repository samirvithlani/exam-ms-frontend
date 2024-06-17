import React, { useState, useEffect } from 'react';
import { Grid, Box, Avatar, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomeLoader } from '../Layouts/CustomeLoader';

export const GridList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/exams/${id}`);
        if (response.status === 200) {
          const ActiveExam = response.data.filter(data => data.isActive);
          setExam(ActiveExam);
        }
        setLoading(false);
      } catch (error) {
        console.log(error, "error");
        setLoading(false);
      }
    };
    fetchExams();
  }, [id]);

  const handleClick = (examId) => {
    const role = Cookies.get('role');
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

    navigate(`/${dashboardPath}/examdetails/${examId}`);
  };

  const handleBackClick = () => {
    const role = Cookies.get('role');
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

    navigate(`/${dashboardPath}/subjectlist`);
  };

  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Box padding="20px">
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackClick}
        style={{ marginBottom: '20px' }}
        startIcon={<ArrowBackIcon />}
      >
        Back to Subject List
      </Button>

      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Exam List
      </Typography>

      {loading && <CustomeLoader />}

      {!loading && exam?.length === 0 && (
        <Typography variant="h6" color="error" textAlign="center">
          No Exams Found!
        </Typography>
      )}

      <Grid container spacing={3}>
        {exam?.length > 0 &&
          exam.map((item) => (
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
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mt: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%', // Ensure the text does not overflow the box
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
