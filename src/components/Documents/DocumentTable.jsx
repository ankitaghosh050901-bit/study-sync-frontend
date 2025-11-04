import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

function formatBytes(b) {
  if (!b && b !== 0) return "-";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0;
  let x = b;
  while (x >= 1024 && i < u.length - 1) {
    x /= 1024;
    i++;
  }
  return `${x.toFixed(1)} ${u[i]}`;
}

export default function DocumentTable({ rows, onDelete }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>File</TableCell>
          <TableCell>Size</TableCell>
          <TableCell>Uploaded</TableCell>
          <TableCell>User ID</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} align="center">
              No documents yet.
            </TableCell>
          </TableRow>
        ) : (
          rows.map((r) => (
            <TableRow key={r.id} hover>
              <TableCell>{r.title}</TableCell>
              <TableCell>{r.type}</TableCell>
              <TableCell>{r.fileName}</TableCell>
              <TableCell>{formatBytes(r.size)}</TableCell>
              <TableCell>{new Date(r.uploadedAt).toLocaleString()}</TableCell>
              <TableCell>{r.userId || "N/A"}</TableCell>
              <TableCell align="right">
                <Tooltip title="Download">
                  <IconButton component="a" href={r.url} download={r.fileName}>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => onDelete(r.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
