import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const StudentList = () => {
    const navigate = useNavigate();
  const [students, setstudents] = useState([]);
  useEffect(() => {
fetchdata();
  }, []);
const fetchdata = async()=>{
let response = await axios.get('/user')
const facultyData = response.data.filter(user => user.role.role === 'student');
let filterdata = facultyData.map((faculty,index)=>({
    displayid: index+1,
    id:faculty._id,
    firstname:faculty.firstname,
    email:faculty.email,
    role:faculty.role?.role,
    status:faculty.status
}))
setstudents(filterdata);
}
const columns = [
    { field: 'displayid', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'role', headerName: 'Role', width: 300 },
    { field: 'status', headerName: 'Status', width: 300 },
    
  ]
  return (
    <div style={{ height: 400, width: '100%' }}>
   
    <h1>Student List</h1>
    <DataGrid
      rows={students}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5, 10, 20]}
    />
  </div>
);
};

export default StudentList;
