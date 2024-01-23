import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Box,Grid,Typography ,useTheme,Paper} from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import { CustomeLoader } from "../Layouts/CustomeLoader";

const StudentList = () => {
    const navigate = useNavigate();
  const [students, setstudents] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const theme = useTheme();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });
  const paperStyle = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: "auto",
    backgroundColor: "white", 
    m1: 2,
  };
  useEffect(() => {
fetchdata();
  }, []);
const fetchdata = async()=>{
  setisLoading(true)

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
setisLoading(false)

}
const columns = [
    { field: 'displayid', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'role', headerName: 'Role', width: 300 },
    { field: 'status', headerName: 'Status', width: 300 },
    
  ]
  return (
    <Paper sx={paperStyle} className="responsive-container">
    {
      isLoading ? <CustomeLoader/> : null
    }
    <Grid style={{ height: 400, width: '100%' }}>
   
    <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Lato" }}
        >
          Student List
        </Typography>
    <Grid
  container
  item
  xs={12}
  sx={{
    width: "80vw", 
    height: "50vh", 
    overflowX: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
      height: "50vh",
    },
  }}
>
    <DataGrid
    sx={{
      border: "none",
      fontFamily: "Lato",
    }}
      rows={students}
      columns={columns.map((column)=>({
        ...column,
        renderCell:(params)=>{
          return(
            <div 
            style={{
              fontWeight: "bold",
              fontSize: 20,
              fontFamily: "Lato",
            }}
          >
           {params.value}
            </div>
          )
        }
      }))}
      initialState={{
        ...data.initialState,
        pagination: { paginationModel: { pageSize: 5} },
      }}
      rowHeight={80}

    />
  </Grid>
  </Grid>
</Paper>
);
};

export default StudentList;
