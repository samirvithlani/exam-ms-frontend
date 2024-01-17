import React from 'react';
import { Grid,Typography } from '@mui/material';
const Card = (props) => {
  const cardStyle = {
    backgroundColor:  '#ffcccb' ,
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  };
  return (
    <Grid container className="card" style={cardStyle}>
    <Grid item>
      <Grid container className="card-content" direction="column" spacing={1}>
          <Typography variant="h4">{props.title}</Typography>
          <Typography variant="body1">{props.description}</Typography>
      </Grid>
    </Grid>
  </Grid>
  );
};

export default Card;
