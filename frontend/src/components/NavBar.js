import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

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

          {/* Navbar Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar Collapsible Content */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* ml-auto aligns items to the right */}
              <Nav.Link href="/" className="text-white">
                <p> Home </p>
              </Nav.Link>
              <Nav.Link href="#features" className="text-white">
                Features
              </Nav.Link>
              <Nav.Link href="#idea" className="text-white">
                Solution
              </Nav.Link>
              <Nav.Link href="#link" className="text-white">
                About Us
              </Nav.Link>
              <Nav.Link href="/auth/login" className="text-white">
                Login
              </Nav.Link>
              <Nav.Link href="/auth/register" className="text-white">
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
