import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import QuestionList from '../CustomeCopmonent/QuestionList';  // Adjust the import path as needed

export const ViewExam = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    fetchExams();
  }, [id]);

  const subject = location.state?.subject;
  const stream = location.state?.stream;
  const difficulty = location.state?.difficulty;
  const standard = location.state?.standard;
  const topic = location.state?.topic;
  const type = location.state?.type;

  const fetchExams = async () => {
    const response = await axios.get(`/exam/${id}`);
    setQuestions(response.data.mcq);
  };

  const deleteQuestion = async (mcqId) => {
    try {
      await axios.delete(`/remove/${id}`, {
        data: { mcqId }
      });
      setQuestions(prevQuestions => prevQuestions.filter(q => q._id !== mcqId));
    } catch (error) {
      console.error('Failed to delete the question', error);
    }
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

  return (
    <Grid container spacing={2} sx={{ mt: 2, ml: 0.1, p: 2 }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Lato" }}
        >
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

      {questions.map((question,index) => {
        const options = Object.keys(question)
          .filter(key => key.startsWith('Option') && question[key])
          .map(key => question[key]);

        return (
          <Grid item key={question._id} xs={12}>
            <QuestionList
              question={question.question}
              type={question.type} // Assuming `type` is a property of each question
              options={options}
              onDelete={() => deleteQuestion(question._id)}
              questionNumber={index + 1} // Calculate question number based on index (1-based)
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
