  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';
  import { FormControl, FormControlLabel, FormGroup, Paper, Checkbox, Radio, RadioGroup, Typography, Grid, Button } from '@mui/material';
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

    console.log(examName,'credit',credit,"=====",Userdata,"------");
    useEffect(() => {
      fetchQuestions();
    }, [id]);

    const paperStyle = {
      p: 2,
      display: "flex",
      flexDirection: "column",
      height: "auto",
      backgroundColor: "white",
      m1: 2,
    };

    const fetchQuestions = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(`/exam/${id}`);
        setQuestions(response.data.mcq);
        initializeAnswers(response.data.mcq);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
      setisLoading(false);
    };

    const initializeAnswers = (questions) => {
      const initialAnswers = {};
      questions.forEach((question) => {
        if (question.isMultiselectedQuestion) {
          initialAnswers[question._id] = '';
        } else {
          initialAnswers[question._id] = '';
        }
      });
      setSelectedAnswers(initialAnswers);
    };

    const handleAnswerChange = (questionId, value) => {
      setSelectedAnswers(prevState => {
        let updatedValue;
        if (Array.isArray(value)) {
          // Filter out NaN, remove duplicates, and sort
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
      // debugger
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
        if(Userdata.walllet !== null){
          const updatedcredit = Userdata?.wallet?.token-credit
          const response = await axios.put(`/wallet/${Userdata.wallet?._id}`,{token:updatedcredit})     
          const data = {user:_id,walletType:Userdata.wallet?.walletType,wallet:Userdata.wallet?._id,Transcation_history:`Debit ${credit} credit from wallet for ${examName} exam`}
          const transction = await axios.post('/transcation',data)
          console.log(transction,"transction");
        }
        navigate('/userDasboard/history')
      } catch (error) {
        console.log(error, "erroro");
      }
    };

    return (
      <div>
        <Paper sx={paperStyle} className="responsive-container">
          {
            isLoading ? <CustomeLoader /> : null
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
                                  onChange={(e) => handleAnswerChange(question._id, e.target.checked ? [...selectedAnswers[question._id], optionNumber] : selectedAnswers[question._id].filter(item => item !== optionNumber))}
                                />
                              }
                              label={question[key]}
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
                              label={question[key]}
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Answers
          </Button>
          <ToastContainer />
        </Paper>
      </div>
    );
  };

  export default MCQQuestionsPage;
