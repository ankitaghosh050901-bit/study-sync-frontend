import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadDialog from "../Documents/UploadDialog";
import DocumentTable from "../Documents/DocumentTable";

export default function GroupDocuments({ groupId }) {
  const KEY = `studysync_docs_${groupId}`;
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setRows(JSON.parse(saved));
  }, [KEY]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(rows));
  }, [rows, KEY]);

  const onUpload = (it) => setRows((r) => [it, ...r]);
  const onDelete = (id) => setRows((r) => r.filter((x) => x.id !== id));

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Documents</Typography>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => setOpen(true)}
          >
            Upload
          </Button>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <DocumentTable rows={rows} onDelete={onDelete} />
        </Box>
        <UploadDialog
          open={open}
          onClose={() => setOpen(false)}
          category="Documents"
          onUpload={onUpload}
        />
      </CardContent>
    </Card>
  );
}
