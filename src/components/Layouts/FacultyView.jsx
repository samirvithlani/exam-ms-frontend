import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  FormControl,
  Paper,
  Box,
} from '@mui/material';

const FacultyView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchUser(), fetchSubjects(), fetchFacultySubjects()]);
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/subject');
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/user/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchFacultySubjects = async () => {
    try {
      const response = await axios.get(`/facultysubject/${id}`);
      const subjects = response.data.flatMap(data => data.subject.map(sub => sub._id));
      setSelectedSubjects(subjects);
    } catch (error) {
      console.error("Error fetching faculty subjects:", error);
    }
  };

  const handleCheckboxChange = (subjectId) => {
    setSelectedSubjects(prevSelectedSubjects => {
      if (prevSelectedSubjects.includes(subjectId)) {
        return prevSelectedSubjects.filter(id => id !== subjectId);
      } else {
        return [...prevSelectedSubjects, subjectId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: id,
        roleId: userData?.role?._id,
        subject: selectedSubjects
      };
      await axios.post(`/facultysubject`, data);
      alert("Subjects assigned successfully");
      // navigate('/some-path'); 
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>Profile</Typography>
      {userData && (
        <Box mb={3}>
          <Typography>Name: {userData.firstname + ' ' + userData.lastname}</Typography>
          <Typography>Email: {userData.email}</Typography>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" mb={2}>Assign Subjects</Typography>
        <FormGroup>
          {subjects.map(subject => (
            <FormControlLabel
              key={subject._id}
              control={
                <Checkbox
                  checked={selectedSubjects.includes(subject._id)}
                  onChange={() => handleCheckboxChange(subject._id)}
                />
              }
              label={subject.name}
            />
          ))}
        </FormGroup>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default FacultyView;
