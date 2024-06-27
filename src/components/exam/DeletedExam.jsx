import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { constant } from '../../constant';
import { CustomeLoader } from '../Layouts/CustomeLoader';

export const DeletedExam = () => {
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/exam');
      if (response.status === 200) {
        const ActiveExam = response.data.filter(data => data.isActive === false);
        setExam(ActiveExam);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
   
    fetchExams();
  }, []);

  const handleOpenDeleteDialog = (examId) => {
    console.log(examId,"examid ");
    setExamToDelete(examId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setExamToDelete(null);
  };

  const confirmDelete = async () => {
    if (examToDelete) {
      try {
        const response = await axios.delete(`/exam/${examToDelete}`);
        if (response.status === 200) {
          setExam((prevExams) => prevExams.filter(examItem => examItem._id !== examToDelete));
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleCloseDeleteDialog();
  };
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
 

  return (
    <ThemeProvider theme={defaultTheme}>
      {
        loading && <CustomeLoader/>
      }
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exam.map((examItem) => (
            <TableRow key={examItem.id}>
              <TableCell>{examItem.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDeleteDialog(examItem._id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>
          Confirm Deletion
          <IconButton
            aria-label="close"
            onClick={handleCloseDeleteDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this exam?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
    </ThemeProvider>
  );
};
