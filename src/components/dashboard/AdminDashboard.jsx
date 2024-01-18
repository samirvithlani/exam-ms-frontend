import React from "react";
import Card from "../Layouts/Card";
import "../../assets/layouts/card.css";
import { Grid } from "@mui/material";

export const AdminDashboard = () => {
  const cardStyle = {
    backgroundColor: "rgb(69, 39, 160)",
    border: "1px solid #ddd",
    borderRadius: "8px",
  };

  return (
    <Grid
      container
      gap={0.5}
      sx={{
        backgroundColor: "rgb(54, 65, 82)",
        borderRadius: "8px",
        mt: 0.5,
        ml: 0.5,
        width: "100%", // Set width to 100% for responsiveness
        mx: "auto", // Center horizontally        
      }}
    >
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <Card
          title="Card Title"
          description="This is a sample card description."
          cardStyle={cardStyle}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <Card
          title="Card Title"
          description="This is a sample card description."
          cardStyle={{
            backgroundColor: "rgb(30, 136, 229)",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card
          title="Card Title"
          description="This is a sample card description."
        />
      </Grid>
    </Grid>
  );
};
