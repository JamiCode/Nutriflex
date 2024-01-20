import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";
import axios_ from "@/api/axios";
import { useRouter } from "next/router";
import Image from "react-bootstrap/Image";

const AuthenticatedNavBar = ({ userFirstName }) => {
  const router = useRouter();
  const handleLogout = async () => {
    const access_token_data = sessionStorage.getItem("accessToken");
    const refresh_token_data = sessionStorage.getItem("refreshToken");

    try {
      const response = await axios_.post(
        "/api/users/logout",
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
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* Logo */}
      <Navbar.Brand
        href="/dashboard"
        className="d-flex align-items-center text-white font-weight-bold"
        style={{
          fontSize: "2.5rem",
        }}
      >
        <Image
          src={
            "https://media.discordapp.net/attachments/1192825905077309612/1197075610846117929/Nutriflex_logot.png?ex=65b9f28a&is=65a77d8a&hm=e540374cb86eea5d0b45dce09cdaba698eecfd52164db0d4ec055ee1f17425cd&=&format=webp&quality=lossless&width=455&height=455"
          } // Replace with your logo URL
          alt="Logo"
          roundedCircle // Add this prop if your logo is circular
          className="mr-2"
          style={{ width: "60px", height: "60px" }} // Adjust the size here
        />
        NutriFlex
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* Username with Dropdown for Logout */}
          <NavDropdown
            title={
              <span className="d-inline-block">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                {userFirstName}
              </span>
            }
            id="basic-nav-dropdown"
            align="end"
          >
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AuthenticatedNavBar;
