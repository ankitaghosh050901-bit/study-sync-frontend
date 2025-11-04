import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadDialog from "./UploadDialog";
import DocumentTable from "./DocumentTable";

const STORAGE_KEY = "studysync_docs_single";

export default function DocumentsPage() {
  const [open, setOpen] = useState(false);
  const [docs, setDocs] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setDocs(JSON.parse(saved));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  }, [docs]);

  const handleUpload = (newItem) => {
    setDocs((prev) => [newItem, ...prev]);
  };

  const handleDelete = (id) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 2 }}>
      <Typography className="page-title">Documents</Typography>

      <Card>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            gap={2}
          >
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              All Uploaded Files
            </Typography>

            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => setOpen(true)}
              sx={{ alignSelf: "flex-end" }}
            >
              Upload
            </Button>
          </Stack>

          <Box sx={{ mt: 2 }}>
            <DocumentTable rows={docs} onDelete={handleDelete} />
          </Box>
        </CardContent>
      </Card>

      <UploadDialog
        open={open}
        onClose={() => setOpen(false)}
        category="Documents"
        onUpload={handleUpload}
      />
    </Box>
  );
}
