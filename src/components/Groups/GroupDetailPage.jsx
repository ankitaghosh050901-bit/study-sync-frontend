import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";

//  IMPORTANT: correct relative import (Groups → Sessions)
import ViewSessionPage from "../Sessions/ViewSessionPage";
import ToDoGrid from "./ToDoGrid";
import GroupDocuments from "./GroupDocuments";

export default function GroupDetailPage({ group, onBack, isAdmin = false }) {
  const [selectedSession, setSelectedSession] = useState(null);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLeaveGroup = async () => {
    setLoading(true);
    try {
      await GroupService.leaveGroup(group.id);
      setSuccess("Successfully left the group");
      setTimeout(() => onBack(), 1500);
    } catch (err) {
      console.error("Error leaving group:", err);
      setError(err.response?.data?.detail || "Failed to leave group");
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userToken = localStorage.getItem("access_token");

  const handleLeaveGroup = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `/api/groups/${group.id}/leave/`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      if (response.data.detail === "Left group") {
        setSuccess("Successfully left the group");
        // Remove from local storage and go back after a short delay
        const joined = JSON.parse(localStorage.getItem("joined_groups_v1") || "[]");
        localStorage.setItem(
          "joined_groups_v1",
          JSON.stringify(joined.filter(id => id !== group.id))
        );
        setTimeout(() => onBack(), 1500);
      }
    } catch (err) {
      console.error("Error leaving group:", err);
      setError(err.response?.data?.detail || "Failed to leave group");
    } finally {
      setLoading(false);
    }
  };

  // Demo data
  const activeSessions = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      date: "Nov 12, 2025",
      time: "10:00 AM",
    },
    {
      id: 2,
      title: "Redux Fundamentals",
      date: "Nov 15, 2025",
      time: "5:00 PM",
    },
  ];
  const completedSessions = [
    { id: 3, title: "JSX Basics", date: "Nov 01, 2025", time: "6:00 PM" },
  ];
  const pendingApprovals = [
    {
      id: 99,
      title: "Session Notes.pdf",
      type: "PDF",
      size: "2 MB",
      uploaded: "User001",
      userId: "User001",
    },
  ];

  //  If a session is selected, show the session page
  if (selectedSession) {
    return (
      <ViewSessionPage
        session={selectedSession}
        group={group}
        isAdmin={isAdmin}
        onBack={() => setSelectedSession(null)} // ⬅ back to group details
      />
    );
  }

  // ⬇ Normal Group Details page
  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", p: 4 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={onBack}
        sx={{
          mb: 3,
          color: group.color,
          borderColor: group.color,
          "&:hover": { backgroundColor: group.color, color: "#fff" },
        }}
      >
        ← Back to Groups
      </Button>

      {/* Group Header */}
      <Card
        sx={{
          background: `linear-gradient(135deg, ${group.color}33, ${group.color}11)`,
          borderLeft: `6px solid ${group.color}`,
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          mb: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ color: group.color, fontWeight: 700, mb: 1 }}
          >
            {group.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {group.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, fontWeight: 500, color: "text.secondary" }}
          >
             Participants: {group.participants}
          </Typography>
        </CardContent>
      </Card>

      {/* Study Sessions */}
      <Card
        sx={{ borderRadius: 3, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", mb: 4 }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{ color: group.color, fontWeight: 700, mb: 2 }}
            >
              Study Sessions
            </Typography>
            {isAdmin && (
              <Button
                variant="contained"
                sx={{ bgcolor: group.color, "&:hover": { bgcolor: "#000" } }}
              >
                + Schedule Session
              </Button>
            )}
          </Box>

          {/* Active */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 1, color: "#00796b" }}
          >
            Active Sessions
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeSessions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.title}</TableCell>
                  <TableCell>{s.date}</TableCell>
                  <TableCell>{s.time}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        bgcolor: group.color,
                        color: "#fff",
                        "&:hover": { bgcolor: "#000" },
                      }}
                      onClick={() => setSelectedSession(s)} // ⬅ navigate to session page
                    >
                      {isAdmin ? "Open Session" : "View Session"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Completed */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 1, color: "#455a64" }}
          >
            Completed Sessions
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Completed On</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedSessions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.title}</TableCell>
                  <TableCell>{s.date}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: group.color,
                        color: group.color,
                        "&:hover": { bgcolor: group.color, color: "#fff" },
                      }}
                      onClick={() => setSelectedSession(s)} // ⬅ open read-only session view
                    >
                      View Session
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Documents with tabs */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
          >
            <Tab label="Uploaded Documents" />
            {isAdmin && <Tab label="Pending Approvals" />}
          </Tabs>

          {tab === 0 && (
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  variant="h6"
                  sx={{ color: '#fffff', fontWeight: 600 }}
                >
                  Uploaded Documents
                </Typography>
                <Button
                  startIcon={<UploadFileIcon />}
                  variant="contained"
                  sx={{ bgcolor: group.color, "&:hover": { bgcolor: "#000" } }}
                >
                  Upload Document
                </Button>
              </Box>
              <GroupDocuments groupId={group.id} isAdmin={isAdmin} />
            </Box>
          )}

          {isAdmin && tab === 1 && (
            <Box>
              <Typography
                variant="h6"
                sx={{ color: group.color, fontWeight: 600, mb: 2 }}
              >
                Pending Approvals
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Uploaded By</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingApprovals.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.userId}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            bgcolor: "#4caf50",
                            color: "#fff",
                            mr: 1,
                            "&:hover": { bgcolor: "#2e7d32" },
                          }}
                        >
                          Approve
                        </Button>
                        <Button size="small" variant="outlined" color="error">
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Bottom grid for Tasks & Docs if you want more content density */}
      {/* <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: group.color, fontWeight: 600, mb: 2 }}
              >
                To-Do Tasks
              </Typography>
              <ToDoGrid groupId={group.id} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: group.color, fontWeight: 600, mb: 2 }}
              >
                Documents
              </Typography>
              <GroupDocuments groupId={group.id} isAdmin={isAdmin} />
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </Box>
  );
}
