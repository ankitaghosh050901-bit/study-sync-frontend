import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";

const Groups = () => {
  // simple placeholder groups page
  const sampleGroups = [
    { id: 1, name: "Math Study Group", members: 8 },
    { id: 2, name: "Physics Review", members: 5 },
    { id: 3, name: "Chemistry Lab Prep", members: 12 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 4, sm: 8 }, px: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        My Groups
      </Typography>
      <Grid container spacing={2}>
        {sampleGroups.map((g) => (
          <Grid item xs={12} sm={6} md={4} key={g.id}>
            <Paper sx={{ p: 2 }} elevation={2}>
              <Typography variant="h6">{g.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Members: {g.members}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Groups;
