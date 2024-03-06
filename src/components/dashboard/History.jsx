import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Grid, Typography, useTheme, Paper } from "@mui/material";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { useDemoData } from "@mui/x-data-grid-generator";

const Historyofuser = () => {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const theme = useTheme();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });
  const columns = [
    { field: "displayid", headerName: "ID", width: 90 },
    { field: "name", headerName: "Exam Name", width: 200 },
    { field: "examType", headerName: "Exam Type", width: 150 },
    { field: "noOfQuestions", headerName: "No. of Questions", width: 180 },
    { field: "totalmarks", headerName: "Total Marks", width: 140 },
    { field: "result", headerName: "Result", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => viewAnswer(params.row.id)}
        >
          View Answer
        </Button>
      ),
    },
  ];

  const viewAnswer = (id) => {
    navigate(`/userDasboard/viewAnswers/${id}`);
  };
  const paperStyle = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: "auto",
    backgroundColor: "white", // Set the background color to grey
    m1: 2,
  };
  const fetchData = async () => {
    const _id = Cookies.get("_id");
    try {
      setisLoading(true);
      const response = await axios.get(`/userhistory/${_id}`);
      const filteredData = response.data.map((exam, index) => ({
        id: exam._id || index,
        displayid: index + 1,
        name: exam.exam_id.name,
        examType: exam.exam_type?.type,
        noOfQuestions: exam.exam_id.noofquestions || 0,
        totalmarks: exam.total_marks,
        result: exam.result,
      }));
      setHistories(filteredData);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Grid style={{ height: 400, width: "100%" }}>
      <Paper sx={paperStyle} className="responsive-container">
        {isLoading ? (
          <CustomeLoader />
        ) : (
          <>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: 30, sm: 40, md: 50 } }}
            >
              Past Exam{" "}
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
                  width: "60vw ",
                  height: "50vh",
                },
              }}
            >
              <DataGrid
                autoHeight
                sx={{
                  border: "none",
                  fontFamily: "Lato",
                  // overflowY:"auto"
                }}
                rows={histories}
                columns={columns}
                initialState={{
                  ...data.initialState,
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                disableSelectionOnClick
              />
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default Historyofuser;
