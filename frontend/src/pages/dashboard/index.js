import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/components/AuthProvider";
import axios_ from "@/api/axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { refreshToken, setRefreshToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios_.get("/api/users/me");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const onLogUserOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios_.post(
        "/api/users/logout",
        {
          refresh_token: refreshToken,
          access_token: accessToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setAuth(false);
      sessionStorage.clear();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>Email: {user.email}</p>
      {console.log(user)}
      <button onClick={onLogUserOut}> Logout </button>
    </div>
  );
};

export default Dashboard;
