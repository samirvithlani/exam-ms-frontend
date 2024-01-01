import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [examList, setExamList] = useState([]);
  const[standards,setstandards] = useState([]);
  const[SelectedStandards,setSelectedStandards] = useState('');
  const [userHistory, setUserHistory] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchDifficultyLevels();
    fetchstd();
    fetchhistory();
  }, []);
const fetchstd = async()=>{
  try {
    const response = await axios.get('/getstd') 
    console.log(response.data.data,"std");
    setstandards(response.data.data);
    
  } catch (error) {
    console.log(error,"error");
  }
}

  const fetchDifficultyLevels = async () => {
    try {
      const response = await axios.get('/difficulty');
      let data = response.data;
      console.log(data, "in difficulties");
      setDifficulties(data);
    } catch (error) {
      console.error('Error fetching difficulty levels:', error);
    }
  };

  const handleDifficulty = async (event) => {
    const difficultyId = event.target.value;
    console.log(difficultyId,"idds ");
    setSelectedDifficulty(difficultyId);
    fetchData(SelectedStandards, difficultyId);

  };
  const handelStd = async (event) =>{
    const stdId = event.target.value;
    setSelectedStandards(stdId)
    console.log(stdId,"std id");
    fetchData(stdId,selectedDifficulty)
}
  const handleStartExam = (examId,examtype_id,totalmarks) => {
    console.log(examtype_id,"type id ");
    console.log(`Starting exam with ID: ${examId}`);
    navigate(`/question/${examId}`, { state: { examtype_id,totalmarks } });
  }
  const fetchhistory = async () => {
    const _id = Cookies.get('_id');
    try {
      const response = await axios.get(`/userhistory/${_id}`);
      let data = (response.data.map(item=>item.exam_id._id));
      console.log(data,"exam history");
      setUserHistory(data)
    }catch(err){
      console.log(err,"error");
    }
  }
  const filterExamsByHistory = () => {
   return examList.filter(exam => !userHistory.includes(exam.id))
  };
  const filteredExams  = filterExamsByHistory();
      const columns = [
    { field: 'displayid', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Exam Name', width: 200 },
      { field: 'examType', headerName: 'Exam Type', width: 150 },
      { field: 'examTopic', headerName: 'Exam Topic', width: 200 },
      { field: 'Subject', headerName: 'Subject', width: 150 },
      { field: 'Stream', headerName: 'Stream', width: 100 },
      {field: 'Standard', headerName: 'Standard', width: 100},
      {field: 'Difficulty', headerName: 'Difficulty', width: 100},
      { field: 'noOfQuestions', headerName: 'No. of Questions', width: 180 },
      { field: 'isTimeLimit', headerName: 'Time-Limited', width: 150 },
      { field: 'examTime', headerName: 'Exam Time (in hours)', width: 200 },
      { field: 'perQuestionTime', headerName: 'Time per Question (in minutes)', width: 280 },
      { field: 'totalmarks', headerName: 'Total Marks', width: 280 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleStartExam(params.row.id,params.row.examtype_id,params.row.totalmarks)}
          >
            Start Exam
          </Button>
        ),
      }      ];
  const fetchData = async (stdId,selectedDifficulty) => {
    await axios.get(`/exams/${selectedDifficulty}/${stdId}`)
    .then((response) => {
      console.log(response,"response");
      const filteredData = response.data.data.map((exam,index) => ({
        displayid: index+1,
        name: exam.name,
        examType: exam.examtype?.type || 'N/A',
        examTopic: exam.examtopic?.name || 'N/A',
        Subject : exam.subject?.name || 'N/A',
        Stream : exam.stream ? exam.stream.name:"NA",
        Standard :exam.std ? exam.std.std:"NA",
        Difficulty:exam.difficulty?exam.difficulty.difficulty :"NA",
        noOfQuestions: exam.noofquestions || 0,
        isNegative: exam.isNegative ,
        isTimeLimit: exam.isTimeLimit ? 'Yes' : 'No', 
        examTime: exam.examtime || 0,
        perQuestionTime: exam.perQuestiontime || 0,
        totalmarks:exam.totalmarks,
        id: exam._id,
        topicId:exam.examtopic?._id || 'N/A',
        difficultyId:exam.difficulty?._id || 'NA',
        examtype_id:exam.examtype?._id || 'N/A'
      }));
      console.log(filteredData,"filterdata");
      setExamList(filteredData); 
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  }
  const styles = {
    fullWidthSelect: {
      width: '50%',
    },
  };
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid  container spacing={3}>
        <Grid item xs={12} >
        <FormControl style={styles.fullWidthSelect}>
            <InputLabel id="demo-simple-select-label">Select Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedDifficulty}
              label="Difficulty"
              onChange={handleDifficulty}
              >
              {difficulties.map((item) => (
                <MenuItem key={item.id} value={item._id}>
                  {item.difficulty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl style={styles.fullWidthSelect}>
      <InputLabel id="demo-simple-select-label">Select Std</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="std"
        value={SelectedStandards}
        label="Standard"
        onChange={handelStd}
        >
        {standards.map((item) => (
          <MenuItem key={item.id} value={item._id}>
            {item.std}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </Grid>
      <Grid item xs={12}>
          {filteredExams.length > 0 ? (
            
              <DataGrid
                rows={filteredExams}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
              />

          ) : (
            <p>No available exams</p>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Dashboard;
