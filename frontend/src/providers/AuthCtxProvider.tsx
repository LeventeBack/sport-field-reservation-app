import { useEffect, useState } from "react";
import { Token, User } from "../types/auth";
import { AuthContext } from "../contexts/AuthContext";
import authService from "../services/auth-service";
import useLocalStorage from "../hooks/useLocalStorage";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [token, setToken, clearToken] = useLocalStorage<Token | null>("token");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const { user } = await authService.validate();
        setUser(user);
      } catch (error) {
        setUser(null);
        clearToken();
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [token, clearToken]);

  const ctxValue = {
    user,
    token,
    setToken,
    logout: () => clearToken(),
    isLoading,
    setUser,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
