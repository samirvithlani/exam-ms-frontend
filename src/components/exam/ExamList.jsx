import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Add, DeleteOutline, Edit, PlusOneOutlined , Visibility } from '@mui/icons-material';
import { IconButton , Tooltip } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
const columns = [
    { field: 'displayid', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Exam Name', width: 200 },
      { field: 'examType', headerName: 'Exam Type', width: 150 },
      { field: 'examTopic', headerName: 'Exam Topic', width: 200 },
      { field: 'Subject', headerName: 'Subject', width: 150 },
      { field: 'Stream', headerName: 'Stream', width: 100 },
      {field: 'Standard', headerName: 'Standard', width: 100},
      {field: 'Difficulty', headerName: 'Difficulty', width: 100},
      { field: 'noOfQuestions', headerName: 'No. of Questions', width: 180 },
      { field: 'isTimeLimit', headerName: 'Time-Limited', width: 150 },
      { field: 'examTime', headerName: 'Exam Time (in hours)', width: 200 },
      { field: 'perQuestionTime', headerName: 'Time per Question (in minutes)', width: 280 },
      { field: 'totalmarks', headerName: 'Total Marks', width: 280 },
      { field: 'actions', headerName: 'Actions', width: 200},
      ];

const ExamList = () => {
  const [examData, setExamData] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]); 
  const fetchallquestion = async()=>{
    try {
      const response = await axios.get('/mcq')
      setAllQuestions(response.data)
    } catch (error) {
      console.log("error ",error);
    }
  }
  useEffect(()=>{
    fetchallquestion();
  },[]);
  const navigate = useNavigate();
  const fetchData = async () => {
        axios.get('/Exam')
        .then((response) => {
          const filteredData = response.data.map((exam,index) => ({
            displayid: index+1,
            name: exam.name,
            examType: exam.examtype?.type || 'N/A',
            examTopic: exam.examtopic?.name || 'N/A',
            Subject : exam.subject?.name || 'N/A',
            Stream : exam.stream ? exam.stream.name:"NA",
            Standard :exam.std ? exam.std.std:"NA",
            Difficulty:exam.difficulty?exam.difficulty.difficulty :"NA",
            noOfQuestions: exam.noofquestions || 0,
            isNegative: exam.isNegative ,
            isTimeLimit: exam.isTimeLimit ? 'Yes' : 'No', 
            examTime: exam.examtime || 0,
            perQuestionTime: exam.perQuestiontime || 0,
            totalmarks:exam.totalmarks,
            id: exam._id,
            topicId:exam.examtopic?._id || 'N/A',
            difficultyId:exam.difficulty?exam.difficulty._id: "NA" ,
            subjectId : exam.subject?._id || 'NA',
            streamId : exam.stream?._id || 'NA',
            standardId :exam.std? exam.std._id:'NA',
            typeId :exam.examtype?._id || 'N/A'
          }));
          setExamData(filteredData); 
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    
      }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update-exam/${id}`);
  };
  const handleAddQuestions = (type,id,subject,stream,difficulty,standard,subjectId,streamId,topicId,difficultyId,standardId,topic,types,typeId) => {
    if (type === 'mcq') {
      navigate(`/adminDashboard/mcqquestion/${id}`, { state: { subject,stream,difficulty,standard,subjectId,streamId,topicId,difficultyId,standardId,topic,types,typeId} }); 
    } else {
      navigate('/adminDashboard');
    }
  };

  const handleDelete = async (id) => {
    try {
         await toast.promise(axios.delete(`/exam/${id}`), {
            pending: "Creating Exam...",
            success: "Exam Deleted Successfully!",
            error: "Failed to create Exam. Please try again.",
          });
      setExamData((prevData) => prevData.filter((exam) => exam.id !== id));
    } catch (error) {
      console.log("Error while deleting exam:", error);
    }
  };
  const handleGenerateQuestions = async (topicId, noOfQuestions,id,difficultyId) => {
    try {
      const filteredQuestions = allQuestions.filter(question => question.Topic._id === topicId && question.difficulty === difficultyId);
      if (filteredQuestions.length < noOfQuestions) {
        toast.error('Insufficient questions available for this topic.')
        return;
      }
      const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
      const mcq = shuffledQuestions.slice(0, noOfQuestions);
      const updateQuestionResponse = await axios.put(`/mcq/${id}`, {
        mcq
        });
      toast.success('Questions generated successfully!');
    } catch (error) {
      console.error('Error generating questions:', error);
      toast.error('Failed to generate questions. Please try again.');
    }
  };
  const handleView = (id,subject,stream,difficulty,standard,topic,type) => {

    navigate(`/viewexam/${id}`,{state :{subject,stream,difficulty,standard,topic,type}});
  };
  return (
    <div>
    <Box sx={{ height: 400, width: '100%' }}>
        
      <DataGrid
        rows={examData}
        columns={columns.map((column) => ({
          ...column,
          renderCell: (params) => {
            if (column.field === 'actions') {
              return (
                
                <div>
                   <Tooltip title="View Exam" arrow>
                      <IconButton
                        aria-label="view"
                        onClick={() => handleView(params.row.id,params.row.Subject,params.row.Stream,params.row.Difficulty,params.row.Standard,
                          params.row.examTopic,params.row.examType )}
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
                      onClick={() => handleAddQuestions('mcq',params.row.id,params.row.Subject,params.row.Stream,params.row.Difficulty,params.row.Standard,params.row.subjectId,params.row.streamId,params.row.topicId,params.row.difficultyId,params.row.standardId,params.row.examTopic,params.row.examType,params.row.typeId)} 
                      color="primary"
                    >
                      <Add/>
                      
        </IconButton>
        </Tooltip>
        <Tooltip title="Generate Questions" arrow>

        <IconButton
                      aria-label="add"
                      onClick={() => handleGenerateQuestions(params.row.topicId,params.row.noOfQuestions,params.row.id,params.row.difficultyId)} 
                      color="primary"
                    >
                      <Add/>
        </IconButton>
        </Tooltip>
                </div>
              );
            }
            return params.value;
          },
        }))}
        pageSize={1}
        disableRowSelectionOnClick
      />
    </Box>
        <ToastContainer/>
    </div>
  );
};

export default ExamList;
