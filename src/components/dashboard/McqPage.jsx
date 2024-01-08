import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FormControl, FormControlLabel, Paper, Radio, RadioGroup, Typography, Grid, Button } from '@mui/material';
import Cookies from 'js-cookie'; 
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CustomeLoader } from "../Layouts/CustomeLoader";
const MCQQuestionsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false)
  const location = useLocation();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const examtype_id = location.state?.examtype_id;
  const totalmarks = location.state?.totalmarks;
  useEffect(() => {
    fetchQuestions();
  }, [id]);
  const paperStyle = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: "auto",
    backgroundColor: "white", // Set the background color to grey
    m1: 2,
  };
  const fetchQuestions = async () => {
    setisLoading(true)
    try {
      const response = await axios.get(`/exam/${id}`);
      setQuestions(response.data.mcq);
      initializeAnswers(response.data.mcq);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setisLoading(false)

  };

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question._id] = null;
    });
    setSelectedAnswers(initialAnswers);
  };

  const handleAnswerChange = (questionId, value) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: value });
    if (!attemptedQuestions.includes(questionId)) {
      setAttemptedQuestions([...attemptedQuestions, questionId]);
    }
  };

  const handleSubmit = async() => {
    const _id = Cookies.get('_id')
   const mcqAnswers = [];
  questions.forEach(question => {
    const questionId = question._id;
    const selectedAnswer = selectedAnswers[questionId];
    mcqAnswers.push({ question: questionId, givenanswer: selectedAnswer });
  });

   const data = {
    user_id : _id,
    exam_id :id,
    exam_type :examtype_id,
    attempt_mcqquestions: attemptedQuestions,
    mcq_answers : mcqAnswers,
    total_marks:totalmarks,
    status:'completed'
   }
    try {
      const result = await toast.promise(axios.post("/add", data), {
        pending: "completed Exam...",
        success: "Exam completed Successfully!",
        error: "Failed to completed Exam. Please try again.",
      });
      navigate('/userDasboard/history')
    } catch (error) {
      console.log(error,"erroro");
    }
  };
  return (
    <div>
      <Paper sx={paperStyle} className="responsive-container">
        {
          isLoading ? <CustomeLoader/> : null
        }
      <Typography variant="h4" gutterBottom>
        MCQ Questions for Exam
      </Typography>
      <Grid container spacing={2}>
        {questions.map((question) => (
          <Grid item xs={12} key={question._id}>
            <Typography variant="h6" gutterBottom>
              {question.question}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name={`question_${question._id}`}
                value={selectedAnswers[question._id] || ''}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label={question.Option1} />
                <FormControlLabel value="2" control={<Radio />} label={question.Option2} />
                <FormControlLabel value="3" control={<Radio />} label={question.Option3} />
                <FormControlLabel value="4" control={<Radio />} label={question.Option4} />
              </RadioGroup>
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Answers
      </Button>
      <ToastContainer/>
      </Paper>
    </div>

  );
};

export default MCQQuestionsPage;
