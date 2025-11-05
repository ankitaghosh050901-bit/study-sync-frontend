import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const GroupOverview = () => {
  const [groupName, setGroupName] = useState("My Study Group");
  const [description, setDescription] = useState(
    "This is my personal group for advanced topics."
  );
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    // You can connect this to backend later
    setEditing(false);
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>
        📘 Group Overview
      </Typography>

      {editing ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 600,
          }}
        >
          <TextField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            multiline
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography>
            <strong>Name:</strong> {groupName}
          </Typography>
          <Typography sx={{ marginBottom: 1 }}>
            <strong>Description:</strong> {description}
          </Typography>
          <Button variant="outlined" onClick={() => setEditing(true)}>
            Edit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GroupOverview;
