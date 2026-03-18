import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./auth-context";

const AUTH_TOKEN_KEY = "auth_token";
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "1234";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });

  const login = useCallback((username: string, password: string) => {
    if (
      username.trim() === DEMO_USERNAME &&
      password.trim() === DEMO_PASSWORD
    ) {
      const fakeToken = crypto.randomUUID();
      localStorage.setItem(AUTH_TOKEN_KEY, fakeToken);
      setToken(fakeToken);
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [login, logout, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
