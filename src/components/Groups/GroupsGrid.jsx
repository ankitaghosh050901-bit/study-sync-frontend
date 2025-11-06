import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Box, Button, Alert } from "@mui/material";
import GroupCard from "./GroupCard";
import GroupDetailPage from "./GroupDetailPage";
import CreateGroupModal from "./CreateGroupModal";
import { GroupService } from "../../services/api";

const GroupsGrid = () => {
  const [selected, setSelected] = useState(null);
  const [availableGroups, setAvailableGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [adminGroups, setAdminGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    setError("");
    try {
      const [available, joined, admin] = await Promise.all([
        GroupService.listGroups(),
        GroupService.getMyGroups(),
        GroupService.getMyAdminGroups()
      ]);
      
      setAvailableGroups(available.data);
      setJoinedGroups(joined.data);
      setAdminGroups(admin.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError("Failed to load groups. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async (newGroup) => {
    try {
      await GroupService.createGroup(newGroup);
      fetchGroups(); // Refresh the lists
    } catch (err) {
      console.error("Error creating group:", err);
      setError("Failed to create group. Please try again.");
    }
  };

  const joinGroup = async (id) => {
    try {
      await GroupService.joinGroup(id);
      fetchGroups(); // Refresh lists after joining
    } catch (err) {
      console.error("Error joining group:", err);
      setError("Failed to join group. Please try again.");
    }
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateModalOpen(true)}
          >
            Create Group
          </Button>
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
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography>Loading groups...</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {availableGroups.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center">No available groups to join!</Typography>
            </Grid>
          ) : (
            availableGroups.map((g) => (
              <Grid item xs={12} sm={6} md={4} key={g.id}>
                <GroupCard
                  key={g.id}
                  title={g.name}
                  overview={g.description}
                  color="#1976d2"
                  createdBy={g.created_by.username}
                  createdAt={new Date(g.created_at).toLocaleDateString()}
                  isJoined={false}
                  onJoin={() => joinGroup(g.id)}
                  onView={() => setSelected(g)}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* My Groups Section */}
      <Box id="my-groups-section" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          My Groups
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            <Grid item xs={12}>
              <Typography>Loading groups...</Typography>
            </Grid>
          ) : joinedGroups.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="text.secondary" align="center">
                You have not joined any groups yet.
              </Typography>
            </Grid>
          ) : (
            joinedGroups.map((g) => (
              <Grid item xs={12} sm={6} md={4} key={g.id}>
                <GroupCard
                  key={g.id}
                  title={g.name}
                  overview={g.description}
                  color="#1976d2"
                  createdBy={g.created_by.username}
                  createdAt={new Date(g.created_at).toLocaleDateString()}
                  isJoined={true}
                  isAdmin={adminGroups.some(ag => ag.id === g.id)}
                  onView={() => setSelected(g)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      
      <CreateGroupModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleCreateGroup}
      />
    </Container>
  );
};

export default GroupsGrid;
