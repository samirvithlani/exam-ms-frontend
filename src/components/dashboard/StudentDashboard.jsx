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
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{ background: "rgb(67,157,240)", ...cardStyle, mb: 2 }}
          >
            <Grid container className="card-content" direction="column" spacing={0}>
              <Typography variant="h4" sx={{color:"white",fontFamily:"Lato"}}>Student Detail</Typography>
              <Typography variant="h6" sx={{color:"black",fontFamily:"Lato"}}>
                {/* Total student in portal:{students} */}
              </Typography>
            </Grid>
          </Grid>
    
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{ background: "rgb(96,183,100)", ...cardStyle, mb: 2 }}
          >
            <Grid container className="card-content" direction="column" spacing={0}>
            <Typography variant="h4" sx={{color:"white",fontFamily:"Lato"}}>Exam Detail</Typography>
            <Typography variant="h6" sx={{color:"black",fontFamily:"Lato"}}>
                {/* Total no of exam in portal:{examData} */}
              </Typography>
            </Grid>
          </Grid>
    
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{ background: "rgb(52,52,58)", ...cardStyle, mb: 2 }}
          >
            <Grid container className="card-content" direction="column" spacing={0}>
              <Typography variant="h4">Card 3</Typography>
              <Typography variant="body1">
                This is a sample card description.
              </Typography>
            </Grid>
          </Grid>
    
          {/* Second Row */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              background: "white",
              ...cardStyle,
              height: 500,
              mb: 2,
              marginTop: 10,
              border: "1px solid black",
            }}
          >
            <Grid container className="card-content" direction="column" spacing={0}>
              <Typography variant="h4">Card 4</Typography>
              <Typography variant="body1">
                Please create bar chart here for students
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
}

