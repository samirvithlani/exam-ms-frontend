// UserProfile.js
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
const UserProfile = () => {
  const [data, setdata] = useState([]);
  const id = Cookies.get('_id');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let result = await axios.get(`/user/${id}`);
      setdata(result.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <Card className="user-profile-card">
      <CardContent>
        <Typography variant="h5" component="div" className="profile-title">
          User Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" className="profile-info">
          NAME: {data.firstname}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="profile-info">
          Email: {data.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="profile-info">
          Phone: {data.phone}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
