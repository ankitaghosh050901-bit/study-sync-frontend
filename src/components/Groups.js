import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import GroupCard from "./components/Groups/GroupCard";
import groupData from "./data/groupData";
import useJoinedGroups from "./hooks/useJoinedGroups";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const { joinedGroups, joinGroup } = useJoinedGroups();

  useEffect(() => {
    setGroups(groupData);
  }, []);

  const joinedGroupList = groups.filter((g) => joinedGroups.includes(g.id));
  const exploreGroupList = groups.filter((g) => !joinedGroups.includes(g.id));

  return (
    <Container>
      {/* 🔼 MOVED: My Groups comes first */}
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          My Groups
        </Typography>
        {joinedGroupList.length === 0 ? (
          <Typography>You have not joined any groups yet.</Typography>
        ) : (
          joinedGroupList.map((group) => (
            <GroupCard key={group.id} group={group} isJoined />
          ))
        )}
      </Box>

      {/* 🔽 Explore Groups comes after */}
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Explore Study Groups
        </Typography>
        {exploreGroupList.length === 0 ? (
          <Typography>You’ve joined all groups!</Typography>
        ) : (
          exploreGroupList.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              isJoined={false}
              onJoin={() => joinGroup(group.id)}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default Groups;
