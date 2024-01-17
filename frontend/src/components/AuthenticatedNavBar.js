// AuthenticatedNavBar.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const CustomLink = ({ href, children }) => (
  <div className="text-lg text-light-gray hover:underline cursor-pointer">
    {children}
  </div>
);

const AuthenticatedNavBar = ({ userFirstName }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked!");
    closeDropdown();
  };

  return (
    <nav className="bg-sci-fi-blue"> {/* Update background color */}
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none md:hidden"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* Add your logo component or image here */}
          {/* <img src="/path/to/your/logo.png" alt="Logo" className="h-10" /> */}
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          {isDropdownOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50"></div>
          )}
          {isDropdownOpen && (
            <div className="fixed top-0 right-0 p-4 bg-gray-900 z-50">
              <button
                onClick={closeDropdown}
                className="text-white focus:outline-none"
              >
                Close
              </button>
              <CustomLink href="/workoutplans">Workout Plans</CustomLink>
              <div className="text-white cursor-pointer" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <CustomLink href="/workoutplans">Workout Plans</CustomLink>
          <div
            className="text-lg text-white cursor-pointer"
            onClick={toggleDropdown}
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-2">{userFirstName}</span>
          </div>
          {isDropdownOpen && (
            <div className="ml-2">
              <button
                onClick={handleLogout}
                className="text-white hover:underline"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AuthenticatedNavBar;
