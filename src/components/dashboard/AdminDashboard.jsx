import { React, useEffect, useState } from "react";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";

import axios from "axios";

export const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [examData, setExamData] = useState([]);
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "20px",
    height: 140,
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const studentsResponse = await axios.get("/user");
    const examResponse = await axios.get("/Exam");
    const studentsCount = studentsResponse.data.length;
    const examsCount = examResponse.data.length;
    setStudents(studentsCount);
    setExamData(examsCount);
  };

  return (
    <Grid
      container
      spacing={2}
      width="100%"
      sx={{
        borderRadius: "8px",
        mt: 2,
        ml: 0.1,
        p: 2,
      }}
    >
      {/* First Row */}
      <Grid
        container
        spacing={2}
        width="100%"
        sx={{
          maxheight: "100%",
          height: "400px",
          borderRadius: "20px",
          mt: 2,
          ml: 0.1,
          p: 2,
          background: "rgb(94,114,228)",
          pt: 10,
          gap: 1,
        }}
      >
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          style={{ background: "rgb(255,255,255)", ...cardStyle, mb: 2 }}
        >
          <Grid
            container
            className="card-content"
            direction="column"
            spacing={0}
          >
            <Typography
              variant="h4"
              sx={{ color: "rgb(103,116,142)", fontFamily: "Lato" }}
            >
              Student Detail
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "black", fontFamily: "Lato" }}
            >
              Total student in portal:{students}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          style={{ background: "rgb(255,255,255)", ...cardStyle, mb: 2 }}
        >
          <Grid
            container
            className="card-content"
            direction="column"
            spacing={0}
          >
            <Typography
              variant="h4"
              sx={{ color: "rgb(103,116,142)", fontFamily: "Lato" }}
            >
              Student Detail
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "black", fontFamily: "Lato" }}
            >
              Total student in portal:{students}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          style={{ background: "rgb(255,255,255)", ...cardStyle, mb: 2 }}
        >
          <Grid
            container
            className="card-content"
            direction="column"
            spacing={0}
          >
            <Typography
              variant="h4"
              sx={{ color: "rgb(103,116,142)", fontFamily: "Lato" }}
            >
              Exam Detail
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "black", fontFamily: "Lato" }}
            >
              Total no of exam in portal:{examData}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={2.7}
          md={2.7}
          lg={2.7}
          xl={2.7}
          style={{ background: "rgb(255,255,255)", ...cardStyle, mb: 2 }}
        >
          <Grid
            container
            className="card-content"
            direction="column"
            spacing={0}
          >
            <Typography
              variant="h4"
              sx={{ color: "rgb(103,116,142)", fontFamily: "Lato" }}
            >
              Exam Detail
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "black", fontFamily: "Lato" }}
            >
              Total no of exam in portal:{examData}
            </Typography>
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid
          item
          xs={12}
          sm={6.1}
          md={6.1}
          lg={6.1}
          xl={6.1}
          style={{
            background: "rgb(255,255,255)",
            ...cardStyle,
            height: 380,
            mb: 2,
            marginTop: 10,
            border: "1px solid white",
          }}
        >
          <Grid
            container
            className="card-content"
            direction="column"
            spacing={0}
          >
            <Typography variant="h4">Card 4</Typography>
            <Typography variant="body1"></Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5.8}
          md={5.8}
          lg={5.8}
          xl={5.8}
          style={{
            background: "rgb(255,255,255)",
            ...cardStyle,
            height: 380,
            mb: 2,
            marginTop: 10,
            border: "1px solid white",
          }}
        >
          <Grid
            container
            className="card-content"
            direction="column"
            spacing={0}
          >
            <Typography variant="h4">Card 4</Typography>
            <Typography variant="body1"></Typography>
            
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
