import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDetail = () => {
  const [userData, setUserData] = useState({});
  const [examData, setExamData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchdata();
    fetchUserData();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`/userhistory/${id}`);
      const exams = response.data.map(item => ({
        id: item?._id ,
        examName: item?.exam_id?.name,
        score: item?.result,
        date: item?.date,
        totalmarks:item?.exam_id?.totalmarks
      }));
      setExamData(exams);
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const result = await axios.get(`/user/${id}`);
      setUserData(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onSubmit = async (data) => {
    // Update user data
  };
const viewAnswer = async(examid)=>{
  console.log(examid,"examid");
  navigate(`/adminDashboard/viewAnswers/${examid}`);
}
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
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
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Edit Profile
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("firstname")}
                label="First Name"
                defaultValue={userData.firstname}
                fullWidth
                margin="normal"
              />
              <TextField
                {...register("lastname")}
                label="Last Name"
                defaultValue={userData.lastname}
                fullWidth
                margin="normal"
              />
              <TextField
                {...register("email")}
                label="Email"
                defaultValue={userData.email}
                fullWidth
                margin="normal"
              />
              <TextField
                {...register("phone")}
                label="Phone"
                defaultValue={userData.phone}
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Given Exams
            </Typography>
            <Grid container spacing={2}>
              {examData.map((exam, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{exam.examName}</Typography>
                      <Typography variant="body2">
                        Score: {exam.score}/{exam?.totalmarks}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                        onClick={() => viewAnswer(exam.id)}
                      >
                        View Result
                      </Button>
                      {/* <Typography variant="body2">Date: {new Date(exam.date).toLocaleDateString()}</Typography> */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Chart 1
            </Typography>
            {/* Space for first chart */}
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Chart 2
            </Typography>
            {/* Space for second chart */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentDetail;
