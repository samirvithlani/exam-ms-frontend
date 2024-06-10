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
import Cookies from "js-cookie";

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
  const [userSubjects, setUserSubjects] = useState([]);
  const userId = Cookies.get("_id");
  const role = Cookies.get("role");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/facultysubject/${userId}`);
      const subjects = response?.data?.[0]?.subject || [];
      setUserSubjects(subjects.map(subject => subject._id));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (role === "faculty") {
        await fetchUser();
      }
      await fetchData();
    };
    fetchDataAsync();
  }, [role]);

  const filteredQuestions =
    role === "faculty"
      ? questions.filter(question => userSubjects.includes(question.Subject._id))
      : questions;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Question List
      </Typography>
      {role === "faculty" && filteredQuestions.length === 0 ? (
        <Typography variant="h6" color="error">
          Please contact admin to assign the subject.
        </Typography>
      ) : (
        filteredQuestions.map((question, index) => (
          <QuestionList
            key={index}
            question={question.question}
            type={question.type}
            options={[
              question.Option1,
              question.Option2,
              question.Option3,
              question.Option4,
            ]}
          />
        ))
      )}
    </div>
  );
}

export default App;
