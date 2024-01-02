import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Historyofuser = () => {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: 'displayid', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Exam Name', width: 200 },
    { field: 'examType', headerName: 'Exam Type', width: 150 },
    { field: 'noOfQuestions', headerName: 'No. of Questions', width: 180 },
    { field: 'totalmarks', headerName: 'Total Marks', width: 240 },
    { field: 'result', headerName: 'Result', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => viewAnswer(params.row.id)}
        >
          View Answer
        </Button>
      ),
    }
  ];

  const viewAnswer = (id) => {
    navigate(`/userDasboard/viewAnswers/${id}`);
  };
  
  const fetchData = async () => {
    const _id = Cookies.get('_id');
    try {
      const response = await axios.get(`/userhistory/${_id}`);
      const filteredData = response.data.map((exam, index) => ({
        id: exam._id || index,
        displayid: index + 1,
        name: exam.exam_id.name,
        examType: exam.exam_type?.type,
        noOfQuestions: exam.exam_id.noofquestions || 0,
        totalmarks: exam.total_marks,
        result: exam.result,
      }));
      setHistories(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ height: 400 }}>
        <DataGrid
          rows={histories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </Grid>
    </Grid>
  );
};

export default Historyofuser;
