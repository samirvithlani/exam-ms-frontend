import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography, ListItemText } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";

export const UserExamDetails = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetchexams();
    fetchallquestion();
    fetchuser();
  }, [id]);
  const fetchallquestion = async () => {
    setisLoading(true);
    try {
      const response = await axios.get("/mcq");
      if (response.status === 200) {
        setisLoading(false);
      }
      setAllQuestions(response.data);
    } catch (error) {
      console.log("error ", error);
      setisLoading(false);
    }
  };
  const fetchexams = async () => {
    setisLoading(true);
    const response = await axios.get(`/exam/${id}`);
    // console.log(response);
    setQuestions(response.data);
    setisLoading(true);
  };
  const fetchuser = async () => {
    setisLoading(true);
    const _id = Cookies.get("_id");
    try {
      const response = await axios.get(`/user/${_id}`);
      // console.log(response);
      setUserdata(response.data);
    } catch (error) {
      setisLoading(false);
      console.log(error, "error");
    }
    setisLoading(false);
  };
  const handleStartExam = async (
    examId,
    examtype_id,
    totalmarks,
    credit,
    name
  ) => {
    navigate(`/userDasboard/question/${examId}`, {
      state: { examtype_id, totalmarks, credit, name, userdata },
    });
  };

  const boxStyle = {
    bgcolor: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Updated boxShadow for better visibility
    cursor: "pointer",
    margin: "5px",
    flex: 1,
    height: "100px",
    
  };

  const TypoGraphyProps = {
    variant: "h6",
    color: constant.backgroundColor,
    fontWeight: "bold",
  }
  

  return (
    <Grid container spacing={2}>
      {isLoading && <CustomeLoader />}
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, color: constant.backgroundColor }}
        >
          EXAM DETAILS ::
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* First line: Name, Standard, Stream, Subject, Topic */}
          <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
            <Box sx={boxStyle}>
              <Typography sx = {TypoGraphyProps}>Name: {questions.name}</Typography>
            </Box>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                Standard: {questions.std?.std}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                Stream: {questions.stream?.name}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                Subject: {questions.subject?.name}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                Topic: {questions.examtopic?.name}
              </Typography>
            </Box>
          </Box>
          {/* Second line: Type, No Of Question, Difficulty, Per Question marks, Total marks, Credits */}
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                Type: {questions?.examtype?.type}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                No Of Question: {questions?.noofquestions}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                Difficulty: {questions?.difficulty?.difficulty}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                Per Question marks: {questions?.perQuestionmarks}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
            <Typography sx = {TypoGraphyProps}>
                Total marks: {questions?.totalmarks}
              </Typography>
            </Box>
            <Box
             sx={boxStyle}
            >
              <Typography sx = {TypoGraphyProps}>
                Credits: {questions?.credit || "N/A"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {/* Action buttons */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mr: 1 ,backgroundColor: constant.backgroundColor, color: "white"}}
            onClick={() =>
              handleStartExam(
                questions?._id,
                questions.examtype?._id,
                questions.totalmarks,
                questions?.credit,
                questions?.name
              )
            }
          >
            Start Exam
          </Button>
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};
