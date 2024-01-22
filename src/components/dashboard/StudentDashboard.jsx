import React from 'react'
import { Grid, Typography } from "@mui/material";

export const StudentDashboard = () => {
    const cardStyle = {
        backgroundColor: "rgb(94, 53, 177)",
        border: "1px solid #ddd",
        borderRadius: "20px",
        height: 200,
        
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
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ background: "pink", ...cardStyle, mb: 2 }}>
            <Grid container className="card-content" direction="column" spacing={0}>
              <Typography variant="h4">Card 1</Typography>
              <Typography variant="body1">Print no of student in portal</Typography>
            </Grid>
          </Grid>
    
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ background: "pink", ...cardStyle, mb: 2 }}>
            <Grid container className="card-content" direction="column" spacing={0}>
              <Typography variant="h4">Card 2</Typography>
              <Typography variant="body1">Print not of exam in portal.</Typography>
            </Grid>
          </Grid>
    
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ background: "pink", ...cardStyle, mb: 2 }}>
            <Grid container className="card-content" direction="column" spacing={0}>
              <Typography variant="h4">Card 3</Typography>
              <Typography variant="body1">This is a sample card description.</Typography>
            </Grid>
          </Grid>
    
          {/* Second Row */}
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8} style={{ background: "pink", ...cardStyle, height: 500, mb: 2 }}>
            <Grid container className="card-content" direction="column" spacing={0}>
              <Typography variant="h4">Card 4</Typography>
              <Typography variant="body1">Please create bar chart here for students</Typography>
            </Grid>
          </Grid>
    
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ background: "pink", ...cardStyle, height: 500, mb: 2 }}>
            <Grid container className="card-content" direction="column" spacing={0}>
              <Typography variant="h4">Card 5</Typography>
              <Typography variant="body1">This is another card in the second row.</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
}

