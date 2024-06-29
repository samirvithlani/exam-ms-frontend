import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Checkbox,
  Radio,
  RadioGroup,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";
import Theme from "quill/core/theme";
import HangingWatch from "../CustomeCopmonent/HangingWatch";
import { motion, useScroll } from "framer-motion";

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
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setStartTime(Date.now());
    alert(
      "If you refresh the page or go back, your exam will be reset automatically."
    );
    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      handleSubmit();
    } else {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
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
      setQuestions(response?.data?.mcq);
      initializeAnswers(response.data.mcq);

      const examTimeInMinutes = parseInt(response.data.examtime, 10);
      if (!isNaN(examTimeInMinutes) && examTimeInMinutes > 0) {
        setTimeLeft(examTimeInMinutes * 60);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setisLoading(false);
  };

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question._id] = "";
    });
    setSelectedAnswers(initialAnswers);
  };

  const handleAnswerChange = (questionId, value) => {
    setSelectedAnswers((prevState) => {
      let updatedValue;
      if (Array.isArray(value)) {
        const filteredValues = value
          .filter((option) => !isNaN(option))
          .filter((v, i, a) => a.indexOf(v) === i)
          .sort();
        updatedValue = filteredValues.join(",");
      } else {
        updatedValue = isNaN(value) ? "" : value.toString();
      }
      if (!attemptedQuestions.includes(questionId)) {
        setAttemptedQuestions([...attemptedQuestions, questionId]);
      }
      return { ...prevState, [questionId]: updatedValue };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const _id = Cookies.get("_id");
    const mcqAnswers = [];
    questions.forEach((question) => {
      const questionId = question._id;
      const selectedAnswer = selectedAnswers[questionId];
      mcqAnswers.push({ question: questionId, givenanswer: selectedAnswer });
    });
    const endTime = Date.now();
    const timeTakenInMinutes = Math.floor((endTime - startTime) / (1000 * 60));

    const data = {
      user_id: _id,
      exam_id: id,
      exam_type: examtype_id,
      attempt_mcqquestions: attemptedQuestions,
      mcq_answers: mcqAnswers,
      total_marks: totalmarks,
      status: "completed",
      timetaken: timeTakenInMinutes,
    };
    try {
      const result = await toast.promise(axios.post("/add", data), {
        pending: "completed Exam...",
        success: "Exam completed Successfully!",
        error: "Failed to complete Exam. Please try again.",
      });
      console.log(result, "result data");
      if (result.status === 200) {
        const contest = Cookies.get("contestid");
        const score = result?.data?.savedExam?.result;
        const exam = result?.data?.savedExam?.exam_id;
        const userId = Cookies.get("_id");
        const data = { contest, score, exam, userId };
        console.log(data, "data in contest ");
        const response = await axios.post("/contest_participant", data);
      }
      if (Userdata.walllet !== null) {
        const updatedcredit = Userdata?.wallet?.token - credit;
        await axios.put(`/wallet/${Userdata.wallet?._id}`, {
          token: updatedcredit,
        });
        const data = {
          user: _id,
          walletType: Userdata.wallet?.walletType,
          wallet: Userdata.wallet?._id,
          Transcation_history: `Debit ${credit} credit from wallet for ${examName} exam`,
        };
        const transction = await axios.post("/transcation", data);
        console.log(transction, "transction");
      }
      navigate("/userDasboard/history");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error, "error");
    }
  };

  const handleCheckboxChange = (questionId, optionNumber, isChecked) => {
    setSelectedAnswers((prevState) => {
      let updatedValueArray = prevState[questionId]
        .split(",")
        .filter((val) => val);

      if (isChecked) {
        updatedValueArray.push(optionNumber);
      } else {
        updatedValueArray = updatedValueArray.filter(
          (val) => val !== optionNumber
        );
      }

      const updatedValue = updatedValueArray.sort().join(",");

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
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  const { scrollYProgress } = useScroll();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <motion.div
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          height: 4,
          backgroundColor: "#3f51b5",
          transformOrigin: "0%",
          zIndex: 1000,
          scaleX: scrollYProgress,
        }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the alpha value as needed (0.8 is 80% opaque)
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            color: constant.backgroundColor,
            height: "auto",
            width: "auto",
          }}
        >
          {timeLeft !== null && (
            <Typography variant="h6" gutterBottom>
              Time Left: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </Typography>
          )}
        </div>

        <Paper sx={paperStyle} className="responsive-container">
          {isLoading ? <CustomeLoader /> : null}
          <Typography variant="h5" gutterBottom sx={{ color: "#010080" }}>
            ExamName :: {examName.toUpperCase()}
          </Typography>
          <Grid container spacing={2}>
            {questions.map((question, qIndex) => (
              <Grid item xs={12} key={question._id}>
                <Paper sx={paperStyle2} className="responsive-container">
                  <Typography variant="h6" gutterBottom>
                    {`Q${qIndex + 1}. `}
                    <div
                      dangerouslySetInnerHTML={{ __html: question.question }}
                    />
                  </Typography>
                </Paper>
                <FormControl component="fieldset">
                  {question.isMultiselectedQuestion ? (
                    <FormGroup>
                      {Object.keys(question).map((key) => {
                        if (key.startsWith("Option")) {
                          const optionNumber = key.replace("Option", "");
                          return (
                            <FormControlLabel
                              key={optionNumber}
                              control={
                                <Checkbox
                                  checked={selectedAnswers[
                                    question._id
                                  ].includes(optionNumber)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      question._id,
                                      optionNumber,
                                      e.target.checked
                                    )
                                  }
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
                      onChange={(e) =>
                        handleAnswerChange(question._id, e.target.value)
                      }
                    >
                      {Object.keys(question).map((key) => {
                        if (key.startsWith("Option")) {
                          const optionNumber = key.replace("Option", "");
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit Answers
          </Button>
          <ToastContainer />
        </Paper>
        <Dialog open={openDialog} onClose={handleDialogClose}>
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
    </ThemeProvider>
  );
};

export default MCQQuestionsPage;
