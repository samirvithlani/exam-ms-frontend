  import {
      Box,
      Button,
      createTheme,
      Grid,
      InputLabel,
      TextField,
      ThemeProvider,
      Typography,
      FormControl,
      FormControlLabel,
      Select,
      MenuItem
    } from "@mui/material";
    import axios from "axios";
    import React, { useEffect } from "react";
    import { useForm } from "react-hook-form";
    import { useNavigate , useParams,useLocation} from "react-router-dom";
    import { useState } from "react";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    //createUser for vc
    export const McqQuestion = () => {
      const { id } = useParams(); 
      const location = useLocation();
      const [selectedOption, setSelectedOption] = useState('');
      const [streams, setStreams] = useState([]);
      const [selectedStream, setSelectedStream] = useState('');
      const [selectStream, setSelectStream] = useState('');
      const [selectedSubject, setSelectedSubject] = useState('');
      const [selectSubject, setSelectSubject] = useState('');
      const [selectedTopic, setSelectedTopic] = useState('');
      const [selectTopic, setSelectTopic] = useState('');
      const[difficultes,setdefficulties] = useState([]);
      const[selecteddiificulty,setselecteddefficultie] = useState('');
      const [selectedType, setSelectedType] = useState('');
      const[selectdiificulty,setselectdefficultie] = useState('');
      const [selectType, setSelectType] = useState('')
      const [subjects, setSubjects] = useState([]);
      const[SelectedStandards,setSelectedStandards] = useState('');
      const[SelectStandards,setSelectStandards] = useState('');
      const[standards,setstandards] = useState([]);
      const [topics, setTopics] = useState([]);
      const[std,setstd] = useState('');
      const [types,setTypes] = useState([]);
      const subject = location.state?.subject;
      const stream = location.state?.stream;
      const difficulty = location.state?.difficulty;
      const standard = location.state?.standard;
      const topic = location.state?.topic
      const subjectId = location.state?.subjectId;
      const streamId = location.state?.streamId;
      const difficultyId = location.state?.difficultyId;
      const standardId = location.state?.standardId;
      const topicId = location.state?.topicId;
      const type = location.state?.types;
      const typeId = location.state?.typeId
      useEffect(()=>{
        setSelectStream(streamId)
        setselectdefficultie(difficultyId);
        setSelectStandards(standardId);
        setSelectSubject(subjectId);
        setSelectTopic(topicId)
        setSelectType(typeId);
        fetchstd();
        fetchTypes();
        fetchdifficulty();
  },[])
      const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };
      const defaultTheme = createTheme();
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onChange",
      });
      const navigate = useNavigate();
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
        }
      };
      const fetchdifficulty = async() =>{
        try {
          const response = await axios.get('/difficulty')
          let data = response.data
          setdefficulties(data)
        } catch (error) {
          console.log(error,"error");
        }
      }
      const fetchStreams = async (stdid) => {
        try {
          const response = await axios.get(`/stream/${stdid}`);
          setStreams(response.data);
        } catch (error) {
          console.error('Error fetching streams:', error);
        }
      };
      const fetchSubjects = async (streamId,stdid) => {
        try {
          if(stdid){
            let response = await axios.get(`/subjects/${stdid}`)
            setSubjects(response.data);
          }else{
          const response = await axios.get(`/subject/${streamId}`);
          setSubjects(response.data.result);}
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };
    const fetchTopics = async (stdId,subjectId) =>{
      try{
        const response=await axios.get(`/Topics/${stdId}/${subjectId}`)
        setTopics(response.data.result)
      } catch(error){
        console.log("Error fetching topics : ",error);
      }
    };
    
    const fetchTypes = async()=>{
      try {
        const response = await axios.get('/type')
        setTypes(response.data.result)
      } catch (error) {
        console.log("error",error);
      }
    }
    const fetchstd = async()=>{
      try {
        const response = await axios.get('/getstd') 
        setstandards(response.data.data);
        
      } catch (error) {
        console.log(error,"error");
      }
    }
      const handleStreamChange = async (event) => {
        const streamId = event.target.value;
        setSelectedStream(streamId);
        setSelectedSubject('');
        setSelectedTopic('');
        fetchSubjects(streamId,'');
      };
      const handelDifficulty = async (event)=>{
        const difficultyId = event.target.value
        setselecteddefficultie(difficultyId)
      }
      const handelStd = async (event) =>{
        const stdId = event.target.value;
        setSelectedStandards(stdId)
        try {
          const response = await axios.get(`/std/${stdId}`);
          const stds = response.data.data;
          const std = stds.map(item=>item.std)
          setstd(std)
          if (parseInt(std) > 10) {
            fetchStreams(stdId); 
          } else {
            setStreams([]);
            fetchSubjects('',stdId); 
          }
        } catch (error) {
          console.error(error, "Error fetching std information");
        }
        setSelectedStream('') 
      }
      const handleSubjectChange = async (event) => {
        const subjectId = event.target.value;
        setSelectedSubject(subjectId);
        setSelectedTopic('');
        fetchTopics(SelectedStandards,subjectId);
      };
      const handelTopicChange = async(event)=>{
        const TopicId = event.target.value;
        setSelectedTopic(TopicId);
      };
      const handelTypeChange = async(event)=>{
        const TypeId = event.target.value;
        setSelectedType(TypeId);
      }
      const submitHandler = async (data) => {
        if(selectSubject ||selectStream ||selectTopic ||SelectStandards || selectdiificulty){
        data.subject = selectSubject,
        data.stream = selectStream,
        data.topic = selectTopic,
        data.std = SelectStandards,
        data.difficulty = selectdiificulty
        }
        let response ;
      const formData = new FormData();
        if (data.fileUpload && data.fileUpload[0]) {
          formData.append('file', data.fileUpload[0]);
        } 
        if(!data.fileUpload || data.fileUpload === undefined){
         response = await axios.post('/mcqsingle',data)
          navigate("/admindashboard/examlist");
          toast.success("Question Added Sucess Fully ...")
          }else{
             response = await axios.post('/mcqs', formData, {
              headers: {
                'Content-Type': 'multipart/form-data', 
              },
            });
             toast.success("Question Added Sucess Fully ...")
             navigate("/admindashboard/examlist");
          }
      
        let mcq ;
        if (Array.isArray(response.data)) {
          mcq = response.data.map(item => item._id);
        } else {
          mcq = response.data._id;
        }
        if(id){
         const updateQuestionResponse = await axios.put(`/mcq/${id}`, {
           mcq
         });

        }
        
      };
      
      const validationSchema = {
        question: {
          required: {
            value: true,
            message: "question is required.",
          }  
        },
        Option1: {
          required: {
            value: true,
            message: "Option1 required.",
          }
        },
        Option2: {
          required: {
            value: true,
            message: "Option2 required.",
          }
        },
        Option3: {
          required: {
            value: true,
            message: "Option3 required.",
          }
        }, 
        Option4: {
          required: {
            value: true,
            message: "Option4 required.",
          }
        },
        correctOption: {
          required: {
            value: true,
            message: "Option4 required.",
          }
        },
        subject: {
          required: {
            value: true,
            message: "subject required.",
          }
        },
        topic: {
          required: {
            value: true,
            message: "topic required.",
          }
        },
        stream: {
          required: {
            value: true,
            message: "stream required.",
          }
        },
        
      };
    
      return (
        <ThemeProvider theme={defaultTheme}>
           <div>
        <label>
          <input
            type="radio"
            value="manual"
            checked={selectedOption === "manual"}
            onChange={handleOptionChange}
          />
          Manual Input
        </label>
        <label>
          <input
            type="radio"
            value="file"
            checked={selectedOption === "file"}
            onChange={handleOptionChange}
          />
          Upload File
        </label>
      </div>
      
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            ADD Question :
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box component="form" onSubmit={handleSubmit(submitHandler)}>
              {selectedOption === "manual" && (
                <>
                 {standard && (
          <Grid item xs={12}>
            <Typography variant="h6">Standard: {standard}</Typography>
          </Grid>
        )}
        {stream && (
          <Grid item xs={12}>
            <Typography variant="h6">Stream: {stream}</Typography>
          </Grid>
        )}
        {subject && (
          <Grid item xs={12}>
            <Typography variant="h6">Subject: {subject}</Typography>
          </Grid>
        )}
 {topic && (
          <Grid item xs={12}>
            <Typography variant="h6">Topic: {topic}</Typography>
          </Grid>
        )}
        {type && (
          <Grid item xs={12}>
            <Typography variant="h6">Type: {type}</Typography>
          </Grid>
        )}
        {difficulty && (
          <Grid item xs={12}>
            <Typography variant="h6">Difficulty: {difficulty}</Typography>
          </Grid>
        )}
                <InputLabel htmlFor="question">Question</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="question"
                  // required
                  fullWidth
                  id="question"
                  label="question"
                  autoFocus
                  {...register("question")}
                />
                {errors.question && (
                  <span style={{ color: "red" }}>{errors.question.message}</span>
                )}
    
                <InputLabel htmlFor="Option1">Option1</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="Option1"
                  // required
                  fullWidth
                  id="Option1"
                  label="Option1"
                  autoFocus
                  {...register("Option1")}
                />
                {errors.Option1 && (
                  <span style={{ color: "red" }}>{errors.Option1.message}</span>
                )}
    
                <InputLabel htmlFor="Option2">Option2</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="Option2"
                  // required
                  fullWidth
                  id="Option2"
                  label="Option2"
                  autoFocus
                  {...register("Option2")}
                />
                {errors.Option2 && (
                  <span style={{ color: "red" }}>
                    {errors.Option2.message}
                  </span>
                )}
    
                <InputLabel htmlFor="Option3">Option3</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="Option3"
                  // required
                  fullWidth
                  id="Option3"
                  label="Option3"
                  autoFocus
                  {...register("Option3")}
                />
                {errors.Option3 && (
                  <span style={{ color: "red" }}>{errors.Option3.message}</span>
                )}
    
                <InputLabel htmlFor="Option4">Option4</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="Option4"
                  // required
                  fullWidth
                  id="Option4"
                  label="Option4"
                  autoFocus
                  {...register("Option4")}
                />
                {errors.Option4 && (
                  <span style={{ color: "red" }}>{errors.Option4.message}</span>
                )}
                <InputLabel htmlFor="correctOption">CorrectOption</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="correctOption"
                  // required
                  fullWidth
                  id="correctOption"
                  label="correctOption"
                  type="Number"
                  autoFocus
                  {...register("correctOption")}
                />
                {errors.correctOption && (
                  <span style={{ color: "red" }}>{errors.correctOption.message}</span>
                )}
                <Grid container spacing={2}>
                  {SelectStandards ?(
                    <></>
                  ):(
              <Grid item xs={12}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Std</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="std"
        value={SelectedStandards}
        label="Stream"
        {...register("std",validationSchema.stdandard)}
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
      )}  
      
      {std>10 && (
            <Grid item xs={12}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Stream</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id='strem'
        value={selectedStream}
        label="Stream"
        {...register("stream",validationSchema.Stream)}
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
      {selectSubject ?(
        <></>
      ) :(
             <Grid item xs={12}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedSubject}
        label="Subject"
        {...register("subject",validationSchema.subject)}
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
      )}
      {selectTopic ?(
       <></>
      ):(
      <Grid item xs={12}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Topic</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedTopic}
        label="Topic"
        {...register("topic")}
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
      )}
      {selectType?(
       <></>
      ):(
      <Grid item xs={12}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
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
      )}
      {selectdiificulty?( 
          <></>
        ):(
      <Grid item xs={12}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Difficulty</InputLabel>
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
      )}
      </Grid>
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ADD
                </Button>
                </>
              )}
              {selectedOption === "file" && (
                <>
                  <input
                      type="file"
                      name="fileUpload"
                      accept=".csv,.xlsx,.xls"
                      onChange={(event) => handleFileChange(event)}
                      {...register("fileUpload")}
                  />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Upload File
                </Button>
                </>
              )}
              </Box>
            </Grid>
            <ToastContainer/>
          </Grid>
        </ThemeProvider>  
      );
    };
    