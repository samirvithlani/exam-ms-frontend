import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Box,Grid,Typography ,useTheme,Paper} from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import { CustomeLoader } from '../Layouts/CustomeLoader';

const CompanyList = () => {
    const navigate = useNavigate();
  const [companies, setcompnaies] = useState([]);
  const [rolesData, setRolesData] = useState([]);
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
    backgroundColor: "white", // Set the background color to grey
    m1: 2,
  };
  useEffect(() => {
fetchdata();
fetchRolesData();
  }, []);
  const fetchRolesData = async () => {
    try {
      const response = await axios.get('/role');
      let data = response.data     
        setRolesData(data);
          } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleAddRoleClick = (role) => {
    const roleData = rolesData.find(item => item.role === role);
    if (roleData) {
      navigate(`/add/${roleData._id}`);
    } else {
      console.log(`No data found for the ${role} role.`);
    }
  };
const fetchdata = async()=>{
  setisLoading(true)

let response = await axios.get('/user')
const facultyData = response.data.filter(user => user.role.role === 'company');
let filterdata = facultyData.map((faculty,index)=>({
    displayid: index+1,
    id:faculty._id,
    firstname:faculty.firstname || 'NA',
    email:faculty.email,
    role:faculty.role?.role,
    status:faculty.status
}))
setcompnaies(filterdata);
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
    <Typography variant="h1" sx={{ fontSize: { xs: 30, sm: 40, md: 50 } }}>Company List</Typography>

    <Button
              variant="contained"
              onClick={() => handleAddRoleClick('faculty')}
              sx={{
                fontSize: '12px',
                padding: '5px 10px',
                backgroundColor: 'blue',
                color: 'white',
                marginLeft:'80%', 
                [theme.breakpoints.down('sm')]: {
                  mt: '10px', 
                  marginLeft: 'auto', 
                },
              }}
            >
              Add company
            </Button>
   
    <Grid
  container
  item
  xs={12}
  sx={{
    width: "80vw", 
    height: "50vh", 
    overflowX: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "50vh",
    },
  }}
>
    <DataGrid
     sx={{
      border: "none",
      fontFamily: "Lato",
    }}
      rows={companies}
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
      // pageSizeOptions={[5, 10, 25]}
      rowHeight={80}
    />
    </Grid>
  </Grid>
  </Paper>
);
};

export default CompanyList;
