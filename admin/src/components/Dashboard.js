import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Dashboard = () => {
  // Metrics data
  const metrics = {
    totalCategories: 10,
    totalProducts: 25,
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Categories</Typography>
              <Typography>{metrics.totalCategories}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Products</Typography>
              <Typography>{metrics.totalProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
