import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { constant } from "../../constant";
import { CustomeLoader } from "../Layouts/CustomeLoader";

export const ViewAnswer = () => {
  const [mcqAnswers, setMcqAnswers] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setisLoading(true)
    try {
      const response = await axios.get(`/answers/${id}`);
      console.log("response", response);
      setMcqAnswers(response.data);
      setisLoading(false)
    } catch (error) {
      console.log("Error", error);
      setisLoading(false)
    }
  };

  const totalMCQs = mcqAnswers[0]?.mcq_answers?.length || 0;
  // const attemptedMCQs = mcqAnswers.filter(
  //   (answer) => answer.mcq_answers.length > 0
  // ).length;
  const attemptedMCQs = mcqAnswers[0]?.attempt_mcqquestions?.length || 0;
  const unattemptedMCQs = mcqAnswers.filter(
    (answer) => answer.mcq_answers.length === 0
  ).length;
  const totalMarks = mcqAnswers[0]?.total_marks || 0;
  const obtainedMarks = mcqAnswers[0]?.result;
  const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;
  const givenExamDate = mcqAnswers[0]?.createdAt || new Date();

  const boxProp = {
    fontFamily: "Arial, sans-serif",
    height: "100px",
    bgcolor: "white",
    border: "1px solid #ccc",
    borderRadius: 2,
    padding: 2,
    boxShadow: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      color: "white",
      cursor: "pointer",
    },
  };
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });

  const HtmlContent = ({ content }) => (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
  return (
    <ThemeProvider theme={defaultTheme}>
      {
        isLoading && <CustomeLoader />
      }
      <Box sx={{ padding: 2 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 1, color: constant.backgroundColor }}
        >
          Exam Summary ::
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: constant.backgroundColor }}
        >
          Student Name:: {mcqAnswers[0]?.user_id?.firstname}{" "}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: constant.backgroundColor }}
        >
          Exam Given Date :: {new Date(givenExamDate).toDateString()}
        </Typography>
        {/* Main container box */}
        <Box sx={{ marginBottom: 4 }}>
          {/* Grid container for first row */}
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ ...boxProp }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: constant.backgroundColor,
                  }}
                >
                  Total MCQs: {totalMCQs}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={boxProp}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: constant.backgroundColor,
                  }}
                >
                  Attempted MCQ: {attemptedMCQs}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={boxProp}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: constant.backgroundColor,
                  }}
                >
                  Unattempted MCQ: {unattemptedMCQs}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {/* Grid container for second row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={boxProp}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: constant.backgroundColor,
                  }}
                >
                  TOTAL MARKS: {totalMarks}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={boxProp}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: constant.backgroundColor,
                  }}
                >
                  OBTAINED MARKS: {obtainedMarks}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={boxProp}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: constant.backgroundColor,
                  }}
                >
                  PERCENTAGE: {percentage.toFixed(2)}%
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Existing accordion content */}
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 2, color: constant.backgroundColor }}
        >
          Attempted Questions ::
        </Typography>
        {mcqAnswers.map((answer, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`question${index}-content`}
              id={`question${index}-header`}
            >
              <Typography>{answer?.exam_id.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {answer.mcq_answers?.map((mcqAnswer, mcqIndex) => (
                  <Accordion
                    key={mcqIndex}
                    style={{
                      backgroundColor:
                        mcqAnswer.givenanswer ===
                        mcqAnswer.question?.correctOption
                          ? "lightgreen"
                          : "lightcoral",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`option${mcqIndex}-content`}
                      id={`option${mcqIndex}-header`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: mcqAnswer?.question?.question,
                        }}
                      />
                      {/*  */}
                      {/* <Typography>{`${mcqIndex + 1}. ${mcqAnswer.question.question}`}</Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {Object.keys(mcqAnswer.question)?.map((key) => {
                          if (key.startsWith("Option")) {
                            return (
                              <li
                                key={key}
                                style={{
                                  color:
                                    mcqAnswer.givenanswer ===
                                    mcqAnswer.question.correctOption
                                      ? "#008000"
                                      : "#FF0000",
                                }}
                              >
                                {mcqAnswer.givenanswer === key ? (
                                  <strong
                                    dangerouslySetInnerHTML={{
                                      __html: mcqAnswer?.question[key],
                                    }}
                                  />
                                ) : (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: mcqAnswer?.question[key],
                                    }}
                                  />
                                )}

                                {mcqAnswer.givenanswer === key
                                  ? " (Given Answer)"
                                  : null}
                                {mcqAnswer.question?.correctOption === key
                                  ? " (Correct Answer)"
                                  : null}
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                      <Typography>
                        Given Answer: {mcqAnswer?.givenanswer}
                      </Typography>
                      <Typography>
                        Correct Answer: {mcqAnswer?.question?.correctOption}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default ViewAnswer;
