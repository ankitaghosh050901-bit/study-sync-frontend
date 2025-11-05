import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import GroupCard from "./GroupCard";
import groupData from "../../data/groupData";
import GroupDetailPage from "./GroupDetailPage";

const GroupsGrid = () => {
  const [selected, setSelected] = useState(null);
  const [joinedGroups, setJoinedGroups] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("joined_groups_v1") || "[]");
    setJoinedGroups(stored);
  }, []);

  // Save joined groups to localStorage
  useEffect(() => {
    localStorage.setItem("joined_groups_v1", JSON.stringify(joinedGroups));
  }, [joinedGroups]);

  const joinGroup = (id) => {
    if (!joinedGroups.includes(id)) {
      setJoinedGroups([...joinedGroups, id]);
    }
  };

  if (selected) {
    return (
      <GroupDetailPage group={selected} onBack={() => setSelected(null)} />
    );
  }

  const joinedList = groupData.filter((g) => joinedGroups.includes(g.id));
  const exploreList = groupData.filter((g) => !joinedGroups.includes(g.id));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Explore Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4">Explore Study Groups</Typography>
        <Button
          variant="outlined"
          onClick={() =>
            document
              .getElementById("my-groups-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          My Groups
        </Button>
      </Box>

      <Grid container justifyContent="center">
        {exploreList.length === 0 ? (
          <Typography>You have joined all groups!</Typography>
        ) : (
          exploreList.map((g) => (
            <GroupCard
              key={g.id}
              title={g.name}
              participants={g.participants}
              overview={g.description}
              color={g.color}
              isJoined={joinedGroups.includes(g.id)}
              onJoin={() => joinGroup(g.id)}
              onView={() => setSelected(g)}
            />
          ))
        )}
      </Grid>

      {/* My Groups Section */}
      <Box id="my-groups-section" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          My Groups
        </Typography>

        <Grid container justifyContent="center">
          {joinedList.length === 0 ? (
            <Typography color="text.secondary">
              You have not joined any groups yet.
            </Typography>
          ) : (
            joinedList.map((g) => (
              <GroupCard
                key={g.id}
                title={g.name}
                participants={g.participants}
                overview={g.description}
                color={g.color}
                isJoined={true}
                onView={() => setSelected(g)}
              />
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default GroupsGrid;
