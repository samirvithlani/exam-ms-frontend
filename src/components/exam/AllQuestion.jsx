import React, { useEffect, useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Box,
  AppBar,
  Toolbar,
  Paper,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Cookies from "js-cookie";
import QuestionList from "../CustomeCopmonent/QuestionList"; // Ensure this component is correctly imported

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
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const userId = Cookies.get("_id");
  const role = Cookies.get("role");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/facultysubject/${userId}`);
      const subjects = response?.data?.[0]?.subject || [];
      setUserSubjects(subjects.map((subject) => subject._id));
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
      setFilteredQuestions(numberedQuestions);
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

  useEffect(() => {
    const filtered = questions.filter((question) => {
      const matchesSubject = selectedSubject
        ? question.Subject._id === selectedSubject
        : true;
      const matchesStandard = selectedStandard
        ? question.standard === selectedStandard
        : true;
      const matchesDifficulty = selectedDifficulty
        ? question.difficulty === selectedDifficulty
        : true;
      const matchesTopic = selectedTopic ? question.topic === selectedTopic : true;
      const matchesQuery = question.question
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return (
        matchesSubject &&
        matchesStandard &&
        matchesDifficulty &&
        matchesTopic &&
        matchesQuery
      );
    });

    setFilteredQuestions(filtered);
  }, [
    searchQuery,
    selectedSubject,
    selectedStandard,
    selectedDifficulty,
    selectedTopic,
    questions,
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleStandardChange = (e) => {
    setSelectedStandard(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">MCQ Portal</Typography>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          All Question List
        </Typography>
        {role === "faculty" && userSubjects.length === 0 ? (
          <Typography variant="h6" color="error">
            Please contact admin to assign the subject.
          </Typography>
        ) : (
          <>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Search Questions"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                {role === "faculty" && (
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                      <InputLabel id="subject-filter-label">Filter by Subject</InputLabel>
                      <Select
                        labelId="subject-filter-label"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        label="Filter by Subject"
                      >
                        <MenuItem value="">
                          <em>All Subjects</em>
                        </MenuItem>
                        {userSubjects.map((subject) => (
                          <MenuItem key={subject} value={subject}>
                            {subject}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                    <InputLabel id="standard-filter-label">Filter by Standard</InputLabel>
                    <Select
                      labelId="standard-filter-label"
                      value={selectedStandard}
                      onChange={handleStandardChange}
                      label="Filter by Standard"
                    >
                      <MenuItem value="">
                        <em>All Standards</em>
                      </MenuItem>
                      {/* Add the standard options here */}
                      <MenuItem value="standard1">Standard 1</MenuItem>
                      <MenuItem value="standard2">Standard 2</MenuItem>
                      {/* Add more standards as needed */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                    <InputLabel id="difficulty-filter-label">Filter by Difficulty</InputLabel>
                    <Select
                      labelId="difficulty-filter-label"
                      value={selectedDifficulty}
                      onChange={handleDifficultyChange}
                      label="Filter by Difficulty"
                    >
                      <MenuItem value="">
                        <em>All Difficulty Levels</em>
                      </MenuItem>
                      <MenuItem value="easy">Easy</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                    <InputLabel id="topic-filter-label">Filter by Topic</InputLabel>
                    <Select
                      labelId="topic-filter-label"
                      value={selectedTopic}
                      onChange={handleTopicChange}
                      label="Filter by Topic"
                    >
                      <MenuItem value="">
                        <em>All Topics</em>
                      </MenuItem>
                      {/* Add the topic options here */}
                      <MenuItem value="topic1">Topic 1</MenuItem>
                      <MenuItem value="topic2">Topic 2</MenuItem>
                      {/* Add more topics as needed */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
            {filteredQuestions.map((question, index) => (
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
            ))}
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
