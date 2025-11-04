import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SessionsGrid({ groupId }) {
  const KEY = `studysync_sessions_${groupId}`;
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setActive(parsed.active || []);
      setCompleted(parsed.completed || []);
    }
  }, [KEY]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ active, completed }));
  }, [active, completed, KEY]);

  const add = () => {
    if (!title.trim()) return;
    setActive((a) => [
      {
        id: crypto.randomUUID(),
        title,
        when: when || new Date().toISOString(),
      },
      ...a,
    ]);
    setTitle("");
    setWhen("");
  };

  const complete = (id) => {
    const s = active.find((x) => x.id === id);
    if (!s) return;
    setActive((a) => a.filter((x) => x.id !== id));
    setCompleted((c) => [
      { ...s, completedAt: new Date().toISOString() },
      ...c,
    ]);
  };

  const removeActive = (id) => setActive((a) => a.filter((x) => x.id !== id));
  const removeCompleted = (id) =>
    setCompleted((c) => c.filter((x) => x.id !== id));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Study Sessions
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ mb: 2 }}
        >
          <TextField
            label="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="When (optional)"
            type="datetime-local"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={add}>
            Add
          </Button>
        </Stack>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Active
        </Typography>
        <Table size="small" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>When</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {active.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No active sessions.
                </TableCell>
              </TableRow>
            ) : (
              active.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>{s.title}</TableCell>
                  <TableCell>{new Date(s.when).toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <IconButton color="success" onClick={() => complete(s.id)}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeActive(s.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Completed
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Completed At</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completed.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No completed sessions.
                </TableCell>
              </TableRow>
            ) : (
              completed.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>{s.title}</TableCell>
                  <TableCell>
                    {new Date(s.completedAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => removeCompleted(s.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
