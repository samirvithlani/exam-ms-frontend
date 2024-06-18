import { React, useEffect, useState } from "react";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import icon1 from "./../../assets/logos/icon1.svg";
import { constant } from "../../constant";

import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

export const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [examData, setExamData] = useState([]);
  const[question,setQuestion] = useState([]);
  const cardStyle = {
    border: "2  px solid #ddd",
    borderRadius: "20px",
    height: 140,
  };
  const [data, setdata] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],

    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const studentsResponse = await axios.get("/user");
    const examResponse = await axios.get("/Exam");
    const question = await axios.get("/mcq")
    const totalQuestions = question?.data.length;
    const studentsCount = studentsResponse.data.length;
    const examsCount = examResponse.data.length;
    setStudents(studentsCount);
    setExamData(examsCount);
    setQuestion(totalQuestions)
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
          background: constant.backgroundColor,
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
            style={{ position: "relative" }}
          >
            <div>
              <Typography
                variant="h4"
                sx={{ color: constant.backgroundColor}}
              >
                Student Detail
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "black", fontFamily: "Lato" }}
              >
                Total student in portal: {students}
              </Typography>
            </div>
           
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
            style={{ position: "relative" }}
          >
            <div>
              <Typography
                variant="h4"
                sx={{ color: constant.backgroundColor}}
              >
                Student Detail
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "black", fontFamily: "Lato" }}
              >
                Total student in portal: {students}
              </Typography>
            </div>
         
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
              sx={{ color:constant.backgroundColor}}
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
              sx={{ color: constant.backgroundColor }}
            >
              Question Detail
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "black", fontFamily: "Lato" }}
            >
              Total no of question in portal:{question}
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
            <Typography
              variant="h4"
              sx={{ color: constant.backgroundColor}}
            >
              Portal Detail
            </Typography>
            <Typography variant="body1"></Typography>
            <Grid xs={12} sm={6.1} md={6.1} lg={6.1} xl={6.1} sx={{ mt: 2 }}>
             chart here...
            </Grid>
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
             <Typography
              variant="h4"
              sx={{ color: constant.backgroundColor}}
            >
              Students Detail
            </Typography>
            <Typography variant="body1"></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
