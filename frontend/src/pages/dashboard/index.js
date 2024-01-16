import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/components/AuthProvider";
import axios_ from "@/api/axios";

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { refreshToken, setRefreshToken } = useContext(AuthContext);

  const [user, setUser] = useState(null);

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

  return (
    <div>
      <p>Email: {user.email}</p>
      {/* Render other user details */}
    </div>
  );
};

export default Dashboard;
