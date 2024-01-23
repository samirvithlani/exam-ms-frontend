import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  MenuItem,
} from "@mui/material";

export const ViewExam = () => {
  const location = useLocation();
  const [exams, setexams] = useState([]);
  const [questions, setQuestions] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    fetchexams();
  }, [id]);

  const subject = location.state?.subject;
  const stream = location.state?.stream;
  const difficulty = location.state?.difficulty;
  const standard = location.state?.standard;
  const topic = location.state?.topic;
  const type = location.state?.type;

  const fetchexams = async () => {
    const response = await axios.get(`/exam/${id}`);
    setQuestions(response.data.mcq);
  };

  const cardStyle = {
    backgroundColor: "rgb(103,58,183)",
    border: "1px solid #ddd",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    fontFamily: "Lato",
    padding: "20px",
    marginBottom: "20px",
  };

  const QuestioncardStyle = {
    backgroundColor: "rgb(102,102,102)",
    border: "1px solid #ddd",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    fontFamily: "Lato",
    padding: "20px",
    marginBottom: "20px",
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2, ml: 0.1, p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Lato" }}>
          EXAM DETAIL
        </Typography>
      </Grid>

      <Grid item xs={12} style={{ ...cardStyle }}>
        <Typography variant="h6">Standard: {standard}</Typography>
        <Typography variant="h6">Stream: {stream}</Typography>
        <Typography variant="h6">Subject: {subject}</Typography>
        <Typography variant="h6">Topic: {topic}</Typography>
        <Typography variant="h6">Type: {type}</Typography>
        <Typography variant="h6">Difficulty: {difficulty}</Typography>
      </Grid>

      {questions.map((question) => (
        <Grid item key={question.id} xs={12} style={{ ...QuestioncardStyle }}>
          <Typography variant="h6" gutterBottom>
            {question.question}
          </Typography>
          <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
            <li>
              <Typography variant="body1">OPTION 1: {question.Option1}</Typography>
            </li>
            <li>
              <Typography variant="body1">OPTION 2: {question.Option2}</Typography>
            </li>
            <li>
              <Typography variant="body1">OPTION 3: {question.Option3}</Typography>
            </li>
            <li>
              <Typography variant="body1">OPTION 4: {question.Option4}</Typography>
            </li>
          </ul>
        </Grid>
      ))}
    </Grid>
  );
};
