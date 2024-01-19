import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";
import axios_ from "@/api/axios";
import { useRouter } from "next/router";

const AuthenticatedNavBar = ({ userFirstName }) => {
  const router = useRouter();
  const handleLogout = async () => {
    const access_token_data = sessionStorage.getItem("accessToken");
    const refresh_token_data = sessionStorage.getItem("refreshToken");

    try {
      const response = await axios_.post(
        "/api/users/logout  ",
        {
          access_token: access_token_data,
          refresh_token: refresh_token_data,
        },
        {
          withCredentials: true,
        }
      );
      sessionStorage.clear();
      router.push("/");
    } catch (error) {
      console.log(error);
      sessionStorage.clear();
      router.push("/");
    }
  };

  return (
    <Navbar
      style={{
        backgroundColor: "#3330E4",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
      variant="dark"
      expand="lg"
    >
      {/* Your Logo */}
      <Navbar.Brand href="#home">
        <img
          src={
            "https://media.discordapp.net/attachments/1192825905077309612/1197078880276713491/Nutriflex_logoT_2.png?ex=65b9f595&is=65a78095&hm=23b703afd2e4fbd09b079e3514540a37703271452cbdaf81db0850e038433681&=&format=webp&quality=lossless&width=455&height=455"
          }
          style={{
            height: "4rem",
            weight: "4rem",
          }}
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Your other navigation links go here */}
          <Nav.Link href="/workoutplans">Workout Plans</Nav.Link>
        </Nav>

        {/* User Profile Dropdown */}
        <NavDropdown
          title={
            <span className="d-inline-block">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {userFirstName}
            </span>
          }
          id="basic-nav-dropdown"
          align="end" // Align the dropdown to the right
        >
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AuthenticatedNavBar;
