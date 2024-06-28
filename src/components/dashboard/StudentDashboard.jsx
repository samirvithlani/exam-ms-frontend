import { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";
import { PieComponent } from "../charts/PieComponent";
import "../../assets/css/chart.css";
import { constant } from "../../constant";

export const StudentDashboard = () => {
  const chartRef = useRef(null);
  const [history, sethistory] = useState([]);
  const [wallet, setwallet] = useState([]);
  const [students, setStudents] = useState([]);
  const [examData, setExamData] = useState([]);
  const TypographyProps = {
    variant: "h6",
    color: constant.backgroundColor,
  };
  const cardStyle = {
    border: "2px solid #ddd",
    // borderRadius: "20px",
    height: 140,
  };

  useEffect(() => {
    fetchData();
    fetchUserExam();
    fetchWalletData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsResponse = await axios.get("/user");
      const examResponse = await axios.get("/Exam");
      const studentsCount = studentsResponse.data.length;
      const examsCount = examResponse.data.length;
      setStudents(studentsCount);
      setExamData(examsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchUserExam = async () => {
    const _id = Cookies.get("_id");
    try {
      const response = await axios.get(`/userhistory/${_id}`);
      const historylength = response.data.length;
      console.log(historylength);
      sethistory(historylength);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchWalletData = async () => {
    try {
      const response = await axios.get(`/transcation/${Cookies.get("_id")}`);
      console.log(response.data.wallet.token);
      if (response) {
        setwallet(response.data.wallet.token);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <Grid
        container
        spacing={2}
        width="100%"
        sx={{
          // borderRadius: "8px",
          p: 2,
          ml: 0.1,
          mr: 0.1,
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
            // borderRadius: "20px",
            // mt: 2,
            ml: "0.1px",
            p: 2,
            background: constant.backgroundColor,
            pt: 10,
            gap: 1,
            width: "100%",
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
                  sx={{ color: constant.backgroundColor }}
                >
                  History
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color:constant.backgroundColor}}
                >
                  Total Exam Given : {history}
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
                <Typography variant="h4" sx={TypographyProps}>
                  Credit Detail
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: constant.backgroundColor }}
                >
                  Total Credit: {wallet || 0}
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
              <Typography variant="h4" sx={TypographyProps}>
                Exam Detail
              </Typography>
              <Typography
                variant="h6"
                sx={{ color:constant.backgroundColor }}
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
              <Typography variant="h4" sx={TypographyProps}>
                Exam Detail
              </Typography>
              <Typography
                variant="h6"
                sx={{ color:constant.backgroundColor }}
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
              height: 455,
              minHeight: 455,
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
              <Typography variant="h6" sx={TypographyProps}>
                Number of Exams Taken by Subject
              </Typography>
              <Typography variant="body1"></Typography>
              <Grid xs={12} sm={12} md={6.1} lg={6.1} xl={6.1} sx={{ mt: 2 }}>
                <PieComponent chartType="pie" apiToCall="subject" />
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
              height: 455,
              minHeight: 455,
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
              <Typography variant="h6" sx={TypographyProps}>
                Subject Wise Exam Marks
              </Typography>
              <Grid xs={12} sm={8} md={8} lg={8} xl={8} sx={{ mt: 10 }}>
                <PieComponent chartType="bar" apiToCall="examMarks" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
