import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography, ListItemText } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";
import HangingWatch from "../CustomeCopmonent/HangingWatch";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";

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
    console.log(response);
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
  };

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
              <Typography sx={TypoGraphyProps}>
                Name:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.name}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Standard:
                <span style={{ textDecoration: "underline" }}>
                  {" "}
                  {questions?.std?.std}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Stream:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.stream?.name || "N/A"}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Subject:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions.subject?.name}
                </span>
              </Typography>
              <img src={questions.subject?.image_url} alt="subject" height="20" width="20"/>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Topic:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions.examtopic?.name}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                ExamTime:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.examtime} Minutes
                </span>
              </Typography>
            </Box>
          </Box>
          {/* Second line: Type, No Of Question, Difficulty, Per Question marks, Total marks, Credits */}
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Type:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.examtype?.type}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                No Of Question:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.noofquestions}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Difficulty:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.difficulty?.difficulty}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Per Question marks:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.perQuestionmarks}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Total marks:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.totalmarks}
                </span>
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={TypoGraphyProps}>
                Credits:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {questions?.credit || "N/A"}
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {/* Action buttons */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            startIcon={<AlarmOnIcon />}
            variant="contained"
            color="secondary"
            sx={{
              mr: 1,
              backgroundColor: constant.backgroundColor,
              color: "white",
            }}
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
            Attempt now
          </Button>
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};
