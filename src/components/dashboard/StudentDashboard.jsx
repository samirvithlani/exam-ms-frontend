import { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Chart from "chart.js/auto";
import Cookies from 'js-cookie'

export const StudentDashboard = () => {
  const chartRef = useRef(null);
  const[history,sethistory] = useState([]);
  const[wallet,setwallet] = useState([])
  const [students, setStudents] = useState([]);
  const [examData, setExamData] = useState([]);
  const cardStyle = {
    border: "2px solid #ddd",
    borderRadius: "20px",
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

      // Destroy previous chart instance before rendering a new one
      if (chartRef.current !== null && chartRef.current !== undefined) {
        chartRef.current.destroy();
      }
      // Render the chart
      const ctx = document.getElementById("myChart");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchUserExam = async () => {
        const _id = Cookies.get('_id');
        try {
          const response = await axios.get(`/userhistory/${_id}`);
          const historylength = response.data.length
          console.log(historylength);
          sethistory(historylength); 
        }catch(error){
          console.log(error,"error");
      }}
    
    const fetchWalletData = async () => {
        try {
            const response = await axios.get(`/transcation/${Cookies.get('_id')}`);
            console.log(response.data.wallet.token);
            if(response){
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
          borderRadius: "8px",
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
            // mt: 2,
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
              style={{ position: "relative" }}
            >
              <div>
                <Typography
                  variant="h4"
                  sx={{ color: "rgb(103,116,142)", fontFamily: "Lato" }}
                >
                  Exam History 
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "black", fontFamily: "Lato" }}
                >
                Total Exam Given : {history}

                </Typography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  marginTop: 8,
                  marginRight: 10,
                }}
              >
                <g fill="none" strokeLinejoin="round" strokeWidth="4">
                  <rect
                    width="40"
                    height="40"
                    x="6"
                    y="6"
                    fill="rgb(117,101,228)"
                    stroke="#000"
                    rx="3"
                  />
                  <rect
                    width="8"
                    height="8"
                    x="13"
                    y="13"
                    fill="#43CCF8"
                    stroke="#fff"
                  />
                  <path stroke="#fff" strokeLinecap="round" d="M27 13L35 13" />
                  <path stroke="#fff" strokeLinecap="round" d="M27 20L35 20" />
                  <path stroke="#fff" strokeLinecap="round" d="M13 28L35 28" />
                  <path stroke="#fff" strokeLinecap="round" d="M13 35H35" />
                </g>
              </svg>
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
                  sx={{ color: "rgb(103,116,142)", fontFamily: "Lato" }}
                >
                  Credit Detail
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "black", fontFamily: "Lato" }}
                >
                  Total Credit: {wallet}
                </Typography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  marginTop: 8,
                  marginRight: 10,
                }}
              >
                <g fill="none" stroke="#F5484C" strokeWidth="2">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M18.572 6.421c-.724.782-1.685 1.424-2.805 1.872A10.17 10.17 0 0 1 12.133 9a10.273 10.273 0 0 1-3.664-.615C7.33 7.964 6.34 7.346 5.583 6.583m12.989 10.996c-.724-.782-1.685-1.424-2.805-1.872A10.17 10.17 0 0 0 12.133 15a10.272 10.272 0 0 0-3.664.615c-1.139.42-2.128 1.038-2.886 1.801M12 4v16m8-8H4" />
                </g>
              </svg>
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
              <Typography
                variant="h4"
                sx={{ color: "rgb(103,116,142)", fontFamily: "Lato" }}
              >
                Portal Detail
              </Typography>
              <Typography variant="body1"></Typography>
              <Grid xs={12} sm={6.1} md={6.1} lg={6.1} xl={6.1} sx={{ mt: 2 }}>
                <canvas
                  id="myChart"
                  style={{ width: "100%", height: "100%" }}
                />
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
              <Typography variant="h4">Card 4</Typography>
              <Typography variant="body1"></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
