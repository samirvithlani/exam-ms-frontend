
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
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

const StudentSubject = () => {
//   const navigate = useNavigate();
  const  id  = Cookies.get('_id')
  
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
      setUserData(response?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchFacultySubjects = async () => {
    try {
      const response = await axios.get(`/facultysubject/${id}`);
      const subjects = response?.data?.flatMap(data => data?.subject?.map(sub => sub?._id));
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
      const response = await axios.post(`/facultysubject`, data);
      if (response.status === 200) {  
        toast.success("Subjcet Prefrence Saved Sucessfully")
    }
      // navigate('/some-path'); 
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" mb={2}>Select Subject Prefrence</Typography>
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
      <ToastContainer/>
    </Paper>
  );
}

export default StudentSubject;

