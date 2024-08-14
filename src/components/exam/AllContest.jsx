import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Button, Box, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";
import { constant } from "../../constant";
import { CustomeLoader } from "../Layouts/CustomeLoader";

const Container = styled.div`
  padding: 16px;
`;

const CustomButton = styled(Button)`
  margin-top: 8px;
`;

const AllContest = () => {
  const [contests, setContests] = useState([]);
  const [participantContests, setParticipantContests] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const Id = Cookies.get("_id");

  useEffect(() => {
    fetchContests();
    if (location.pathname === "/userDasboard/allcontest") {
      fetchParticipantContests();
    }
  }, [location.pathname]);

  const fetchContests = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(`/contest`);
      setContests(response?.data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error("Error fetching contests:", error);
    }
  };

  const fetchParticipantContests = async () => {
    try {
      setisLoading(true);
      
      const response = await axios.get(`/userparticipant/${Id}`);
      setParticipantContests(response?.data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error("Error fetching participant contests:", error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/adminDashboard/contestdetail/${id}`);
  };

 
  const isContestExpired = (endDate) => {
    return new Date(endDate) < new Date();
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
      {isLoading && <CustomeLoader />}
      <Typography variant="h4" gutterBottom sx={{ color: constant.backgroundColor }}>
        Contests
      </Typography>
      <Grid container spacing={3}>
        {contests.map((contest) => (
          <Grid key={contest._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Box
              bgcolor="white"
              border="1px solid #ccc"
              borderRadius="10px"
              padding="20px"
              textAlign="center"
              onClick={location.pathname !== "/userDasboard/allcontest" ? () => handleCardClick(contest._id) : null}
              sx={{
                cursor: location.pathname !== "/userDasboard/allcontest" ? "pointer" : "default",
                boxShadow: 3,
                transition: "transform 0.2s",
                width: "100%",
                "&:hover": {
                  transform: location.pathname !== "/userDasboard/allcontest" ? "scale(1.05)" : "none",
                },
                margin: "0 auto", // Centering the box
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h5" component="div" sx={{ color: constant.backgroundColor }}>
                {contest.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Date: {new Date(contest.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                End Date: {new Date(contest.endDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Subjects:
                {contest.subject.map((subject) => (
                  <span key={subject._id}> {subject.name},</span>
                ))}
              </Typography>
              {location.pathname === "/userDasboard/allcontest" && (
                <CustomButton
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                   
                      navigate(`/userDasboard/contestdetail/${contest._id}`);
                   
                  }}
                  disabled={isContestExpired(contest.endDate)}
                >
                View Contest
                </CustomButton>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default AllContest;
