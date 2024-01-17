// UserDataFetcher.js
import React, { useEffect } from "react";
import axios_ from "@/api/axios";
import { useAuth } from "@/components/AuthProvider";

const UserDataFetcher = ({ onUserDataFetched }) => {
  const { setAuth } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios_.get("/api/users/me");
        setAuth(response.data);
        onUserDataFetched(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [setAuth, onUserDataFetched]);

  return null;
};

export default UserDataFetcher;
