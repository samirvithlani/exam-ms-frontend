import React, { useState, useEffect } from 'react';
import { Grid, Box, List, ListItem, ListItemText, Avatar, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { CustomeLoader } from '../Layouts/CustomeLoader';

export const UserExamList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [standards, setStandards] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('');
  const[isloading,setisloading] = useState(false);
  const _id = Cookies.get("_id");

  useEffect(() => {
    fetchSubjects();
    fetchDifficulties();
    fetchStandards();
    fetchHistory();
    fetchExams();
  }, [id, selectedSubject, selectedDifficulty, selectedStandard]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("/subject");
      setSubjects(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchDifficulties = async () => {
    try {
      const response = await axios.get("/difficulty");
      setDifficulties(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchStandards = async () => {
    try {
      const response = await axios.get("/getstd");
      // console.log(response,"reso")
      setStandards(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`/userhistory/${_id}`);
      const data = response.data.map((item) => item.exam_id._id);
      setUserHistory(data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchExams = async () => {
    
    try {
      let url = "/getExambyFilter?";
      if (selectedStandard) url += `std=${selectedStandard}&`;
      if (selectedSubject) url += `subject=${selectedSubject}&`;
      if (selectedDifficulty) url += `difficulty=${selectedDifficulty}&`;
      setisloading(true)
      const response = await axios.get(url);
      if(response.status===200){
        setisloading(false)
      }
      
      setExams(response.data.data);

    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleClick = (subjectID) => {
    navigate(`/userDasboard/examdetails/${subjectID}`);
  };
  const filterExamsByHistory = () => {
        return exams.filter((exam) => !userHistory.includes(exam._id));
      };
  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };
  const filteredExams = filterExamsByHistory();

 const resetFilter = async ()=>{
  setSelectedStandard("");
  setSelectedSubject("");
  setSelectedDifficulty("")
  const response = await ("/getExambyFilter")
 }
  return (
    <>
      <h2>Recently Added Exam</h2>

      <Grid container spacing={2} style={{ padding: '20px' }}>
      {
            isloading ? <CustomeLoader /> : null
          }
      <Grid item xs={12}>
  <Box display="flex" marginBottom="20px">
    <select
      value={selectedStandard}
      onChange={(e) => setSelectedStandard(e.target.value)}
      style={{ marginRight: '10px' }}
    >
      <option value="">Select Standard</option>
      {standards.map((standard) => (
        <option key={standard._id} value={standard._id}>
          {standard.std}
        </option>
      ))}
    </select>
    <select
      value={selectedSubject}
      onChange={(e) => setSelectedSubject(e.target.value)}
      style={{ marginRight: '10px' }}
    >
      <option value="">Select Subject</option>
      {subjects.map((subject) => (
        <option key={subject._id} value={subject._id}>
          {subject.name}
        </option>
      ))}
    </select>
    <select
      value={selectedDifficulty}
      onChange={(e) => setSelectedDifficulty(e.target.value)}
      style={{ marginRight: '10px' }}
    >
      <option value="">Select Difficulty</option>
      {difficulties.map((difficulty) => (
        <option key={difficulty._id} value={difficulty._id}>
          {difficulty.difficulty}
        </option>
      ))}
    </select>
    <button onClick={resetFilter}>Reset Filter</button>
  </Box>
</Grid>
        {filteredExams.length > 0 ? (
       filteredExams.map((item) => (
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
        <ListItemText primary={item.name}   style={{ cursor: 'pointer' }} />
      </Box>
    </Grid>
  ))
) : (
  <h1>No Exams Found!</h1>
)}

      </Grid>
    </>
  );
};
