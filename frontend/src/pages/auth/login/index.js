// Login.js
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import NavBar from "@/components/NavBar";
import "../../../app/globals.css";
import AuthContext from "@/components/AuthProvider";
import axios_ from "@/api/axios";
import AuthenticatedNavBar from "@/components/AuthenticatedNavBar";
import Head from "next/head";

const LOGIN_URL = "/api/users/token";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { refreshToken, setRefreshToken } = useContext(AuthContext);

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading indicator state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Clear error message on user input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading to true when the form is submitted
    setLoading(true);

    // Initialize a variable to store the timeout ID
    let timeoutId;

    // Set up a timeout to show the modal after 40 seconds
    const showTimeoutModal = () => {
      timeoutId = setTimeout(() => {
        // Set loading back to false
        setLoading(false);

        // Show the modal
        setShowTimeoutModal(true);
      }, 40000); // 40 seconds
    };

    // Function to clear the timeout
    const clearTimeoutModal = () => {
      clearTimeout(timeoutId);
    };

    try {
      // Show the timeout modal after 40 seconds
      showTimeoutModal();

      const response = await axios_.post(LOGIN_URL, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const { access, refresh } = response?.data;

      // Store tokens in the authentication context
      setAuth(true);
      setAccessToken(access);
      setRefreshToken(refresh);

      // Store tokens in session storage
      sessionStorage.setItem("accessToken", access);
      sessionStorage.setItem("refreshToken", refresh);

      // Redirect to the dashboard or another page upon successful login
      router.push("/dashboard");
    } catch (error) {
      // Handle login error
      setErrorMessage(error.response.data.detail);
    } finally {
      // Clear the timeout when the response is received
      clearTimeoutModal();

      // Set loading back to false when the response is received
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white">
      <Head>
        <title> Login </title>
      </Head>
      <NavBar />
      <div className=" text-white min-h-screen flex items-center justify-center font-sans">
        <div className="max-w-xl w-full p-8 bg-gray-700 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4 relative">
              <label className="block text-gray-300 text-sm mb-2">
                Email Address
              </label>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-500 mr-3"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6 relative">
              <label className="block text-gray-300 text-sm mb-2">
                Password
              </label>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-3" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}

            {/* Submit Button with Loading Indicator */}
            <button
              type="submit"
              className="w-full bg-[#525CEB] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 relative"
              disabled={loading}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* You can use any loading spinner here */}
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
              Login
            </button>
          </form>

          {/* Don't have an account? Sign up */}
          <div className="mt-4 text-center">
            <p className="text-gray-300">Don't have an account?</p>
            <a href="/auth/register" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
