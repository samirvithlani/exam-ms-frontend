import React from 'react';
import Card from '../Layouts/Card';
import '../../assets/layouts/card.css';
import { Grid } from '@mui/material';

export const AdminDashboard = () => {
  return (
    <Grid container className="app" spacing={1}>
    <Grid item xs={12} sm={6} md={3}>
      <Card  title="Card Title" description="This is a sample card description." />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Card title="Card Title" description="This is a sample card description." />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Card title="Card Title" description="This is a sample card description." />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Card title="Card Title" description="This is a sample card description." />
    </Grid>
  </Grid>
  );
};
