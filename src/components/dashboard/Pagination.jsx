import React from "react";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const Pagination = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  attemptedQuestions,
}) => {
  const totalQuestions = questions.length;
  const attemptedCount = attemptedQuestions.length;
  const progress = (attemptedCount / totalQuestions) * 100;

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Progress: {attemptedCount} / {totalQuestions} Questions Attempted
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        style={{ marginBottom: "20px", height: "10px", borderRadius: "5px" }}
      />
      <Grid container spacing={0.5} justifyContent="center">
        {questions.map((_, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white", // All boxes white
                borderRadius: "20%", // Circular shape
                width: "20px",  // Small width
                height: "50px",  // Small height
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",  // Smaller font size
                padding: "2px",  // Reduced padding
                border: "1px solid #ccc", // Light border for visibility
              }}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              <div
                style={{
                  color: attemptedQuestions.includes(questions[index]._id)
                    ? "green"
                    : "red", // Number color based on attempt status
                }}
              >
                {index + 1} {/* Question number */}
              </div>
              {attemptedQuestions.includes(questions[index]._id) ? (
                <SentimentSatisfiedAltIcon style={{ color: "green", height: "20px" }} />
              ) : (
                <SentimentDissatisfiedIcon style={{ color: "red", height: "20px" }} />
              )}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Pagination;
