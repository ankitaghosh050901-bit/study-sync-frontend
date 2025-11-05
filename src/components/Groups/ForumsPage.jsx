import React, { useMemo } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import ExploreIcon from "@mui/icons-material/Explore";
import groupData from "../../data/groupData";
import useJoinedGroups from "../../hooks/useJoinedGroups";
import GroupCard from "./GroupCard";
import { useNavigate } from "react-router-dom";

export default function ForumsPage() {
  const { joined, toggle } = useJoinedGroups();
  const navigate = useNavigate();

  const myGroups = useMemo(
    () => groupData.filter((g) => joined.includes(g.id)),
    [joined]
  );
  const exploreGroups = groupData;

  const handleView = (id) => navigate(`/groups/${id}`);

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", p: 4 }}>
      {/* MY FORUMS */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 1,
          color: "#1565c0",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ForumIcon /> My Forums
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Groups you have joined appear here.
      </Typography>

      <Grid container>
        {myGroups.length === 0 ? (
          <Typography sx={{ ml: 2, mb: 2 }} color="text.secondary">
            You have not joined any groups yet.
          </Typography>
        ) : (
          myGroups.map((g) => (
            <Grid item key={g.id}>
              <GroupCard
                id={g.id}
                title={g.name}
                overview={g.description}
                participants={g.participants}
                color={g.color}
                joined
                onJoin={toggle}
                onView={handleView}
              />
            </Grid>
          ))
        )}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* EXPLORE */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 1,
          color: "#0d47a1",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ExploreIcon /> Explore Groups
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Join a topic to add it automatically to “My Forums”.
      </Typography>

      <Grid container>
        {exploreGroups.map((g) => (
          <Grid item key={g.id}>
            <GroupCard
              id={g.id}
              title={g.name}
              overview={g.description}
              participants={g.participants}
              color={g.color}
              joined={joined.includes(g.id)}
              onJoin={toggle}
              onView={handleView}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
