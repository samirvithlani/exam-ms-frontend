import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Typography,
  ListItemText
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

export const ExamDetails = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);

 const navigate = useNavigate()
  const { id } = useParams();
  useEffect(() => {
    fetchexams();
    fetchallquestion();
  }, [id]);
  const fetchallquestion = async () => {
    try {
      const response = await axios.get("/mcq");
      setAllQuestions(response.data);
    } catch (error) {
      console.log("error ", error);
    }
  };
  const fetchexams = async () => {
    const response = await axios.get(`/exam/${id}`);
    console.log(response);
    setQuestions(response.data);

  };
  
  const handleView = (
    id,
    subject,
    stream,
    difficulty,
    standard,
    topic,
    type
  ) => {
    navigate(`/adminDashboard/viewexam/${id}`, {
      state: { subject, stream, difficulty, standard, topic, type },
    });
  };

  const handleEdit = (id) => {
    navigate(`/adminDashboard/update-exam/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await toast.promise(axios.delete(`/exam/${id}`), {
        pending: "Deleting Exam...",
        success: "Exam Deleted Successfully!",
        error: "Failed to create Exam. Please try again.",
      });
    } catch (error) {
      console.log("Error while deleting exam:", error);
    }
  };
  
  const handleGenerateQuestions = async (
    topicId,
    noOfQuestions,
    id,
    difficultyId
  ) => {

    
    try {
      const existingExamResponse = await axios.get(`/exam/${id}`);
      const existingExam = existingExamResponse.data;
  
      // Check how many more questions are needed
      const currentQuestionCount = existingExam.mcq.length;
      const additionalQuestionsNeeded = noOfQuestions - currentQuestionCount;
  
      if (additionalQuestionsNeeded <= 0) {
        toast.info("Sufficient questions already available.");
        return;
      }
  
      const filteredQuestions = allQuestions.filter(
              (question) =>{
                
               return question.Topic._id === topicId && question.difficulty === difficultyId
              }
            
      );
  
      if (filteredQuestions.length < additionalQuestionsNeeded) {
        toast.error("Insufficient questions available for this topic.");
        return;
      }
  
      const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
      const newQuestions = shuffledQuestions.slice(0, additionalQuestionsNeeded);
  
      const updatedQuestions = [ ...newQuestions];
  
      const updateQuestionResponse = await axios.put(`/mcq/${id}`, {
        mcq: updatedQuestions,
      });
      console.log(updateQuestionResponse, "update question response");
      toast.success("Questions generated successfully!");
    } catch (error) {
      console.log(error);
      console.error("Error generating questions:", error);
      toast.error("Failed to generate questions. Please try again.");
    }
  };
  
  const handleAddQuestions = async (
    type,
    id,
    subject,
    stream,
    difficulty,
    standard,
    subjectId,
    streamId,
    topicId,
    difficultyId,
    standardId,
    topic,
    types,
    typeId,
    noOfQuestions
  ) => {
    let data = await axios.get(`/exam/${id}`);
    if (data.data.mcq.length === noOfQuestions) {
      return alert("Question limit reached. Cannot add more questions.");
    }
    if (type === "mcq") {
      navigate(`/adminDashboard/mcqquestion/${id}`, {
        state: {
          subject,
          stream,
          difficulty,
          standard,
          subjectId,
          streamId,
          topicId,
          difficultyId,
          standardId,
          topic,
          types,
          typeId,
          noOfQuestions,
        },
      });
    } else {
      navigate("/adminDashboard");
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          EXAM DETAILS
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* First line: Name, Standard, Stream, Subject, Topic */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Name: {questions.name}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Standard: {questions.std?.std}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Stream: {questions.stream?.name}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Subject: {questions.subject?.name}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Topic: {questions.examtopic?.name}</Typography>
            </Box>
          </Box>
          {/* Second line: Type, No Of Question, Difficulty, Per Question marks, Total marks, Credits */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Type: {questions?.examtype?.type}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">No Of Question: {questions?.noofquestions}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Difficulty: {questions?.difficulty?.difficulty}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Per Question marks: {questions?.perQuestionmarks}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Total marks: {questions?.totalmarks}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                margin: '5px',
                flex: 1,
              }}
            >
              <Typography variant="h6">Credits: {questions?.credit || 'N/A'}</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {/* Action buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleView(
            id,
            questions.subject?.name,
            questions.stream?.name,
            questions.difficulty?.difficulty,
            questions.std?.std,
            questions.examtopic?.name,
            questions.examtype?.type
          )}>
            View Exam
          </Button>
          <Button variant="contained" color="secondary" sx={{ mr: 1 }} onClick={() => handleEdit(id)}>
            Edit Exam
          </Button>
          <Button variant="contained" color="error" sx={{ mr: 1 }} onClick={() => handleDelete(id)}>
            Delete Exam
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleGenerateQuestions(
            questions.examtopic?._id,
            questions.noofquestions,
            id,
            questions.difficulty?._id
          )}>
            Generate Questions
          </Button>
          <Button variant="contained" color="primary" 
          onClick={() =>
            handleAddQuestions(
              "mcq",
              id,
              questions?.subject?.name,
              questions?.stream?.name,
              questions?.difficulty?.difficulty,
              questions?.std?.std,
              questions?.subject?._id,
              questions?.stream?._id,
              questions.examtopic?._id,
              questions.difficulty?._id,
              questions?.std?._id,
              questions?.examtopic?.name,
              questions?.examtype?.type,
              questions?.examtype?._id,
              questions.noOfQuestions
            )
          }
          >
          Add Questions
          </Button>
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
  
};
