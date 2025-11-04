import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "grey.200", p: 2, mt: "auto", textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} StudySync. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
