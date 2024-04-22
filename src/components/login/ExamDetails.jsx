import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Typography,
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
    console.log("call","call");
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
      const filteredQuestions = allQuestions.filter(
        (question) =>{
          
         return question.Topic._id === topicId && question.difficulty === difficultyId
        }
      );
      if (filteredQuestions.length < noOfQuestions) {
        toast.error("Insufficient questions available for this topic.");
        return;
      }
      const shuffledQuestions = filteredQuestions.sort(
        () => 0.5 - Math.random()
      );
      const mcq = shuffledQuestions.slice(0, noOfQuestions);
      const updateQuestionResponse = await axios.put(`/mcq/${id}`, {
        mcq,
      });
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
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
          EXAM DETAIL
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
          <Typography variant="h6">Name: {questions?.name}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Standard: {questions?.std?.std}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Stream: {questions?.stream?.name}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Subject: {questions?.subject?.name}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Topic: {questions?.examtopic?.name}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Type: {questions?.examtype?.type}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Difficulty: {questions?.difficulty?.difficulty}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">No Of Question: {questions?.noofquestions}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Per Question marks: {questions?.perQuestionmarks}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Total marks: {questions?.totalmarks}</Typography>
        </Box>
        <Box sx={{ p: 2, border: "1px solid #000", borderRadius: "20px", mb: 2 }}>
        <Typography variant="h6">Credits: {questions?.credit || 'N/A'}</Typography>       
        </Box>
        
      </Grid>

      <Grid item xs={12} md={4}>
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "20px", mb: 2 }}>
          {/* Action buttons */}
          <Button variant="contained" color="primary" fullWidth 
           onClick={() => handleView(
            id,
            questions?.subject?.name,
            questions?.stream?.name,
            questions?.difficulty?.difficulty,
            questions?.std?.std,
            questions?.examtopic?.name,
            questions?.examtype?.type
          )}>
            View Exam
          </Button>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 1 }}
          onClick={()=>handleEdit(id)}>
          Edit Exam
          </Button>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}
          onClick={()=>handleDelete(id)}>
          Delete Exam
          </Button>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 1 }}
          onClick={() =>
            handleGenerateQuestions(
              questions?.examtopic?._id,
              questions?.noOfQuestions,
              id,
              questions?.difficulty?._id
            )
          }>
          Generate Questions
          </Button>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}
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
        <ToastContainer/>

      </Grid>
    </Grid>
  );
};
