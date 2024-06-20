import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FormControl, FormControlLabel, FormGroup, Paper, Checkbox, Radio, RadioGroup, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CustomeLoader } from "../Layouts/CustomeLoader";

const MCQQuestionsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const examtype_id = location.state?.examtype_id;
  const totalmarks = location.state?.totalmarks;
  const examName = location.state?.name;
  const credit = location.state?.credit;
  const Userdata = location.state?.userdata;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    alert("If you refresh the page or go back, your exam will be reset automatically.");
    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      handleSubmit();
    } else {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 121) {
            setOpenDialog(true);
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const paperStyle = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: "auto",
    backgroundColor: "white",
    m1: 1,
  };
  const paperStyle2 = {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    backgroundColor: "#E6E6E6",
    p: 1,
    fontFamily: "Arial",
  };

  const fetchQuestions = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(`/exam/${id}`);
      setQuestions(response.data.mcq);
      initializeAnswers(response.data.mcq);

      const examTimeInMinutes = parseInt(response.data.examtime, 10);
      if (!isNaN(examTimeInMinutes) && examTimeInMinutes > 0) {
        setTimeLeft(examTimeInMinutes * 60);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setisLoading(false);
  };

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question._id] = '';
    });
    setSelectedAnswers(initialAnswers);
  };

  const handleAnswerChange = (questionId, value) => {
    setSelectedAnswers(prevState => {
      let updatedValue;
      if (Array.isArray(value)) {
        const filteredValues = value.filter(option => !isNaN(option)).filter((v, i, a) => a.indexOf(v) === i).sort();
        updatedValue = filteredValues.join(',');
      } else {
        updatedValue = isNaN(value) ? '' : value.toString();
      }
      if (!attemptedQuestions.includes(questionId)) {
        setAttemptedQuestions([...attemptedQuestions, questionId]);
      }
      return { ...prevState, [questionId]: updatedValue };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const _id = Cookies.get('_id');
    const mcqAnswers = [];
    questions.forEach(question => {
      const questionId = question._id;
      const selectedAnswer = selectedAnswers[questionId];
      mcqAnswers.push({ question: questionId, givenanswer: selectedAnswer });
    });
    const data = {
      user_id: _id,
      exam_id: id,
      exam_type: examtype_id,
      attempt_mcqquestions: attemptedQuestions,
      mcq_answers: mcqAnswers,
      total_marks: totalmarks,
      status: 'completed'
    }
    try {
      const result = await toast.promise(axios.post("/add", data), {
        pending: "completed Exam...",
        success: "Exam completed Successfully!",
        error: "Failed to complete Exam. Please try again.",
      });
      if (Userdata.walllet !== null) {
        const updatedcredit = Userdata?.wallet?.token - credit;
        await axios.put(`/wallet/${Userdata.wallet?._id}`, { token: updatedcredit });
        const data = { user: _id, walletType: Userdata.wallet?.walletType, wallet: Userdata.wallet?._id, Transcation_history: `Debit ${credit} credit from wallet for ${examName} exam` }
        const transction = await axios.post('/transcation', data);
        console.log(transction, "transction");
      }
      navigate('/userDasboard/history');
    } catch (error) {
      setIsSubmitting(false);
      console.log(error, "erroro");
    }
  };

  const handleCheckboxChange = (questionId, optionNumber, isChecked) => {
    setSelectedAnswers(prevState => {
      let updatedValueArray = prevState[questionId].split(',').filter(val => val);

      if (isChecked) {
        updatedValueArray.push(optionNumber);
      } else {
        updatedValueArray = updatedValueArray.filter(val => val !== optionNumber);
      }

      const updatedValue = updatedValueArray.sort().join(',');

      return { ...prevState, [questionId]: updatedValue };
    });

    if (!attemptedQuestions.includes(questionId)) {
      setAttemptedQuestions([...attemptedQuestions, questionId]);
    }
  };

  const HtmlLabel = ({ html }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Paper sx={paperStyle} className="responsive-container">
        {isLoading ? <CustomeLoader /> : null}
        <Typography variant="h5" gutterBottom sx={{color:"#010080"}}>
          ExamName :: {examName.toUpperCase()}
        </Typography>
        {timeLeft !== null && (
          <Typography variant="h6" gutterBottom>
            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </Typography>
        )}
        <Grid container spacing={2}>
          {questions.map((question, qIndex) => (
            <Grid item xs={12} key={question._id}>
              <Paper sx={paperStyle2} className="responsive-container">
                <Typography variant="h6" gutterBottom>
                  {`Q${qIndex + 1}. `}
                  <div dangerouslySetInnerHTML={{ __html: question.question }} />
                </Typography>
              </Paper>
              <FormControl component="fieldset">
                {question.isMultiselectedQuestion ? (
                  <FormGroup>
                    {Object.keys(question).map(key => {
                      if (key.startsWith('Option')) {
                        const optionNumber = key.replace('Option', '');
                        return (
                          <FormControlLabel
                            key={optionNumber}
                            control={
                              <Checkbox
                                checked={selectedAnswers[question._id].includes(optionNumber)}
                                onChange={(e) => handleCheckboxChange(question._id, optionNumber, e.target.checked)}
                              />
                            }
                            label={<HtmlLabel html={question[key]} />}
                          />
                        );
                      }
                      return null;
                    })}
                  </FormGroup>
                ) : (
                  <RadioGroup
                    name={`question_${question._id}`}
                    value={selectedAnswers[question._id]}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  >
                    {Object.keys(question).map(key => {
                      if (key.startsWith('Option')) {
                        const optionNumber = key.replace('Option', '');
                        return (
                          <FormControlLabel
                            key={optionNumber}
                            value={optionNumber}
                            control={<Radio />}
                            label={<HtmlLabel html={question[key]} />}
                          />
                        );
                      }
                      return null;
                    })}
                  </RadioGroup>
                )}
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
          Submit Answers
        </Button>
        <ToastContainer />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Time Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Only 2 minutes left. Please review and submit your answers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MCQQuestionsPage;
