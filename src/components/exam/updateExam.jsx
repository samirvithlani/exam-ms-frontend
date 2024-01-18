import * as React from "react";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
    MenuItem,
    FormControl,
  InputLabel,
  Select,
  } from "@mui/material";
  import { useParams } from 'react-router-dom';

export const UpdateExam = () => {
    const { id } = useParams(); // Get the exam ID from the route params
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [types,setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [examData, setExamData] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [noOfQuestionsValue, setNoOfQuestionsValue] = useState('');
  const [isTimeLimitValue, setIsTimeLimitValue] = useState('');
  const [totalMarksValue, setTotalMarksValue] = useState('');
  const [perQuestionMarksValue, setPerQuestionMarksValue] = useState('');
  useEffect(() => {
      fetchExamDetails();
    fetchStreams();
    fetchTypes();
  }, [id]);
  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleNoOfQuestionsChange = (event) => {
    setNoOfQuestionsValue(event.target.value);
  };
  const handleisTimeLimit = (event)=>{
    setIsTimeLimitValue(event.target.value);
  }
  const totalmarks = (event)=>{
    setTotalMarksValue(event.target.value);
  }
  const perQuestionmarks = (event)=>{
    setPerQuestionMarksValue(event.target.value);
  }
  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(`/exam/${id}`);
      const { stream, subject, examtopic, examtype, ...otherData } = response.data;
      setNameValue(otherData.name || '');
      setNoOfQuestionsValue(otherData.noofquestions || '');
      // setIsTimeLimitValue(otherData.isTimeLimit ||'');
      setTotalMarksValue(otherData.totalmarks);
      setPerQuestionMarksValue(otherData.perQuestionmarks)
      setExamData({ stream, subject, examtopic, examtype });;
      setSelectedStream(response.data.stream._id);
      setSelectedSubject(response.data.subject.name);
      setSelectedTopic(response.data.examtopic.name);
      setSelectedType(response.data.examtype.type)
    } catch (error) {
      console.error('Error fetching exam details:', error);
    }
  };
  const fetchStreams = async () => {
    try {
      const response = await axios.get('/stream');
      setStreams(response.data);
    } catch (error) {
      console.error('Error fetching streams:', error);
    }
  };

  const fetchSubjects = async (streamId) => {
    try {
      const response = await axios.get(`/subject/${streamId}`);
      setSubjects(response.data.result);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
const fetchTopics = async (subjectId) =>{
  try{
    const response=await axios.get(`/Topic/${subjectId}`)
    setTopics(response.data.result)
  } catch(error){
    console.log("Error fetching topics : ",error);
  }
};
const fetchTypes = async()=>{
  try {
    const response = await axios.get('/type')
    setTypes(response.data.result)
  } catch (error) {
    console.log("error",error);
  }
}
  const handleStreamChange = async (event) => {
    const streamId = event.target.value;
    setSelectedStream(streamId);
    setSelectedSubject('');
      setSelectedTopic('');
      fetchSubjects(streamId);
  };
  const handleSubjectChange = async (event) => {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);
    setSelectedTopic('');
    fetchTopics(subjectId);
  };
  const handelTopicChange = async(event)=>{
    const TopicId = event.target.value;
    setSelectedTopic(TopicId);
  };
  const handelTypeChange = async(event)=>{
    const TypeId = event.target.value;
    setSelectedType(TypeId);
  }
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const { register, handleSubmit ,reset} = useForm();

  const submitHandler = async (data) => {
    const updatedFields = {};

    if (nameValue !== examData.name) {
      updatedFields.name = nameValue;
    }
    if (noOfQuestionsValue !== examData.noofquestions) {
      updatedFields.noofquestions = noOfQuestionsValue;
    }
    // if (isTimeLimitValue !== examData.isTimeLimit) {
    //   updatedFields.isTimeLimit = isTimeLimitValue;
    // }
    if (totalMarksValue !== examData.totalmarks) {
      updatedFields.totalmarks = totalMarksValue;
    }
    if (perQuestionMarksValue !== examData.perQuestionmarks) {
      updatedFields.perQuestionmarks = perQuestionMarksValue;
    }
    if(selectedStream !== examData.stream.name){
        updatedFields.stream = selectedStream
    }
    if(selectedSubject !== examData.subject.name){
        updatedFields.subject = selectedSubject
    }
    
    if(selectedTopic!== examData.examtopic.name){
        updatedFields.examtopic = selectedTopic
    }
    if(selectedType!== examData.examtype.type){
        updatedFields.examtype = selectedType
    }
    
    try {
        const result = await toast.promise(axios.put(`/exam/${id}`,updatedFields), {
            pending: "Updating Exam...",
            success: "Exam Update Successfully!",
            error: "Failed to Update Exam. Please try again.",
          });
          // navigate('/adminDashboard/examlist'); 

      } catch (error) {
        console.error("Error updating exam:", error);
      }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Grid>
      <Avatar
      sx={{
        m: 1,
        bgcolor: "secondary.main",
        marginLeft: '500px', 
        '@media (max-width: 600px)':{
          marginLeft: '0', 
          width: '50px',
          height: '50px', 
        },
      }}
    >
      <AddBoxIcon />
    </Avatar>
        <Typography component="h1" variant="h5">
          UPDATE EXAM
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
            fullWidth
          name="name"
          label = "Name"
          value={nameValue}
          onChange={handleNameChange}
        />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="noofquestions"
                required
                fullWidth
                id="noofquestions"
                label="noOfQuestions"
                value={noOfQuestionsValue}
                onChange={handleNoOfQuestionsChange}
                type="Number"
                autoFocus
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="isTimeLimit"
                required
                fullWidth
                value={isTimeLimitValue}
                onChange={handleisTimeLimit}
                id="isTimeLimit"
                label="isTimeLimit"
                type="boolean"
                autoFocus
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="TotalMarks"
                required
                fullWidth
                id="totalmarks"
                label="totalmarks"
                value={totalMarksValue}
                onChange={totalmarks}
                type="Number"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="perQuestionmarks"
                required
                fullWidth
                id="perQuestionmarks"
                label="perQuestionmarks"
                type="Number"
                value={perQuestionMarksValue}
                onChange={perQuestionmarks}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
            Selected Stream: { (examData?.stream?.name || 'None')}
        </Typography>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Stream</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={selectedStream}
        label="Stream"
        onChange={handleStreamChange}
        >
        {streams.map((item) => (
          <MenuItem key={item.id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </Grid>
      <Grid item xs={12}>
      <Typography variant="body1" gutterBottom>
            Selected Subject: { (examData?.subject?.name || 'None')}
        </Typography>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedSubject}
        label="Subject"
        // {...register("subject")}
        onChange={handleSubjectChange}
      >
        {subjects.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </Grid>
      <Grid item xs={12}>
      <Typography variant="body1" gutterBottom>
            Selected Topic: { (examData?.examtopic?.name || 'None')}
        </Typography>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Topic</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedTopic}
        label="Stream"
        // {...register("examtopic")}
        onChange={handelTopicChange}
      >
        {topics.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </Grid>
      <Grid item xs={12}>
      <Typography variant="body1" gutterBottom>
            Selected Type: { (examData?.examtype?.type || 'None')}
        </Typography>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedType}
        label="examtype"
        {...register("examtype")}
        onChange={handelTypeChange}
      >
        {types.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           UPDATE
          </Button>
        </Box>
      </Grid>
<ToastContainer/>
    </ThemeProvider>
  );
};
