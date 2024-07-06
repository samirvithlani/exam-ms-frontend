import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  LinearProgress,
} from "@mui/material";
import { Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { constant } from "../../constant";


const DeletedMcq = () => {
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  const [removemcq, setremovemcq] = useState([]);
  const [isLoading, setisLoading] = useState(false)

  const fetchMcqs = async () => {
    setisLoading(true)
    try {
      const response = await axios.get("/mcq");
      if (response.status === 200) {
        const removequestions = response?.data.filter(
          (mcq) => mcq.isActive === false
        );
        setremovemcq(removequestions);
      }
      setisLoading(false)
    } catch (error) {
      console.log(error);
      setisLoading(false)
    }
  };

  useEffect(() => {
    
    fetchMcqs();
  }, []);
  const handledelete = async (questionid) => {
    setisLoading(true)
    console.log(questionid, "questionid");
    try {
      const response = await axios.delete(`/mcq/${questionid}`);
      if (response.status === 200) {
        setremovemcq((prevMcqs) =>
          prevMcqs.filter((mcq) => mcq._id !== questionid)
        );

        toast.success("Question Deleted Sucessfully");
      }
      setisLoading(false)
    } catch (error) {
      console.log(error, "error");
      toast.error("Error while Delete the Question");
      setisLoading(false)
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      {
        isLoading && <LinearProgress/>
      }
      
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
                <IconButton
                  onClick={() => handledelete(mcq._id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </TableContainer>
    </ThemeProvider>
  );
};

export default DeletedMcq;
