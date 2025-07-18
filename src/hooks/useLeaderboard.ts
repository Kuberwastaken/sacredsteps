import { useState, useEffect } from 'react';
import { useBoundStore } from "~/hooks/useBoundStore";

export const useLeaderboardUsers = () => {
  const xpThisWeek = useBoundStore((x) => x.xpThisWeek());
  const name = useBoundStore((x) => x.name);
  const [dynamicUsers, setDynamicUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/test-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'leaderboard',
            currentUserXP: xpThisWeek,
            userCount: 15,
            includeDiversity: true
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setDynamicUsers(data.data.users);
          }
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [xpThisWeek]);

  const userInfo = {
    name,
    xp: xpThisWeek,
    isCurrentUser: true,
  } as const;

  const allUsers = [...dynamicUsers, userInfo];
  return { users: allUsers.sort((a, b) => b.xp - a.xp), loading };
};

export const useLeaderboardRank = () => {
  const { users: leaderboardUsers } = useLeaderboardUsers();
  const index = leaderboardUsers.findIndex((user) => user.isCurrentUser);
  return index === -1 ? null : index + 1;
};
