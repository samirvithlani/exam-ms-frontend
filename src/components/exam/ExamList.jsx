import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Add, DeleteOutline, Edit, PlusOneOutlined } from '@mui/icons-material';
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
      const response = await axios.get('http://localhost:3000/mcq')
      console.log(response.data,"question");
      setAllQuestions(response.data)
    } catch (error) {
      console.log("error ",error);
    }
  }
  useEffect(()=>{
    fetchallquestion();
  },[]);
  const navigate = useNavigate();
  // const history = useHistory(); 
  const fetchData = async () => {
        axios.get('http://localhost:3000/Exam')
        .then((response) => {
          console.log(response,"response");
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
            difficultyId:exam.difficulty?._id || 'NA'
          }));
          console.log(filteredData,"filterdata");
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
    console.log(`Edit row with ID: ${id}`);
  };
  const handleAddQuestions = (stream,id) => {
    if (stream === 'mcq') {
      navigate(`/adminDashboard/mcqquestion/${id}`); 
    } else {
      navigate('/adminDashboard');
    }
  };

  const handleDelete = async (id) => {
    try {
         await toast.promise(axios.delete(`http://localhost:3000/exam/${id}`), {
            pending: "Creating Exam...",
            success: "Exam Deleted Successfully!",
            error: "Failed to create Exam. Please try again.",
          });
      setExamData((prevData) => prevData.filter((exam) => exam.id !== id));
      console.log(`Exam with ID ${id} deleted successfully`);
    } catch (error) {
      console.log("Error while deleting exam:", error);
    }
    console.log(`Delete row with ID: ${id}`);
  };
  const handleGenerateQuestions = async (topicId, noOfQuestions,id,difficultyId) => {
    console.log(id,"id in genreate");
    console.log(topicId,"topic");
    console.log(difficultyId,"difficulty");
    console.log(noOfQuestions,"no of question");
    try {
      const filteredQuestions = allQuestions.filter(question => question.Topic._id === topicId && question.difficulty === difficultyId);
      console.log(filteredQuestions,"question filtyer");
      if (filteredQuestions.length < noOfQuestions) {
        console.log('Insufficient questions available for this topic.');
        toast.error('Insufficient questions available for this topic.')
        return;
      }
      const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
      const mcq = shuffledQuestions.slice(0, noOfQuestions);
      const updateQuestionResponse = await axios.put(`http://localhost:3000/mcq/${id}`, {
        mcq
        });
        console.log("updateresponse",updateQuestionResponse);
      console.log('Generated questions:', mcq);
      toast.success('Questions generated successfully!');
    } catch (error) {
      console.error('Error generating questions:', error);
      toast.error('Failed to generate questions. Please try again.');
    }
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
                      onClick={() => handleAddQuestions('mcq',params.row.id)} 
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
