import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfo,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>
        {`
          .navbar-nav .nav-link:hover {
            color: gray !important;
          }

          .navbar {
            background-color: transparent !important; // Set background
          }
        `}
      </style>
      <Navbar
        expand="lg"
        style={{
          backgroundColor: "transparent", // Set background
        }}
      >
        <Container>
          {/* Logo and Brand */}
          <Navbar.Brand
            href="/"
            className="d-flex align-items-center text-white font-weight-bold"
            style={{
              fontSize: "2.5rem",
              fontFamily: "'Montserrat', sans-serif",
            }} // Adjust the font size here
          >
            <Image
              src="/logo.png"
              alt="Logo"
              roundedCircle // Add this prop if your logo is circular
              className="mr-2"
              style={{ width: "60px", height: "60px" }} // Adjust the size here
            />
            NutriFlex
          </Navbar.Brand>

          {/* Navbar Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar Collapsible Content */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* ml-auto aligns items to the right */}
              <Nav.Link href="/" className="text-white">
                <FontAwesomeIcon icon={faHome} className="mr-1" />
                Home
              </Nav.Link>
              <Nav.Link href="#features" className="text-white">
                <FontAwesomeIcon icon={faCode} className="mr-1" />
                Features
              </Nav.Link>
              <Nav.Link href="#idea" className="text-white">
                <FontAwesomeIcon icon={faInfo} className="mr-1" />
                Solution
              </Nav.Link>
              <Nav.Link href="#about" className="text-white">
                <FontAwesomeIcon icon={faUser} className="mr-1" />
                About Us
              </Nav.Link>
              <Nav.Link
                href="https://github.com/JamiCode/Nutriflex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FontAwesomeIcon icon={faCode} className="mr-1" />
                GitHub
              </Nav.Link>
              <Nav.Link href="/auth/login" className="text-white">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
                Login
              </Nav.Link>
              <Nav.Link href="/auth/register" className="text-white">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
