import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
export const CreateExam = () => {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [standards, setstandards] = useState([]);
  const [SelectedStandards, setSelectedStandards] = useState("");
  const [std, setstd] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [isTimeLimit, setIsTimeLimit] = useState("");
  const [difficultes, setdefficulties] = useState([]);
  const [selecteddiificulty, setselecteddefficultie] = useState("");
  const [question, setquestion] = useState("");
  const [Perquestionmark, setPerquestionmarks] = useState("");
  const [totalMarks, settotalmarks] = useState("");
  const validationSchema = {
    Name: {
      required: {
        value: true,
        message: "Name is required.",
      },
    },
    noofQuestion: {
      required: {
        value: true,
        message: "noofQuestion is required.",
      },
    },
    totalmarks: {
      required: {
        value: true,
        message: "totalmarks is required.",
      },
    },
    Perquestionmarks: {
      required: {
        value: true,
        message: "Perquestionmarks is required.",
      },
    },
    stdandard: {
      required: {
        value: true,
        message: "std is required.",
      },
    },
    subject: {
      required: {
        value: true,
        message: "subject is required.",
      },
    },
    Stream: {
      required: {
        value: true,
        message: "Stream is required.",
      },
    },
    difficulty: {
      required: {
        value: true,
        message: "difficulty is required.",
      },
    },
    credit: {
      required: {
        value: true,
        message: "credit is required.",
      },
    },
  };
  useEffect(() => {
    fetchTypes();
    fetchstd();
    fetchdifficulty();
    totalmarks();
  }, [question, Perquestionmark]);
  const totalmarks = () => {
    if (question !== "" && Perquestionmark !== "") {
      const totalMarks = parseInt(question) * parseInt(Perquestionmark);
      settotalmarks(totalMarks);
    }
  };
  const fetchdifficulty = async () => {
    try {
      const response = await axios.get("/difficulty");
      let data = response.data;
      setdefficulties(data);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const fetchStreams = async (stdid) => {
    try {
      const response = await axios.get(`/stream/${stdid}`);
      setStreams(response.data);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };
  const handleIsTimeLimitChange = (event) => {
    setIsTimeLimit(event.target.value);
  };
  const fetchSubjects = async (streamId, stdid) => {
    try {
      if (stdid) {
        let response = await axios.get(`/subjects/${stdid}`);
        setSubjects(response.data);
      } else {
        const response = await axios.get(`/subject/${streamId}`);
        setSubjects(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  const fetchTopics = async (stdId, subjectId) => {
    try {
      const response = await axios.get(`/Topics/${stdId}/${subjectId}`);
      setTopics(response.data.result);
    } catch (error) {
      console.log("Error fetching topics : ", error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get("/type");
      setTypes(response.data.result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchstd = async () => {
    try {
      const response = await axios.get("/getstd");
      setstandards(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const handleStreamChange = async (event) => {
    const streamId = event.target.value;
    setSelectedStream(streamId);
    setSelectedSubject("");
    setSelectedTopic("");
    fetchSubjects(streamId, "");
  };
  const handelDifficulty = async (event) => {
    const difficultyId = event.target.value;
    setselecteddefficultie(difficultyId);
  };
  const handelStd = async (event) => {
    const stdId = event.target.value;
    setSelectedStandards(stdId);
    try {
      const response = await axios.get(`/std/${stdId}`);
      const stds = response.data.data;
      const std = stds.map((item) => item.std);
      setstd(std);
      if (parseInt(std) > 10) {
        fetchStreams(stdId);
      } else {
        setStreams([]);
        fetchSubjects("", stdId);
      }
    } catch (error) {
      console.error(error, "Error fetching std information");
    }
    setSelectedStream("");
  };
  const handleSubjectChange = async (event) => {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);
    setSelectedTopic("");
    fetchTopics(SelectedStandards, subjectId);
  };
  const handelTopicChange = async (event) => {
    const TopicId = event.target.value;
    setSelectedTopic(TopicId);
  };
  const handelTypeChange = async (event) => {
    const TypeId = event.target.value;
    setSelectedType(TypeId);
  };
  const navigate = useNavigate();
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#673AB7', // Change this to your desired color
      },
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    const allFieldsFilled = Object.values(data).every((value) => value !== "");

    if (!allFieldsFilled) {
      toast.error("All fields are required.");
      return;
    }
    try {
      const result = await toast.promise(axios.post("/exam", data), {
        pending: "Creating Exam...",
        success: "Exam Created Successfully!",
        error: "Failed to create Exam. Please try again.",
      });
      navigate("/admindashboard/examlist");
      reset();
      setSelectedStandards("");
      setselecteddefficultie("");
      setSelectedStream("");
      setSelectedSubject("");
      setSelectedTopic("");
      setSelectedType("");
    } catch (error) {
      console.error("Error creating Exam:", error);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Grid>
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main",justifyContent:"center",alignItems: 'center'}}>
          <AddBoxIcon />
        </Avatar> */}
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Lato" }}
        >
          CREATE EXAM
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register("name", validationSchema.Name)}
              />
              {errors.name && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="noofquestions"
                required
                fullWidth
                id="noofquestions"
                label="noofquestions"
                type="Number"
                autoFocus
                {...register("noofquestions", validationSchema.noofQuestion)}
                onChange={(e) => setquestion(e.target.value)}
              />
              {errors.noofquestions && (
                <span style={{ color: "red" }}>
                  {errors.noofquestions.message}
                </span>
              )}
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend" id="isTimeLimit">
                  Is Time Limit?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="isTimeLimit"
                  name="isTimeLimit"
                  onChange={handleIsTimeLimitChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("isTimeLimit")} />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("isTimeLimit")} />}
                    label="NO"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="perQuestionmarks"
                required
                fullWidth
                id="perQuestionmarks"
                label="perQuestionmarks"
                type="Number"
                autoFocus
                {...register(
                  "perQuestionmarks",
                  validationSchema.Perquestionmarks
                )}
                onChange={(e) => setPerquestionmarks(e.target.value)}
              />
              {errors.perQuestionmarks && (
                <span style={{ color: "red" }}>
                  {errors.perQuestionmarks.message}
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="TotalMarks"
                // required
                fullWidth
                id="totalmarks"
                label="totalmarks"
                type="Number"
                value={totalMarks}
                // autoFocus
                readOnly
                {...register("totalmarks", validationSchema.totalmarks)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="credit"
                required
                fullWidth
                id="credit"
                label="credit"
                autoFocus
                {...register("credit", validationSchema.credit)}
              />
              {errors.credit && (
                <span style={{ color: "red" }}>{errors.credit.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Std
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="std"
                  value={SelectedStandards}
                  label="Stream"
                  {...register("std", validationSchema.stdandard)}
                  onChange={handelStd}
                >
                  {errors.std && (
                    <span style={{ color: "red" }}>{errors.std.message}</span>
                  )}
                  {standards.map((item) => (
                    <MenuItem key={item.id} value={item._id}>
                      {item.std}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {std > 10 && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Stream
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="strem"
                    value={selectedStream}
                    label="Stream"
                    {...register("stream", validationSchema.Stream)}
                    onChange={handleStreamChange}
                  >
                    {streams.map((item) => (
                      <MenuItem key={item.id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Subject
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSubject}
                  label="Subject"
                  {...register("subject", validationSchema.subject)}
                  onChange={handleSubjectChange}
                >
                  {subjects.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Topic
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTopic}
                  label="Stream"
                  {...register("examtopic")}
                  onChange={handelTopicChange}
                >
                  {topics.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedType}
                  label="examtype"
                  {...register("examtype")}
                  onChange={handelTypeChange}
                >
                  {types.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Difficulty
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selecteddiificulty}
                  label="Difficlty"
                  {...register("difficulty")}
                  onChange={handelDifficulty}
                >
                  {difficultes.map((item) => (
                    <MenuItem key={item.id} value={item._id}>
                      {item.difficulty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            CREATE
          </Button>
        </Box>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
};
