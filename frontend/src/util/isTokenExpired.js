import { useContext } from "react";
import AuthContext from "@/components/AuthProvider";

const useTokenExpiration = () => {
  const { accessToken } = useContext(AuthContext);

  const isTokenExpired = (token) => {
    if (!token) {
      return true; // Treat undefined or empty token as expired
    }

    const [, payloadBase64] = token.split(".");
    const decodedPayload = JSON.parse(atob(payloadBase64));

    const expirationTime = decodedPayload.exp * 1000; // Convert seconds to milliseconds
    const currentTime = Date.now();

    return expirationTime < currentTime;
  };

  const isAccessTokenExpired = isTokenExpired(accessToken);

  return {
    isAccessTokenExpired,
  };
};

export default useTokenExpiration;
