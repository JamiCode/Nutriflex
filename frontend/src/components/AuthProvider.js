import axios from "@/api/axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  auth: false,
  setAuth: () => {},
  user: {},
  accessToken: "",
  setAccessToken: () => {},
  refreshToken: "",
  setRefreshToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const router = useRouter();

  const redirectToHome = () => {
    const allowedPaths = ["/", "/auth/register", "/auth/login"];

    if (!allowedPaths.includes(window.location.pathname)) {
      window.location.pathname = "/";
      router.push("/");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionStorageAccessToken =
        sessionStorage.getItem("accessToken") || "";
      const sessionStorageRefreshToken = sessionStorage.getItem("refreshToken");
      setAccessToken(sessionStorageAccessToken)
      setRefreshToken(sessionStorageRefreshToken)
      console.log(sessionStorageAccessToken);
      console.log(sessionStorageRefreshToken);

      if (!sessionStorageAccessToken) {
        setAuth(false);
        redirectToHome();
      } else if (window.location.pathname !== "/dashboard") {
        setAuth(true);
        window.location.pathname = "/dashboard";
      } else {
        setAuth(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
