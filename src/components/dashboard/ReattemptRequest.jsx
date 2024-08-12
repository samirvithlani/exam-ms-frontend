import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReattemptRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchReattemptRequest();
  }, []);

  const fetchReattemptRequest = async () => {
    try {
      const response = await axios.get('/reattempt');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching reattempt requests:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/user_exam/${id}`, { ReAttemp_request: 'Accepted' });
      fetchReattemptRequest(); 
    } catch (error) {
      console.error('Error approving reattempt request:', error);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.put(`/user_exam/${id}`, { ReAttemp_request: 'Rejected' });
      fetchReattemptRequest(); 
    } catch (error) {
      console.error('Error denying reattempt request:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Exam Name</TableCell>
            <TableCell>Request Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell>{`${request.user_id.firstname} ${request.user_id.lastname}`}</TableCell>
              <TableCell>{request.exam_id.name}</TableCell>
              <TableCell>{request.ReAttemp_requestmsg}</TableCell>
              <TableCell>{request.ReAttemp_request}</TableCell>
              <TableCell>
                {request.ReAttemp_request === 'pending' && (
                  <>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleApprove(request._id)}
                      sx={{ marginRight: 1 }}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => handleDeny(request._id)}
                    >
                      Deny
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReattemptRequest;
