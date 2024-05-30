import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';

export const ViewAnswer = () => {
  const [mcqAnswers, setMcqAnswers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/answers/${id}`);
      setMcqAnswers(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const totalMCQs = mcqAnswers.length;
  const attemptedMCQs = mcqAnswers.filter((answer) => answer.mcq_answers.length > 0).length;
  const unattemptedMCQs = mcqAnswers.filter((answer) => answer.mcq_answers.length === 0).length;
  const totalMarks = mcqAnswers.reduce((acc, answer) => acc + answer.exam_id.totalmarks, 0);
  const obtainedMarks = mcqAnswers.reduce(
    (acc, answer) =>
      acc +
      answer.mcq_answers.reduce(
        (innerAcc, mcq) => innerAcc + (mcq.givenanswer === mcq.question.correctOption ? 1 : 0),
        0
      ),
    0
  );
  const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

  const boxProp ={
    fontFamily: 'Arial, sans-serif',
    height: '100px',
    bgcolor: 'white',
    border: '1px solid #ccc',
    borderRadius: 2,
    padding: 2,
    boxShadow: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      bgcolor: '#010080',
      color: 'white',
    },
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
        Exam Summary
      </Typography>
      {/* Main container box */}
      <Box sx={{ marginBottom: 4 }}>
        {/* Grid container for first row */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={boxProp}
            >
              Total MCQ: {totalMCQs}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={boxProp}
            >
              Attempted MCQ: {attemptedMCQs}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={boxProp}
            >
              Unattempted MCQ: {unattemptedMCQs}
            </Box>
          </Grid>
        </Grid>
        {/* Grid container for second row */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={boxProp}
            >
              TOTAL MARKS: {totalMarks}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={boxProp}
            >
              OBTAINED MARKS: {obtainedMarks}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={boxProp}
            >
              PERCENTAGE: {percentage.toFixed(2)}%
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Existing accordion content */}
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
        MCQ Answers
      </Typography>
      {mcqAnswers.map((answer, index) => (  
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`question${index}-content`}
            id={`question${index}-header`}
          >
            <Typography>{answer.exam_id.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {answer.mcq_answers.map((mcqAnswer, mcqIndex) => (
                <Accordion
                  key={mcqIndex}
                  style={{
                    backgroundColor:
                      mcqAnswer.givenanswer === mcqAnswer.question.correctOption
                        ? 'lightgreen'
                        : 'lightcoral',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`option${mcqIndex}-content`}
                    id={`option${mcqIndex}-header`}
                  >
                    <Typography>{`${mcqIndex + 1}. ${mcqAnswer.question.question}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {Object.keys(mcqAnswer.question).map((key) => {
                        if (key.startsWith('Option')) {
                          return (
                            <li
                              key={key}
                              style={{
                                color:
                                  mcqAnswer.givenanswer === mcqAnswer.question.correctOption ? '#008000' : '#FF0000',
                              }}
                            >
                              {mcqAnswer.givenanswer === key ? (
                                <strong>{mcqAnswer.question[key]}</strong>
                              ) : (
                                mcqAnswer.question[key]
                              )}
                              {mcqAnswer.givenanswer === key ? ' (Given Answer)' : null}
                              {mcqAnswer.question.correctOption === key ? ' (Correct Answer)' : null}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                    <Typography>Given Answer: {mcqAnswer.givenanswer}</Typography>
                    <Typography>Correct Answer: {mcqAnswer.question.correctOption}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ViewAnswer;
