import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import Cookies from "js-cookie";

export const PieComponent = ({ chartType, apiToCall, data,isUserSide,userId }) => {
  console.log(isUserSide,userId)
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Call the appropriate function based on the prop value
    if (data) {
      getChartFromData();
      return;
    }
    if (apiToCall === "examMarks") {
      getLoogedinUserDataExamMarksVise();
    } else if (apiToCall === "subject") {
      getLoggedInUserDataSubjectVise();
    }
  }, [apiToCall]);

  const getLoogedinUserDataExamMarksVise = async () => {
    var _id
    if(userId==undefined){
      console.log("inside.......................................")
     _id= Cookies.get("_id");
    }
    else{
      _id = userId
    }

    try {
      if(_id!=undefined){

      const response = await axios.get("/chart2/" + _id);
      const dataFromApi = response.data;

      if (dataFromApi && dataFromApi.length > 0) {
        const labels = dataFromApi.map((item) => item.examName);
        const data = dataFromApi.map((item) => item.marks);

        const newData = {
          labels: labels,
          datasets: [
            {
              label: "Exam Marks",
              data: data,
              backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
            },
          ],
        };
        setChartData(newData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }} catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  
  const getLoggedInUserDataSubjectVise = async () => {
    var _id
    if(userId==undefined){
     _id= Cookies.get("_id");
    }
    else{
      _id = userId
    }


    try {
      
      const response = await axios.get("/chart1/" + _id);
      const dataFromApi = response.data;

      if (dataFromApi && dataFromApi.length > 0) {
        const labels = dataFromApi.map((item) => item.subject);
        const data = dataFromApi.map((item) => item.totalExams);

        const newData = {
          labels: labels,
          datasets: [
            {
              label: "Exam Count",
              data: data,
              backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
            },
          ],
        };
        setChartData(newData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getChartFromData = () => {
    if (data && data.length > 0) {
      const labels = data.map((item) => item.label);
      const data = data.map((item) => item.value);

      const newData = {
        labels: labels,
        datasets: [
          {
            label: "Data",
            data: data,
            backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
          },
        ],
      };
      setChartData(newData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const options = {
    responsive: true,
  };

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (
    !chartData ||
    (chartData.labels.length === 0 && chartData.datasets[0].data.length === 0)
  ) {
    return (
      <Typography variant="body1">Not enough data to show chart.</Typography>
    );
  }

  switch (chartType) {
    case "pie":
      return (
        <Box sx={{ width: "100%", minWidth: "300px", height: "auto", maxHeight: "350px" }}>
          <Pie data={chartData} options={options} />
        </Box>
      );
    case "line":
      return <Line data={chartData} options={options} />;
    case "bar":
      return (
        <Box sx={{ width: "100%", minWidth: "300px", height: "auto", maxHeight: "400px" }}>
          <Bar data={chartData} options={options} />
        </Box>
      );
    default:
      return null; // Render nothing if an invalid chart type is provided
  }
};
