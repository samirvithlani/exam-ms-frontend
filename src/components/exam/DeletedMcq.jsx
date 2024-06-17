import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
const DeletedMcq = () => {
    const [removemcq,setremovemcq] = useState([]);
    
    useEffect(() => {
        const fetchMcqs = async () => {
          try {
            debugger
            const response = await axios.get('/mcq');
            if (response.status === 200) {
            const removequestions = response.data.filter(mcq=>mcq.isActive === false)
            setremovemcq(removequestions)
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchMcqs();
      }, []);
      const handledelete= async(questionid)=>{
        console.log(questionid,"questionid");
        try {
            const response = await axios.delete(`/mcq/${questionid}`)
            if(response.status === 200){
                setremovemcq((prevMcqs) => prevMcqs.filter(mcq => mcq._id !== questionid));

                toast.success("Question Deleted Sucessfully")
            }
        } catch (error) {
            console.log(error,"error");
            toast.error("Error while Delete the Question")
        }
      }
  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>question</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {removemcq.map((mcq) => (
          <TableRow key={mcq.id}>
            <TableCell>{mcq.question}</TableCell>
            <TableCell>
              <IconButton   onClick={()=> handledelete(mcq._id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <ToastContainer/>
  </TableContainer>
  )
}

export default DeletedMcq
