import React, { useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import GroupCard from "./GroupCard";
import groupData from "../../data/groupData";
import GroupDetailPage from "./GroupDetailPage";

const GroupsGrid = () => {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <GroupDetailPage group={selected} onBack={() => setSelected(null)} />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Explore Study Groups
      </Typography>
      <Grid container justifyContent="center">
        {groupData.map((g) => (
          <GroupCard
            key={g.id}
            title={g.name}
            participants={g.participants}
            overview={g.description}
            color={g.color}
            onJoin={() => alert(`Joined ${g.name}`)}
            onView={() => setSelected(g)}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default GroupsGrid;
