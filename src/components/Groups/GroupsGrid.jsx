import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import GroupCard from "./GroupCard";
import GroupDetailPage from "./GroupDetailPage";
import apiClient from "../../services/apiClient";

const GroupsGrid = () => {
  const [selected, setSelected] = useState(null);
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all groups
    apiClient
      .get("/api/groups/")
      .then((response) => {
        setGroups(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
        setLoading(false);
      });

    // Fetch the user's joined groups
    apiClient
      .get("/api/groups/my-groups/")
      .then((response) => {
        const joinedGroupIds = response.data.map((group) => group.id);
        setJoinedGroups(joinedGroupIds);
      })
      .catch((error) => {
        console.error("Error fetching joined groups:", error);
      });
  }, []); // Run once on mount

  const joinGroup = (id) => {
    apiClient
      .post(`/api/groups/${id}/join/`, {})
      .then((response) => {
        if (response.data.detail === "Joined group") {
          setJoinedGroups((prev) => [...prev, id]);
        }
      })
      .catch((error) => {
        console.error("Error joining group:", error);
      });
  };

  if (selected) {
    return (
      <GroupDetailPage group={selected} onBack={() => setSelected(null)} />
    );
  }

  const joinedList = groups.filter((g) => joinedGroups.includes(g.id));
  const exploreList = groups.filter((g) => !joinedGroups.includes(g.id));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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

      {loading ? (
        <Typography>Loading groups...</Typography>
      ) : (
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
      )}

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
