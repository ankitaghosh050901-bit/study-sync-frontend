import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  IconButton,
  Checkbox,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ToDoGrid({ groupId }) {
  const KEY = `studysync_todos_${groupId}`;
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setRows(JSON.parse(saved));
  }, [KEY]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(rows));
  }, [rows, KEY]);

  const add = () => {
    if (!title.trim()) return;
    setRows((r) => [
      {
        id: crypto.randomUUID(),
        title,
        notes,
        done: false,
        createdAt: new Date().toISOString(),
      },
      ...r,
    ]);
    setTitle("");
    setNotes("");
  };

  const toggle = (id) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const remove = (id) => setRows((r) => r.filter((x) => x.id !== id));

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Goal / Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={add}>
          Add
        </Button>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Done</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Goal / Notes</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No tasks yet.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>
                  <Checkbox checked={r.done} onChange={() => toggle(r.id)} />
                </TableCell>
                <TableCell
                  sx={{ textDecoration: r.done ? "line-through" : "none" }}
                >
                  {r.title}
                </TableCell>
                <TableCell>{r.notes || "-"}</TableCell>
                <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => remove(r.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}
