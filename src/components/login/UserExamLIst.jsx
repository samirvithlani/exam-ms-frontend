import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";

export const UserExamList = () => {
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [standards, setStandards] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const _id = Cookies.get("_id");

  useEffect(() => {
    fetchSubjects();
    fetchDifficulties();
    fetchStandards();
    fetchHistory();
    fetchExams();
  }, [id, selectedSubject, selectedDifficulty, selectedStandard]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("/subject");
      setSubjects(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchDifficulties = async () => {
    try {
      const response = await axios.get("/difficulty");
      setDifficulties(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchStandards = async () => {
    try {
      const response = await axios.get("/getstd");
      setStandards(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`/userhistory/${_id}`);
      const data = response.data.map((item) => item?.exam_id?._id);
      setUserHistory(data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchExams = async () => {
    try {
      let url = "/getExambyFilter?";
      if (selectedStandard) url += `std=${selectedStandard}&`;
      if (selectedSubject) url += `subject=${selectedSubject}&`;
      if (selectedDifficulty) url += `difficulty=${selectedDifficulty}&`;
      setIsLoading(true);
      const response = await axios.get(url);
      if (response?.status === 200) {
        setIsLoading(false);
      }
      const sortedExams = response.data.data.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
      setExams(sortedExams);
    } catch (error) {
      console.log(error, "error");
    }
  };
  

  const handleClick = (subjectID) => {
    navigate(`/userDasboard/examdetails/${subjectID}`);
  };

  const filterExamsByHistory = () => {
    return exams.filter((exam) => !userHistory.includes(exam._id));
  };

  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const resetFilter = async () => {
    setSelectedStandard("");
    setSelectedSubject("");
    setSelectedDifficulty("");
    const response = await axios.get("/getExambyFilter");
    console.log("data...", response.data.data);
    setExams(response.data.data);
  };

  const filteredExams = filterExamsByHistory();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: constant.backgroundColor }}
        >
          Recently Added Exam
        </Typography>

        <Grid container spacing={2} sx={{ padding: "20px" }}>
          {isLoading && <CustomeLoader />}
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" gap={2} marginBottom="20px">
              <Box flexBasis="200px" flexGrow={1}>
                <select
                  value={selectedStandard}
                  onChange={(e) => setSelectedStandard(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Select Standard</option>
                  {standards.map((standard) => (
                    <option key={standard._id} value={standard._id}>
                      {standard.std}
                    </option>
                  ))}
                </select>
              </Box>
              <Box flexBasis="200px" flexGrow={1}>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </Box>
              <Box flexBasis="200px" flexGrow={1}>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Select Difficulty</option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty._id} value={difficulty._id}>
                      {difficulty.difficulty}
                    </option>
                  ))}
                </select>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={resetFilter}
                  sx={{ height: "100%" }}
                >
                  Reset Filter
                </Button>
              </Box>
            </Box>
          </Grid>
          {filteredExams.length > 0 ? (
            filteredExams.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Box
                bgcolor="white"
                border="1px solid #ccc"
                borderRadius="10px"
                fontWeight="bold"
                height={180}
                padding="20px"
                textAlign="center"
                onClick={() => handleClick(item._id)}
                sx={{
                  cursor: "pointer",
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Avatar
                  src={item?.subject?.image_url} // replace with your image path logic
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "0 auto 10px auto",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "10px",
                    textTransform: "uppercase",
                    color: constant.backgroundColor,
                    wordWrap: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            </Grid>
            
            ))
          ) : (
            <Typography
              variant="h6"
              color="error"
              sx={{ textAlign: "center", width: "100%" }}
            >
              No Exams Found!
            </Typography>
          )}
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default UserExamList;
