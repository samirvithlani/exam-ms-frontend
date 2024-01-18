import React from 'react';
import { Grid,Typography } from '@mui/material';
const Card = (props) => {
  
  return (
    <Grid container className="card" style={{...props.cardStyle,background:"pink"}}  >
    <Grid item>
      <Grid container className="card-content" direction="column" spacing={0}>
          <Typography variant="h4">{props.title}</Typography>
          <Typography variant="body1">{props.description}</Typography>
      </Grid>
    </Grid>
  </Grid>
  );
};

export default Card;
