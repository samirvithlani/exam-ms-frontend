  import {
      Box,
      Button,
      createTheme,
      Grid,
      InputLabel,
      TextField,
      ThemeProvider,
      Typography,
    } from "@mui/material";
    import axios from "axios";
    import React from "react";
    import { useForm } from "react-hook-form";
    import { useNavigate , useParams } from "react-router-dom";
    
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    //createUser for vc
    export const McqQuestion = () => {
      const { id } = useParams(); 
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
          console.log('Selected file:', selectedFile.name);
        }
      };
      
      const submitHandler = async (data) => {
        const formData = new FormData();
        console.log(data.files, "fileUpload"); 

        if (data.fileUpload && data.fileUpload[0]) {
          formData.append('file', data.fileUpload[0]);
        } 
        console.log("data", data);
        const response = await axios.post('http://localhost:3000/mcqs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart form data
          },
        });
        console.log(response.data,"respinse in file ");
       const mcq = response.data.map(item=>item._id);
       console.log(mcq,"question"); 
       if(id){
        const updateQuestionResponse = await axios.put(`http://localhost:3000/mcq/${id}`, {
          mcq
        });
        console.log("updateresponse",updateQuestionResponse);
        navigate("/admindashboard/examlist");
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
    
      console.log("errors", errors);
      return (
        <ThemeProvider theme={defaultTheme}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            ADD USER :
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box component="form" onSubmit={handleSubmit(submitHandler)}>
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
              
                <InputLabel htmlFor="subject">Subject</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="subject"
                  // required
                  fullWidth
                  id="subject"
                  label="subject"
                  autoFocus
                  {...register("subject")}
                />
                {errors.subject && (
                  <span style={{ color: "red" }}>{errors.subject.message}</span>
                )}
                <InputLabel htmlFor="topic">topic</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="topic"
                  // required
                  fullWidth
                  id="topic"
                  label="topic"
                  autoFocus
                  {...register("topic")}
                />
                {errors.topic && (
                  <span style={{ color: "red" }}>{errors.topic.message}</span>
                )}
                <InputLabel htmlFor="stream">stream</InputLabel>
                <TextField
                  autoComplete="given-title"
                  name="stream"
                  // required
                  fullWidth
                  id="stream"
                  label="stream"
                  autoFocus
                  {...register("stream")}
                />
                {errors.stream && (
                  <span style={{ color: "red" }}>{errors.stream.message}</span>
                )}
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
                  ADD
                </Button>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
    };
    