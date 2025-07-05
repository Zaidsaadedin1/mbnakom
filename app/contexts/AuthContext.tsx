import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DecodedToken, decodeToken } from "../utils/authDecode";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type AuthContextType = {
  user: DecodedToken | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();
  const { i18n } = useTranslation("menuComponent");
  const currentLang = i18n.language;

  useEffect(() => {
    // Get token from cookies
    const token = getCookie("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
      } else {
        logout();
      }
    }
  }, []);

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));

    return cookieValue ? cookieValue.split("=")[1] : null;
  };

  const login = (token: string) => {
    // Set cookie that will be sent with requests
    document.cookie = `token=${token}; path=/; max-age=${
      30 * 24 * 60 * 60
    }; SameSite=Strict`;

    const decoded = decodeToken(token);
    if (decoded) setUser(decoded);
  };

  const logout = () => {
    // Remove cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/", undefined, { locale: currentLang });
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
