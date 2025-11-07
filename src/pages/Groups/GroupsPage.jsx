// src/pages/Groups/GroupsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { fetchGroups, fetchJoinedGroups, joinGroupAction } from '../../features/groups/groupsSlice';
import GroupCard from '../../components/Groups/GroupCard';
import GroupDetailPage from '../../components/Groups/GroupDetailPage';
import { useState } from 'react';

const GroupsPage = () => {
  const dispatch = useDispatch();
  const { exploreGroups, joinedGroups, loading, error } = useSelector((state) => state.groups);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    // Fetch both explore and joined groups on mount
    dispatch(fetchGroups());
    dispatch(fetchJoinedGroups());
  }, [dispatch]);

  const handleJoinGroup = (groupId) => {
    dispatch(joinGroupAction(groupId));
  };

  if (selectedGroup) {
    return (
      <GroupDetailPage group={selectedGroup} onBack={() => setSelectedGroup(null)} />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message || 'An error occurred'}
        </Alert>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h4">Explore Study Groups</Typography>
        <Button
          variant="outlined"
          onClick={() =>
            document
              .getElementById('my-groups-section')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          My Groups
        </Button>
      </Box>

      {loading && exploreGroups.length === 0 && joinedGroups.length === 0 ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container justifyContent="center">
          {exploreGroups.length === 0 ? (
            <Typography>You have joined all groups!</Typography>
          ) : (
            exploreGroups.map((g) => (
              <GroupCard
                key={g.id}
                title={g.name}
                participants={g.participants}
                overview={g.description}
                color={g.color}
                isJoined={false}
                onJoin={() => handleJoinGroup(g.id)}
                onView={() => setSelectedGroup(g)}
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
          {joinedGroups.length === 0 ? (
            <Typography color="text.secondary">
              You have not joined any groups yet.
            </Typography>
          ) : (
            joinedGroups.map((g) => (
              <GroupCard
                key={g.id}
                title={g.name}
                participants={g.participants}
                overview={g.description}
                color={g.color}
                isJoined={true}
                onView={() => setSelectedGroup(g)}
              />
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default GroupsPage;
