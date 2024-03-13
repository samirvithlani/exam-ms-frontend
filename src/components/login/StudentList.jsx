import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, useTheme, Paper, TextField } from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import { CustomeLoader } from "../Layouts/CustomeLoader";

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [creditToAdd, setCreditToAdd] = useState('');
  const[User,setUser] = useState('')
  const theme = useTheme();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    setIsLoading(true);

    let response = await axios.get('/user');
    const facultyData = response.data.filter(user => user.role.role === 'student');
    let filterdata = facultyData.map((faculty, index) => ({
      id: faculty._id,
      displayid: index + 1,
      firstname: faculty.firstname,
      email: faculty.email,
      role: faculty.role?.role,
      status: faculty.status,
      credit: faculty.credit // Assuming each user object has a 'credit' property
    }));
    setStudents(filterdata);
    setIsLoading(false);
  }

  const handleAddCredit = async (userId) => {
   
    const user = await axios.get(`/user/${userId}`)
    setUser(user.data.wallet._id)
    if(user){
      const data = {token:user.data.wallet.token +  parseFloat(creditToAdd)};
    const addcredit = await axios.put(`/wallet/${User}`,data)
    }
    setCreditToAdd('');
    setSelectedUserId(null);
  }

  const columns = [
    { field: 'displayid', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'role', headerName: 'Role', width: 300 },
    { field: 'status', headerName: 'Status', width: 300 },
    {
      field: 'credit', headerName: 'Credit', width: 150,
      renderCell: (params) => (
        <>
          {selectedUserId === params.row.id ? (
            <Box display="flex" alignItems="center">
              <TextField
                value={creditToAdd}
                onChange={(e) => setCreditToAdd(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddCredit(params.row.id)}
                disabled={!creditToAdd}
              >
                Add
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedUserId(params.row.id)}
            >
              Add Credit
            </Button>
          )}
        </>
      )
    },
  ];

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "auto", backgroundColor: "white", m1: 2 }} className="responsive-container">
      {isLoading ? <CustomeLoader /> : null}

      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Lato" }}>Student List</Typography>

      <Grid style={{ height: 400, width: '100%' }}>
        <Grid container item xs={12} sx={{ width: "80vw", height: "50vh", overflowX: "auto", [theme.breakpoints.down("sm")]: { width: "90vw", height: "50vh" } }}>
          <DataGrid
            sx={{ border: "none", fontFamily: "Lato" }}
            rows={students}
            columns={columns}
            initialState={{ ...data.initialState, pagination: { paginationModel: { pageSize: 5 } } }}
            rowHeight={80}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentList;
