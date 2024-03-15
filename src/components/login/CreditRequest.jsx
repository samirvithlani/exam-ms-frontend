import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, useTheme, Paper, TextField } from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import { CustomeLoader } from "../Layouts/CustomeLoader";
import Cookies from 'js-cookie';

const CreditRequestList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [creditToAdd, setCreditToAdd] = useState('');
  const[user,setUserdata] = useState([])
  const[User,setUser] = useState('')
  const[_id,setid] = useState('')
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

    let response = await axios.get('http://localhost:3000/credit');
    const Data = response.data
    console.log(Data,"data");
    let filterdata = Data.map((credit, index) => ({
      id: credit._id,
      displayid: index + 1,
      firstname: credit.user.firstname,
      email: credit.user.email,
      requestedCredit: credit.requestedCredit,
      status: credit.status,
      userid:credit.user._id
    }));
    setStudents(filterdata);
    setIsLoading(false);
  }

  const handleAddCredit = async (creditid,userId) => {
    console.log(creditid,userId,"userId");
    await axios.put(`http://localhost:3000/credit/${creditid}`,{status:"Approved"})
    const users = await axios.get(`/user/${userId}`)
    setid(users?.data?._id)
    const data = {user:users.data?._id,walletType:user?.wallet?.walletType,wallet:user?.wallet?._id,Transcation_history:`Account credited with ${creditToAdd} `}
    const transction = await axios.post('/transcation',data)
    console.log(transction);
    setUser(users?.data?.wallet?._id)
    if(users){
      const data = {token:users.data?.wallet?.token +  parseFloat(creditToAdd)};
      await axios.put(`/wallet/${users?.data?.wallet?._id}`,data)
    }
    setCreditToAdd('');
    setSelectedUserId(null);

  }
  const handleApproveCredit = (creditid) => {
    setSelectedUserId(creditid);
  }
  const handlereject = async(creditid)=>{
    const update = await axios.put(`/credit/${creditid}`,{status:"Rejected"})
    const data = {user:_id,walletType:user?.wallet?.walletType,wallet:user?.wallet?._id,Transcation_history:' credited request rejected' }
    const transction = await axios.post('/transcation',data)
  }
  const columns = [
    { field: 'displayid', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'requestedCredit', headerName: 'Requested Credit', width: 300 },
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
                onClick={() => handleAddCredit(params.row.id,params.row.userid)}
                disabled={!creditToAdd}
              >
                Add Credit
              </Button>
              
            </Box>
          ) : (
            <>
            <Button
            variant="contained"
            color="primary"
            onClick={() => handleApproveCredit(params.row.id)}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handlereject(params.row.id)}
          >
            Reject
          </Button>
        </>
            
          )}
        </>
      )
    },
  ];

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "auto", backgroundColor: "white", m1: 2 }} className="responsive-container">
      {isLoading ? <CustomeLoader /> : null}

      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Lato" }}>Request Credit User List</Typography>

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

export default CreditRequestList;
