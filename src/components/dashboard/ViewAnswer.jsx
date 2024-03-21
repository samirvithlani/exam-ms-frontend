import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
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
 

  return (
    <div>
      {mcqAnswers.map((answer, index) => (
        <Accordion
          key={index}
          
        >
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
                <Accordion key={mcqIndex}
                style={{
                  backgroundColor: mcqAnswer.givenanswer === mcqAnswer.question.correctOption ? 'lightgreen' : 'lightcoral'
                }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`option${mcqIndex}-content`}
                    id={`option${mcqIndex}-header`}
                    
                  >
                    <Typography>{mcqAnswer.question.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {Object.keys(mcqAnswer.question).map((key) => {
                        if (key.startsWith('Option')) {
                          return (
                            <li
                              key={key}
                              style={{
                                color: mcqAnswer.givenanswer === mcqAnswer.question.correctOption ? 'green' : 'red'
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
    </div>
  );
};
