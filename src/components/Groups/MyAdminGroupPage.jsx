import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { CloudUpload, Task } from "@mui/icons-material";
import GroupOverview from "./GroupOverview";

const MyAdminGroupPage = () => {
  const [docInput, setDocInput] = useState({ title: "", file: null });
  const [documents, setDocuments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ task: "", notes: "" });

  // Upload document
  const handleDocUpload = () => {
    if (!docInput.title || !docInput.file) {
      alert("Please provide both title and file.");
      return;
    }

    const newDoc = {
      title: docInput.title,
      file: {
        name: docInput.file.name,
        type: docInput.file.type,
        size: docInput.file.size,
      },
      approved: false,
    };

    setDocuments([...documents, newDoc]);
    setDocInput({ title: "", file: null });
  };

  const approveDoc = (index) => {
    const updated = [...documents];
    updated[index].approved = true;
    setDocuments(updated);
  };

  // Task functions
  const handleAddTask = () => {
    if (!taskInput.task) return;

    const newTask = {
      ...taskInput,
      created: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);
    setTaskInput({ task: "", notes: "" });
  };

  const removeTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Admin Group Dashboard
      </Typography>

      {/* GROUP OVERVIEW */}
      <GroupOverview />

      {/* DOCUMENT SECTION */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">
          <CloudUpload sx={{ verticalAlign: "middle", marginRight: 1 }} />
          Uploaded Documents
        </Typography>
        <Typography variant="body1" color="textSecondary">
          (This section will include uploaded documents with approval.)
        </Typography>

        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <TextField
            label="Document Title"
            value={docInput.title}
            onChange={(e) =>
              setDocInput({ ...docInput, title: e.target.value })
            }
          />
          <Button variant="outlined" component="label">
            Choose File
            <input
              type="file"
              hidden
              onChange={(e) =>
                setDocInput({ ...docInput, file: e.target.files[0] })
              }
            />
          </Button>
          <Button variant="contained" onClick={handleDocUpload}>
            Upload
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Size (KB)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.file?.name}</TableCell>
                <TableCell>{doc.file?.type}</TableCell>
                <TableCell>{(doc.file?.size / 1024).toFixed(1)}</TableCell>
                <TableCell>{doc.approved ? "Approved" : "Pending"}</TableCell>
                <TableCell>
                  {!doc.approved && (
                    <Button
                      variant="outlined"
                      onClick={() => approveDoc(index)}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* TASK SECTION */}
      <Box sx={{ marginTop: 6 }}>
        <Typography variant="h6">
          <Task sx={{ verticalAlign: "middle", marginRight: 1 }} />
          To-Do Tasks
        </Typography>
        <Typography variant="body1" color="textSecondary">
          (This section will manage task submissions and approvals.)
        </Typography>

        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <TextField
            label="Task"
            value={taskInput.task}
            onChange={(e) =>
              setTaskInput({ ...taskInput, task: e.target.value })
            }
          />
          <TextField
            label="Goal / Notes"
            value={taskInput.notes}
            onChange={(e) =>
              setTaskInput({ ...taskInput, notes: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Goal / Notes</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.task}</TableCell>
                <TableCell>{task.notes}</TableCell>
                <TableCell>{task.created}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeTask(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default MyAdminGroupPage;
