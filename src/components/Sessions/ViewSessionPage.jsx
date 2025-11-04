import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ViewSessionPage({ session, group, onBack, isAdmin }) {
  const [task, setTask] = useState("");
  const [goal, setGoal] = useState("");
  const [activeTasks, setActiveTasks] = useState([
    {
      id: 1,
      task: "Revise React Lifecycle",
      goal: "Understand class vs hooks",
    },
    { id: 2, task: "Build Todo App", goal: "Apply components and props" },
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAdd = () => {
    if (task.trim()) {
      setActiveTasks([...activeTasks, { id: Date.now(), task, goal }]);
      setTask("");
      setGoal("");
    }
  };

  const handleComplete = (id) => {
    const completed = activeTasks.find((t) => t.id === id);
    setCompletedTasks([...completedTasks, completed]);
    setActiveTasks(activeTasks.filter((t) => t.id !== id));
  };

  const handleDelete = (id) => {
    setActiveTasks(activeTasks.filter((t) => t.id !== id));
    setCompletedTasks(completedTasks.filter((t) => t.id !== id));
  };

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
        ← Back to Sessions
      </Button>

      {/* Header */}
      <Card
        sx={{
          background: `linear-gradient(135deg, ${group.color}33, ${group.color}11)`,
          borderLeft: `6px solid ${group.color}`,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ color: group.color, fontWeight: 700 }}>
            {session.title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            📅 {session.date} | 🕒 {session.time}
          </Typography>
        </CardContent>
      </Card>

      {/* Task Management Section */}
      <Card
        sx={{ borderRadius: 3, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", mb: 4 }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ color: group.color, fontWeight: 700, mb: 2 }}
          >
            {isAdmin ? "Manage Group Tasks" : "My Tasks"}
          </Typography>

          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Task"
                fullWidth
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="Goal / Notes"
                fullWidth
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: group.color, "&:hover": { bgcolor: "#000" } }}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Active Tasks */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#00796b", mb: 1 }}
          >
            Active Tasks
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Task</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Goal / Notes</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeTasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.task}</TableCell>
                  <TableCell>{t.goal}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<CheckCircleIcon />}
                      sx={{
                        color: "#4caf50",
                        textTransform: "none",
                      }}
                      onClick={() => handleComplete(t.id)}
                    >
                      Mark Complete
                    </Button>
                    {isAdmin && (
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Completed Tasks */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#455a64", mb: 1 }}
          >
            Completed Tasks
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Task</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Goal / Notes</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedTasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.task}</TableCell>
                  <TableCell>{t.goal}</TableCell>
                  <TableCell>
                    {isAdmin && (
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
