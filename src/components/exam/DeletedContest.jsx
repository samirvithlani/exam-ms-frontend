import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, createTheme, ThemeProvider, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Restore as RestoreIcon, Close as CloseIcon } from '@mui/icons-material';
import { constant } from '../../constant';
import { CustomeLoader } from '../Layouts/CustomeLoader';
import { useNavigate } from 'react-router-dom';

const DeletedContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [contestToDelete, setContestToDelete] = useState(null);
  const [contestToRestore, setContestToRestore] = useState(null);
  const navigate = useNavigate()
  const fetchDeletedContests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/deletedcontest');
      console.log(response, 'response');
      if (response.status === 200) {
        setContests(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deleted contests:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeletedContests();
  }, []);

  const handleOpenDeleteDialog = (contestId) => {
    setContestToDelete(contestId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setContestToDelete(null);
  };

  const handleOpenRestoreDialog = (contestId) => {
    setContestToRestore(contestId);
    setOpenRestoreDialog(true);
  };

  const handleCloseRestoreDialog = () => {
    setOpenRestoreDialog(false);
    setContestToRestore(null);
  };

  const confirmDelete = async () => {
    if (contestToDelete) {
      try {
        const response = await axios.delete(`/contest/${contestToDelete}`);
        if (response.status === 200) {
          setContests((prevContests) => prevContests.filter(contest => contest._id !== contestToDelete));
        }
      } catch (error) {
        console.error('Error deleting contest:', error);
      }
    }
    handleCloseDeleteDialog();
  };

  const confirmRestore = async () => {
    if (contestToRestore) {
      try {
        const data = {isActive:true}
        const response = await axios.put(`/contest/${contestToRestore}`,data);
        if (response.status === 200) {
            navigate("/adminDashboard/contestlist");
        }
      } catch (error) {
        console.error('Error restoring contest:', error);
      }
    }
    handleCloseRestoreDialog();
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
      {loading && <CustomeLoader />}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contests.map((contest) => (
              <TableRow key={contest._id}>
                <TableCell>{contest.name}</TableCell>
                <TableCell>
                  <Tooltip title="Restore">
                    <IconButton onClick={() => handleOpenRestoreDialog(contest._id)} aria-label="restore">
                      <RestoreIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleOpenDeleteDialog(contest._id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Delete Confirmation Dialog */}
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
            Are you sure you want to delete this contest?
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

      {/* Restore Confirmation Dialog */}
      <Dialog
        open={openRestoreDialog}
        onClose={handleCloseRestoreDialog}
      >
        <DialogTitle>
          Confirm Restoration
          <IconButton
            aria-label="close"
            onClick={handleCloseRestoreDialog}
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
            Are you sure you want to restore this contest?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRestoreDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmRestore} color="primary">
            Restore
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default DeletedContest;
