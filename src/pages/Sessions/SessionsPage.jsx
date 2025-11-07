// src/pages/Sessions/SessionsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { fetchSessions } from '../../features/sessions/sessionsSlice';

const SessionsPage = () => {
  const dispatch = useDispatch();
  const { sessions, loading, error } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Study Sessions
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message || 'An error occurred'}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {sessions.length === 0 ? (
            <Typography color="text.secondary">No sessions found.</Typography>
          ) : (
            sessions.map((session) => (
              <Box key={session.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <Typography variant="h6">{session.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {session.description}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      )}
    </Container>
  );
};

export default SessionsPage;
