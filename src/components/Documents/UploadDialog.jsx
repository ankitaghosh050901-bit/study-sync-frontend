import React, { useRef, useState } from "react";
import {
Dialog, DialogTitle, DialogContent, DialogActions,
TextField, Button, Stack, MenuItem
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const TYPES = ["PDF", "DOCX", "PPTX", "Image", "Other"];

export default function UploadDialog({ open, onClose, category, onUpload }) {
const fileRef = useRef(null);
const [title, setTitle] = useState("");
const [type, setType] = useState("PDF");
const [userId, setUserId] = useState("");

const reset = () => {
setTitle(""); setType("PDF"); setUserId("");
if (fileRef.current) fileRef.current.value = "";
};

const handleSubmit = () => {
const file = fileRef.current?.files?.[0];
if (!file || !title || !userId) return;

const id = crypto.randomUUID();
const url = URL.createObjectURL(file); // for download/preview
onUpload({
id,
title,
type,
userId,
fileName: file.name,
size: file.size,
uploadedAt: new Date().toISOString(),
url
});
reset();
onClose();
};

return (
<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
<DialogTitle>Upload Document</DialogTitle>
<DialogContent dividers>
<Stack gap={2} sx={{ mt: 1 }}>
<TextField
label="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
fullWidth
/>
<TextField
label="User ID"
value={userId}
onChange={(e) => setUserId(e.target.value)}
fullWidth
/>
<TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)}>
{TYPES.map((t) => (
<MenuItem key={t} value={t}>{t}</MenuItem>
))}
</TextField>
<Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
Choose File
<input ref={fileRef} hidden type="file" />
</Button>
</Stack>
</DialogContent>
<DialogActions>
<Button onClick={onClose}>Cancel</Button>
<Button variant="contained" onClick={handleSubmit}>Upload</Button>
</DialogActions>
</Dialog>
);
}