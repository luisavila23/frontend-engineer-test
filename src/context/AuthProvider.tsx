import { useMemo, useState } from "react";
import { AuthContext } from "./auth-context";

const AUTH_TOKEN_KEY = "auth_token";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });

  const login = (username: string, password: string) => {
    if (username.trim() === "admin" && password.trim() === "1234") {
      const fakeToken = crypto.randomUUID();
      localStorage.setItem(AUTH_TOKEN_KEY, fakeToken);
      setToken(fakeToken);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
