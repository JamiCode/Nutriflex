// SignUp.js
import React, { useState } from "react";
import "../../../app/globals.css";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";

const SignUp = () => {
  const router = useRouter();
  // States
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const [errorStateData, seterrorStateData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    non_field_errors: "",
  });

  const [loading, setLoading] = useState(false);
  const [isErrorModal, setisErrorModal] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error when the user types
    seterrorStateData((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const toggleModal = () => {
    setisErrorModal((previsErrorModal) => !previsErrorModal);
  };

  const toggleSuccessModal = () => {
    setIsSuccessModalOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // make a request to the endpoint using fetch-api
    const fetchObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(
        "https://nutriflex-ai.up.railway.app/api/users/create",
        fetchObject
      );
      if (!response.ok) {
        if (response.status >= 400) {
          const errorData = await response.json();
          // Extract and set errors in their respective states
          seterrorStateData({
            email: errorData.email ? errorData.email[0] : "",
            first_name: errorData.first_name ? errorData.first_name[0] : "",
            last_name: errorData.last_name ? errorData.last_name[0] : "",
            password: errorData.password ? errorData.password[0] : "",
            password2: errorData.password2 ? errorData.password2[0] : "",
            non_field_errors: errorData.non_field_errors
              ? errorData.non_field_errors[0]
              : "",
          });

          // Open the modal if non_field_errors is present
          if (errorData.non_field_errors) {
            toggleModal();
          }
        }
      } else {
        const data = await response.json();
        console.log(data);
        toggleSuccessModal();
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-gray-800 text-white">
      <Head>
        <title> Sign Up </title>
      </Head>
      <NavBar />
      <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center font-sans">
        <div className="max-w-xl w-full p-8 bg-gray-700 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Create your account
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md bg-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300 ${
                  errorStateData.email && "border-red-500"
                }`}
                placeholder="Enter your email"
                required
              />
              {errorStateData.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errorStateData.email}
                </p>
              )}
            </div>
            {/* First Name */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md bg-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300 ${
                  errorStateData.first_name && "border-red-500"
                }`}
                placeholder="Enter your first name"
                required
              />
              {errorStateData.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errorStateData.first_name}
                </p>
              )}
            </div>
            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md bg-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300 ${
                  errorStateData.last_name && "border-red-500"
                }`}
                placeholder="Enter your last name"
                required
              />
              {errorStateData.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errorStateData.last_name}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-300 text-sm mb-2">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md bg-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300 ${
                  errorStateData.password && "border-red-500"
                }`}
                placeholder="Enter your password"
                required
              />
              {/* Eye toggle button */}
              <div
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLineCap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLineCap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M2 8s3 0 4 0 2 3 2 3 1 1 2 2 3 2 6 0"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M3 4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm3 0a1 1 0 011-1h8a1 1 0 011 1v3H6V4z"
                    ></path>
                  </svg>
                )}
              </div>
              {errorStateData.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errorStateData.password}
                </p>
              )}
            </div>
            {/* Confirm Password */}
            <div className="mb-6 relative">
              <label className="block text-gray-300 text-sm mb-2">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md bg-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300 ${
                  errorStateData.password2 && "border-red-500"
                }`}
                placeholder="Confirm your password"
                required
              />
              {/* Eye toggle button */}
              <div
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLineCap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLineCap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M2 8s3 0 4 0 2 3 2 3 1 1 2 2 3 2 6 0"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M3 4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm3 0a1 1 0 011-1h8a1 1 0 011 1v3H6V4z"
                    ></path>
                  </svg>
                )}
              </div>
              {errorStateData.password2 && (
                <p className="text-red-500 text-sm mt-1">
                  {errorStateData.password2}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#525CEB] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-300">Already have an account?</p>
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Log in here
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isErrorModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Error</h2>
            <p className="text-red-500">{errorStateData.non_field_errors}</p>
            <button
              onClick={toggleModal}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Success</h2>
            <p className="text-green-500">Account created successfully</p>
            <button
              onClick={() => {
                toggleSuccessModal();
                router.push("/auth/login"); // Navigate to login page
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Proceed to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
