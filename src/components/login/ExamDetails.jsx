import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ListIcon from '@mui/icons-material/List';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  createTheme,
  ThemeProvider,
  GlobalStyles,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { constant } from "../../constant";
import { DataGrid } from "@mui/x-data-grid";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { set } from "lodash";
import { PieComponent } from "../charts/PieComponent";

export const ExamDetails = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [initiallySelectedQuestions, setInitiallySelectedQuestions] = useState(
    []
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openStudentList, setopenStudentList] = useState(false);

  const navigate = useNavigate();
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
    setQuestions(response.data);
  };

  const [students, setstudents] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const fetchStudentDetailByExamId = async () => {
    setisLoading(true);
    const response = await axios.get(`/studentByExamId/${id}`);
    console.log(response.data, "response");
    setstudents(response.data);
    setopenStudentList(true);
    setisLoading(false);
  };
  const [displayChart, setdisplayChart] = useState(false);
  const displayChartOfstudents = () => {
    setdisplayChart(true);
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
    const role = Cookies.get("role");
    let dashboardPath = "";

    switch (role) {
      case "faculty":
        dashboardPath = "facultyDashboard";
        break;
      case "superAdmin":
        dashboardPath = "adminDashboard";
        break;
      default:
        dashboardPath = "dashboard"; // Fallback path
    }

    navigate(`/${dashboardPath}/viewexam/${id}`, {
      state: { subject, stream, difficulty, standard, topic, type },
    });
  };

  const GlobalScrollbarStyles = ({ backgroundColor }) => (
    <GlobalStyles
      styles={{
        "*::-webkit-scrollbar": {
          width: "10px",
          height: "4px",
        },
        "*::-webkit-scrollbar-track": {
          background: "white",
        },
        "*::-webkit-scrollbar-thumb": {
          background: backgroundColor,
          borderRadius: "4px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: backgroundColor,
        },
      }}
    />
  );

  const handleEdit = (id) => {
    const role = Cookies.get("role");
    let dashboardPath = "";

    switch (role) {
      case "faculty":
        dashboardPath = "facultyDashboard";
        break;
      case "superAdmin":
        dashboardPath = "adminDashboard";
        break;
      default:
        dashboardPath = "dashboard"; // Fallback path
    }

    navigate(`/${dashboardPath}/update-exam/${id}`);
  };
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const confirmDelete = () => {
    handleDelete(id);
    handleCloseDeleteDialog();
  };
  const handleDelete = async (id) => {
    try {
      const response = await toast.promise(axios.put(`/delete/${id}`), {
        pending: "Deleting Exam...",
        success: "Exam Deleted Successfully!",
        error: "Failed to delete Exam. Please try again.",
      });
      if (response.status === 200) {
        navigate("/adminDashboard/subjectlist");
      }
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

      const currentQuestionCount = existingExam.mcq.length;
      const additionalQuestionsNeeded = noOfQuestions - currentQuestionCount;

      if (additionalQuestionsNeeded <= 0) {
        toast.info("Sufficient questions already available.");
        return;
      }

      const filteredQuestions = allQuestions.filter(
        (question) =>
          question.Topic._id === topicId && question.difficulty === difficultyId
      );

      if (filteredQuestions.length < additionalQuestionsNeeded) {
        toast.error("Insufficient questions available for this topic.");
        return;
      }

      const shuffledQuestions = filteredQuestions.sort(
        () => 0.5 - Math.random()
      );
      const newQuestions = shuffledQuestions.slice(
        0,
        additionalQuestionsNeeded
      );

      const updatedQuestions = [...newQuestions];

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
    const role = Cookies.get("role");
    let dashboardPath = "";

    switch (role) {
      case "faculty":
        dashboardPath = "facultyDashboard";
        break;
      case "superAdmin":
        dashboardPath = "adminDashboard";
        break;
      default:
        dashboardPath = "dashboard"; // Fallback path
    }

    if (type === "mcq") {
      navigate(`/${dashboardPath}/mcqquestion/${id}`, {
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
      navigate(`/${dashboardPath}`);
    }
  };

  const handleOpenDialog = async () => {
    try {
      const existingExamResponse = await axios.get(`/exam/${id}`);
      const existingQuestions = existingExamResponse.data.mcq;
      setSelectedQuestions(existingQuestions);
      setInitiallySelectedQuestions(existingQuestions);

      const filteredQuestions = allQuestions.filter(
        (question) => question.Subject._id === questions.subject?._id
      );
      setFilteredQuestions(filteredQuestions);
      setOpenDialog(true);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleToggleQuestion = (question) => {
    if (!initiallySelectedQuestions.some((q) => q._id === question._id)) {
      const currentIndex = selectedQuestions.findIndex(
        (q) => q._id === question._id
      );
      const newSelectedQuestions = [...selectedQuestions];

      if (currentIndex === -1) {
        newSelectedQuestions.push(question);
      } else {
        newSelectedQuestions.splice(currentIndex, 1);
      }

      setSelectedQuestions(newSelectedQuestions);
    }
  };
  const handleSaveQuestions = async (noOfQuestions) => {
    try {
      const existingExamResponse = await axios.get(`/exam/${id}`);
      const existingExam = existingExamResponse.data;

      const currentQuestionCount = existingExam.mcq.length;
      const additionalQuestionsNeeded = noOfQuestions - currentQuestionCount;

      if (additionalQuestionsNeeded <= 0) {
        toast.info("Sufficient questions already available.");
        return;
      }
      const updatedQuestions = selectedQuestions.filter(
        (question) =>
          !initiallySelectedQuestions.some((q) => q._id === question._id)
      );

      const updateQuestionResponse = await axios.put(`/mcq/${id}`, {
        mcq: updatedQuestions,
      });
      console.log(updateQuestionResponse, "update question response");

      setOpenDialog(false);
      toast.success("Questions selected successfully!");
    } catch (error) {
      console.log(error, "error");
      toast.error("Failed to save selected questions. Please try again.");
    }
  };

  const boxProp = {
    bgcolor: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    margin: "5px",
    flex: 1,
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "marks", headerName: "Obtain Marks", width: 150 },
    { field: "exam_date", headerName: "Exam Date", width: 200 },
  ];
  const rows = students.map((student) => ({
    id: student._id,
    name: `${student.user_id.firstname} ${student.user_id.lastname}`,
    email: student.user_id.email,
    marks: student.result,
    exam_date: new Date(student.createdAt).toLocaleDateString(),
  }));
  const typoProps = {color:constant.backgroundColor,fontWeight:"bold"};
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container spacing={2}>
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
              <Box sx={boxProp}>
                <Typography variant="h6" sx ={typoProps}>Name: {questions.name}</Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6" sx={typoProps}>
                  Standard: {questions.std?.std}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6" sx={typoProps}>
                  Stream: {questions.stream?.name}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                 <Typography variant="h6" sx= {typoProps}>
                  Subject: {questions.subject?.name}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6"  sx= {typoProps}>
                  Topic: {questions.examtopic?.name}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6"  sx= {typoProps}>
                  Exam Time: {questions?.examtime || 0}
                </Typography>
              </Box>
            </Box>
            {/* Second line: Type, No Of Question, Difficulty, Per Question marks, Total marks, Credits */}
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={boxProp}>
                <Typography variant="h6"  sx= {typoProps}>
                  Type: {questions?.examtype?.type}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6"  sx= {typoProps}>
                  No Of Question: {questions?.noofquestions}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6"  sx= {typoProps}>
                  Difficulty: {questions?.difficulty?.difficulty}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6"  sx= {typoProps}>
                  Per Question marks: {questions?.perQuestionmarks}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6"  sx= {typoProps}>
                  Total marks: {questions?.totalmarks}
                </Typography>
              </Box>
              <Box sx={boxProp}>
                <Typography variant="h6"  sx= {typoProps}>
                  Credits: {questions?.credit || "N/A"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Button
            startIcon={<PreviewIcon />}
              variant="contained"
              color="primary"
              onClick={() =>
                handleView(
                  id,
                  questions.subject?.name,
                  questions.stream?.name,
                  questions.difficulty?.difficulty,
                  questions.std?.std,
                  questions.examtopic?.name,
                  questions.examtype?.type
                )
              }
            >
              View Exam
            </Button>
            <Button
            startIcon={<EditIcon />}
              variant="contained"
              color="primary"
              onClick={() => handleEdit(id)}
            >
              Edit Exam
            </Button>
           
            <Button
            startIcon={<DonutLargeIcon />}
              variant="contained"
              color="primary"
              onClick={() =>
                handleGenerateQuestions(
                  questions.examtopic?._id,
                  questions.noofquestions,
                  id,
                  questions.difficulty?._id
                )
              }
            >
              Generate Questions
            </Button>
            <Button
            startIcon={<AddIcon />}
              variant="contained"
              color="primary"
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
            <Button
            startIcon={<PlaylistAddCheckIcon />}
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Select Questions
            </Button>
            <Button
            startIcon={<ListIcon />}
              variant="contained"
              color="primary"
              onClick={fetchStudentDetailByExamId}
            >
              Student List
            </Button>
            <Button
            startIcon={<AutoDeleteIcon />}
              variant="contained"
              color="error"
              onClick={handleOpenDeleteDialog}
            >
              Delete Exam
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={displayChartOfstudents}
              disabled
            >
              Statastics [Coming Soon]
            </Button>
          </Box>
        </Grid>
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="select-questions-dialog-title"
        >
          <DialogTitle id="select-questions-dialog-title">
            Select Questions
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <List>
              {filteredQuestions.map((question) => (
                <ListItem
                  key={question._id}
                  button
                  onClick={() => handleToggleQuestion(question)}
                >
                  <ListItemText
                    primary={
                      <span
                        dangerouslySetInnerHTML={{ __html: question.question }}
                      />
                    }
                  />{" "}
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={() => handleToggleQuestion(question)}
                      disabled={initiallySelectedQuestions.some(
                        (selected) => selected._id === question._id
                      )}
                      checked={selectedQuestions.some(
                        (selected) => selected._id === question._id
                      )}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => handleSaveQuestions(questions.noofquestions)}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>
            Confirm Deletion
            <IconButton
              aria-label="close"
              onClick={handleCloseDeleteDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this exam?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
      </Grid>
      <>
        <GlobalScrollbarStyles backgroundColor={constant.backgroundColor} />
        {openStudentList && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setopenStudentList(false)}
              sx={{ mb: 2, mt: 2, alignSelf: "center" }}
            >
              Close Table
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center the content horizontally
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: constant.backgroundColor,
                  mt: 2,
                  textAlign: "center", // Center the text
                }}
              >
                Students Already given exam ::
              </Typography>
              <Box
                sx={{
                  height: { xs: 300, sm: 400 }, // Adjust height for mobile screens
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "80%" }, // Limit max width on larger screens
                  overflowX: "auto", // Enable horizontal scrolling if needed
                }}
              >
                <DataGrid
                  sx={{
                    color: constant.backgroundColor,
                    "& .MuiDataGrid-root": {
                      fontSize: { xs: "0.75rem", sm: "1rem" }, // Adjust font size for smaller screens
                    },
                  }}
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                />
              </Box>
            </Box>
          </Grid>
        )}
      </>

      {displayChart && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setdisplayChart(false)}
            sx={{ mb: 2, mt: 2, alignSelf: "center" }}
          >
            Close Chart
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ height: 200, width: "100%" }}>
              <PieComponent chartType="pie" data={students} />
            </Box>
          </Box>
        </Grid>
      )}
    </ThemeProvider>
  );
};
