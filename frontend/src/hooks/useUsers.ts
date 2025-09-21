import { useState, useEffect } from "react";
import userService from "../services/user-service";
import { User, UserStatus } from "../types/auth";
import { getFilteredUsers } from "../utils/filter";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await userService.getAll();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const updateUserStatus = async (id: number, status: UserStatus) => {
    try {
      const user = users.find((user) => user.id === id);
      if (!user) return;

      const updatedUser = { ...user, status };
      await userService.update(updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = getFilteredUsers(users, searchQuery, filter);

  return {
    filteredUsers,
    updateUserStatus,
    searchQuery,
    filter,
    setSearchQuery,
    setFilter,
  };
};

export default useUsers;
