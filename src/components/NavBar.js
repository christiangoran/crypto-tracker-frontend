import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.webp";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);

  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <Nav className="ml-auto text-start">
        <NavLink
          to={"/signin"}
          className={styles.NavLink}
          activeClassName={styles.Active}
        >
          <i className="fas fa-sign-in-alt"></i>Sign In
        </NavLink>
        <NavLink
          to={"/signup"}
          className={styles.NavLink}
          activeClassName={styles.Active}
        >
          <i className="fas fa-user-plus"></i>Sign Up
        </NavLink>
      </Nav>
    </>
  );
  return (
    <Navbar expand="md" className={`bg-body-tertiary ${styles.navBar}`}>
      <Container>
        <NavLink to={"/"}>
          <Navbar.Brand className={styles.navLink}>
            <img src={logo} alt="logo" height="25"></img>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`text-start ${styles.NavLink}`}>
            <NavLink
              exact
              to={"/"}
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              Home
            </NavLink>

            <NavLink
              to={"/cryptocurrencies"}
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              Cryptocurrencies
            </NavLink>

            <NavLink
              to={"/forum"}
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              Forum
            </NavLink>

            <NavLink
              to={"/about"}
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              About
            </NavLink>
          </Nav>

          <Nav className={`ms-auto ${styles.NavLink}`}>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
