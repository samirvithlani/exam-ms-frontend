import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const CompanyList = () => {
    const navigate = useNavigate();
  const [companies, setcompnaies] = useState([]);
  const [rolesData, setRolesData] = useState([]);


  useEffect(() => {
fetchdata();
fetchRolesData();
  }, []);
  const fetchRolesData = async () => {
    try {
      const response = await axios.get('/role');
      let data = response.data     
      console.log(response.data,"response");
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
    <Button
              variant="contained"
              onClick={() => handleAddRoleClick('company')}
              sx={{
                fontSize: '12px',
                padding: '5px 10px',
                backgroundColor: '#FFA500', 
                color: 'white',
                marginLeft: 'auto',
              }}
            >
              Add company
            </Button>
    <h1>Company List</h1>
    <DataGrid
      rows={companies}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5, 10, 20]}
    />
  </div>
);
};

export default CompanyList;
