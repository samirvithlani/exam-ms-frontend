import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Add,
  DeleteOutline,
  Edit,
  PlusOneOutlined,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  createTheme,
  CssBaseline,
  IconButton,
  Paper,
  Tooltip,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import "../../assets/layouts/layout.module.css";
import { set } from "react-hook-form";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";
import { useDemoData } from "@mui/x-data-grid-generator";
const userRole = Cookies.get("role");
const isSuperAdmin = userRole === "superAdmin";

const columns = [
  { field: "displayid", headerName: "ID", width: 90 },
  { field: "name", headerName: "Exam Name", width: 200 },
  { field: "examType", headerName: "Exam Type", width: 70 },
  { field: "examTopic", headerName: "Exam Topic", width: 250 },
  { field: "Subject", headerName: "Subject", width: 150 },
  { field: "Stream", headerName: "Stream", width: 100 },
  { field: "Standard", headerName: "Standard", width: 100 },
  { field: "Difficulty", headerName: "Difficulty", width: 100 },
  { field: "noOfQuestions", headerName: "No. of Questions", width: 70 },
  { field: "isTimeLimit", headerName: "Time-Limited", width: 70 },
  { field: "examTime", headerName: "Exam Time (in hours)", width: 70 },
  { field: "totalmarks", headerName: "Total Marks", width: 70 },
  { field: "actions", headerName: "Actions", width: 360 },
];

const ExamList = () => {
  const theme = useTheme();

  const [isLoading, setisLoading] = useState(false);
  const [examData, setExamData] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });
  const fetchallquestion = async () => {
    try {
      const response = await axios.get("/mcq");
      setAllQuestions(response.data);
    } catch (error) {
      console.log("error ", error);
    }
  };
  useEffect(() => {
    fetchallquestion();
  }, []);
  const navigate = useNavigate();
  const fetchData = async () => {
    setisLoading(true);
    axios
      .get("/Exam")
      .then((response) => {
        const filteredData = response.data.map((exam, index) => ({
          displayid: index + 1,
          name: exam.name.toUpperCase(),
          examType: exam.examtype?.type.toUpperCase() || "N/A",
          examTopic: exam.examtopic?.name || "N/A",
          Subject: exam.subject?.name || "N/A",
          Stream: exam.stream ? exam.stream.name : "NA",
          Standard: exam.std ? exam.std.std : "NA",
          Difficulty: exam.difficulty ? exam.difficulty.difficulty : "NA",
          noOfQuestions: exam.noofquestions || 0,
          isNegative: exam.isNegative,
          isTimeLimit: exam.isTimeLimit ? "Yes" : "No",
          examTime: exam.examtime || 0,
          perQuestionTime: exam.perQuestiontime || 0,
          totalmarks: exam.totalmarks,
          id: exam._id,
          topicId: exam.examtopic?._id || "N/A",
          difficultyId: exam.difficulty ? exam.difficulty._id : "NA",
          subjectId: exam.subject?._id || "NA",
          streamId: exam.stream?._id || "NA",
          standardId: exam.std ? exam.std._id : "NA",
          typeId: exam.examtype?._id || "N/A",
        }));
        setExamData(filteredData);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/adminDashboard/update-exam/${id}`);
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

  const handleDelete = async (id) => {
    try {
      await toast.promise(axios.delete(`/exam/${id}`), {
        pending: "Deleting Exam...",
        success: "Exam Deleted Successfully!",
        error: "Failed to create Exam. Please try again.",
      });
      setExamData((prevData) => prevData.filter((exam) => exam.id !== id));
      fetchData();
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
        (question) =>
          question.Topic._id === topicId && question.difficulty === difficultyId
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
      console.error("Error generating questions:", error);
      toast.error("Failed to generate questions. Please try again.");
    }
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
  const defaultTheme = createTheme({
    fontFamily: "Lato",
  });
  const paperStyle = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
    m1: 2,
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading ? <CustomeLoader /> : null}
      <Paper sx={paperStyle} className="responsive-container">
        
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Lato" }}
        >
          Exam List
        </Typography>
        <Grid
          container
          item
          xs={12}
          sx={{
            width: isMobile ? "60vw" : "94%",
            height: isMobile ? "50%" : "100%",
            overflowX: "auto",
          }}
        >
          <DataGrid
            sx={{
              border: "none",
              fontFamily: "Lato",
              
            }}
            rows={examData}
            columns={columns.map((column) => ({
              ...column,
              renderCell: (params) => {
                if (column.field === "actions") {
                  return (
                    <div className="responsive-container">
                      <Tooltip title="View Exam" arrow>
                        <IconButton
                          aria-label="view"
                          onClick={() =>
                            handleView(
                              params.row.id,
                              params.row.Subject,
                              params.row.Stream,
                              params.row.Difficulty,
                              params.row.Standard,
                              params.row.examTopic,
                              params.row.examType
                            )
                          }
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Questions" arrow>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(params.row.id)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Questions" arrow>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(params.row.id)}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add Questions" arrow>
                        <IconButton
                          aria-label="add"
                          onClick={() =>
                            handleAddQuestions(
                              "mcq",
                              params.row.id,
                              params.row.Subject,
                              params.row.Stream,
                              params.row.Difficulty,
                              params.row.Standard,
                              params.row.subjectId,
                              params.row.streamId,
                              params.row.topicId,
                              params.row.difficultyId,
                              params.row.standardId,
                              params.row.examTopic,
                              params.row.examType,
                              params.row.typeId,
                              params.row.noOfQuestions
                            )
                          }
                          color="primary"
                        >
                          <Add />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Generate Questions" arrow>
                        <IconButton
                          aria-label="add"
                          onClick={() =>
                            handleGenerateQuestions(
                              params.row.topicId,
                              params.row.noOfQuestions,
                              params.row.id,
                              params.row.difficultyId
                            )
                          }
                          color="primary"
                        >
                          <Add />
                        </IconButton>
                      </Tooltip>
                    </div>
                  );
                }
                return (
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      fontFamily: "Lato",
                    }}
                  >
                    {params.value}
                  </div>
                );
              },
            }))}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            rowHeight={80}
          />
          <ToastContainer />
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default ExamList;
