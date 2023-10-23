import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.webp";

const NavBar = () => {
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="blockboard">
          <img src={logo} alt="logo" height="25"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-start">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Cryptocurrencies</Nav.Link>
            <Nav.Link>Forum</Nav.Link>
            <Nav.Link>About</Nav.Link>
          </Nav>
          <Nav className="ml-auto text-start">
            <Nav.Link>
              <i className="fas fa-sign-in-alt"></i>Sign In
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"></i>Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
