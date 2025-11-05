import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grow,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ bgcolor }) => ({
  borderLeft: `6px solid ${bgcolor}`,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

const GroupCard = ({
  title,
  participants,
  overview,
  color,
  onJoin,
  onView,
  isJoined = false,
}) => {
  return (
    <Grow in timeout={400}>
      <StyledCard
        sx={{
          bgcolor: "#fff",
          width: 300,
          m: 2,
          borderRadius: 3,
        }}
        bgcolor={color}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ color, fontWeight: "bold", mb: 1 }}>
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, minHeight: 40 }}
          >
            {overview}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            👥 Participants: {participants}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            {isJoined ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  disabled
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  Joined
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: color,
                    color,
                    "&:hover": { bgcolor: color, color: "#fff" },
                  }}
                  onClick={onView}
                >
                  View Group
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: color,
                    color: "#fff",
                    "&:hover": { bgcolor: "#000" },
                  }}
                  onClick={onJoin}
                >
                  Join Group
                </Button>
                <Button
                  variant="outlined"
                  disabled
                  sx={{ borderColor: "lightgray", color: "gray" }}
                >
                  View Group
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </StyledCard>
    </Grow>
  );
};

export default GroupCard;
