import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';

export const ViewAnswer = () => {
  const [mcqAnswers, setMcqAnswers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);
  const optionMapping = {
    1: 'Option 1',
    2: 'Option 2',
    3: 'Option 3',
    4: 'Option 4',
    '1': 'Option 1',
    '2': 'Option 2',
    '3': 'Option 3',
    '4': 'Option 4',
    
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`/answers/${id}`);
      const filterData = response.data.flatMap(answer =>
        answer.mcq_answers.map(mcqAnswer => ({
          id: mcqAnswer._id,
          question: mcqAnswer.question.question || 'NA',
          option1: mcqAnswer.question.Option1 || 'NA',
          option2: mcqAnswer.question.Option2 || 'NA',
          option3: mcqAnswer.question.Option3 || 'NA',
          option4: mcqAnswer.question.Option4 || 'NA',
          givenanswer: optionMapping[mcqAnswer.givenanswer] || 'NA',
        correctOption: optionMapping[mcqAnswer.question.correctOption] || 'NA',
          status: getStatus(mcqAnswer.givenanswer, mcqAnswer.question.correctOption)
        }))
      );
      setMcqAnswers(filterData);
    } catch (error) {
      console.log('Error', error);
    }
  };
  
  const getStatus = (givenAnswer, correctOption) => {
    return givenAnswer == correctOption ? 'Correct' : 'Incorrect';
  };
  const getRowClassName = (params) => {
    return params.row.status === 'Correct' ? 'correct-row' : 'incorrect-row';
  };
  const columns = [
    { field: 'question', headerName: 'Question', width: 400 },
    { field: 'option1', headerName: 'Option 1', width: 150 },
    { field: 'option2', headerName: 'Option 2', width: 150 },
    { field: 'option3', headerName: 'Option 3', width: 150 },
    { field: 'option4', headerName: 'Option 4', width: 150 },
    { field: 'givenanswer', headerName: 'Given Answer', width: 150 },
    { field: 'correctOption', headerName: 'CorrectAnswer', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
      rows={mcqAnswers} 
      columns={columns} 
      pageSize={5} 
      getRowClassName={getRowClassName}
      />
       <style>
        {`
          .correct-row {
            background-color: lightgreen; 
          }

          .incorrect-row {
            background-color: lightcoral; 
          }
        `}
      </style>
    </div>
  );
};
