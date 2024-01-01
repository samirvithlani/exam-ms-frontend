import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    createTheme,
    Grid,
    InputLabel,
    TextField,
    ThemeProvider,
    Typography,
    FormControl,
    FormControlLabel,
    Select,
    MenuItem
  } from "@mui/material";
export const ViewExam = () => {
    const location = useLocation();
    const [exams , setexams] = useState([]);
    const [questions, setQuestions] = useState([]);

    const { id } = useParams()
    useEffect(()=>{
        fetchexams();
    },[id])
      const subject = location.state?.subject
      const stream = location.state?.stream;
      const difficulty = location.state?.difficulty;
      const standard = location.state?.standard;
      const topic = location.state?.topic;
      const type = location.state?.type;
    const fetchexams = async () =>{
        const response = await axios.get(`/exam/${id}`)
        console.log(response.data.mcq,"response");
        setQuestions(response.data.mcq);

    }
  return (
    <div>
          <Grid item xs={12}>
            <Typography variant="h6">Standard: {standard}</Typography>
          </Grid>
        <Grid item xs={12}>
            <Typography variant="h6">Stream: {stream}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Subject: {subject}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Topic: {topic}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Type: {type}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Difficulty: {difficulty}</Typography>
          </Grid>
          {questions.map((question) => (
          <Grid item xs={12} key={question._id}>
            <Typography variant="h6" gutterBottom>
              {question.question}
            </Typography>
            <ul>
      <li>{question.Option1}</li>
      <li>{question.Option2}</li>
      <li>{question.Option3}</li>
      <li>{question.Option4}</li>
    </ul>
          </Grid>
        ))}
    </div>
  )
}
