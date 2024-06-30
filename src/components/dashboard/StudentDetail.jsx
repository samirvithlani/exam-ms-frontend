import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { constant } from "../../constant";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { PieComponent } from "../charts/PieComponent";

const StudentDetail = () => {
  const [userData, setUserData] = useState({});
  const [examData, setExamData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchdata();
    fetchUserData();
  }, []);

  const fetchdata = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(`/userhistory/${id}`);
      const exams = response.data.map((item) => ({
        id: item?._id,
        examName: item?.exam_id?.name,
        score: item?.result,
        date: item?.date,
        totalmarks: item?.exam_id?.totalmarks,
      }));
      setExamData(exams);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching exam data:", error);
      setisLoading(false);
    }
  };

  const fetchUserData = async () => {
    setisLoading(true);
    try {
      const result = await axios.get(`/user/${id}`);
      setUserData(result.data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  const viewAnswer = (examid) => {
    console.log(examid, "examid");
    navigate(`/adminDashboard/viewAnswers/${examid}`);
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor,
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <CustomeLoader />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                color={constant.backgroundColor}
              >
                Given Exams List
              </Typography>
              <Grid container spacing={2}>
                {examData.map((exam, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      sx={{
                        boxShadow: 3,
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          color={constant.backgroundColor}
                        >
                          {exam.examName}
                        </Typography>
                        <Typography variant="body2">
                          Score: {exam.score}/{exam.totalmarks}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginTop: 2 }}
                          onClick={() => viewAnswer(exam.id)}
                        >
                          View Result
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: 3, boxShadow: 3 }}>
            <CardContent>
              <PieComponent chartType="pie" apiToCall="subject" userId={id} />
              {/* Space for first chart */}
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: 3, boxShadow: 3 }}>
            <CardContent>
              
                <PieComponent
                  chartType="bar"
                  apiToCall="examMarks"
                  userId={id}
                />
              
              {/* Space for second chart */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, padding: 2 }}>
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                color={constant.backgroundColor}
              >
                User Profile
              </Typography>
              <Avatar
                alt="Profile"
                src={userData.profilePic}
                sx={{
                  width: 100,
                  height: 100,
                  marginBottom: 2,
                  bgcolor: "#010080",
                  fontSize: 40,
                }}
              >
                {userData?.firstname?.charAt(0)}
                {userData?.lastname?.charAt(0)}
              </Avatar>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Name: {userData.firstname} {userData.lastname}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email: {userData.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Phone: {userData.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default StudentDetail;
