import { useEffect, useState } from "react";

const LS_KEY = "joined_groups_v1";

export default function useJoinedGroups() {
  const [joinedGroups, setJoinedGroups] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(joinedGroups));
  }, [joinedGroups]);

  const joinGroup = (id) => {
    setJoinedGroups((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const isJoined = (id) => joinedGroups.includes(id);

  return { joinedGroups, joinGroup, isJoined };
}
