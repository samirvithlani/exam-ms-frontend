import React, { useEffect, useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import QuestionList from "../CustomeCopmonent/QuestionList";

function MCQQuestion({ question, options }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {options.map((option, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${option}`} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/mcq");
      const numberedQuestions = response.data.map((question, index) => ({
        ...question,
        question: `${index + 1}. ${question.question}`,
      }));
      setQuestions(numberedQuestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Question List
      </Typography>
      {questions.map((question, index) => (
        <QuestionList
          key={index}
          question={question.question}
          type={question.type} // Assuming each question has a "type" field
          options={[
            question.Option1,
            question.Option2,
            question.Option3,
            question.Option4,
          ]}
        />
      ))}
    </div>
  );
}

export default App;
