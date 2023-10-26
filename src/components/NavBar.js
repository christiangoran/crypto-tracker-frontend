import React, { useEffect, useRef, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.webp";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mouseup", checkIfClickedOutside);
    };
  }, [ref]);

  const handleLogout = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink to={"/"} onClick={handleLogout} className={styles.NavLink}>
        <i className="fas fa-sign-out-alt"></i>Log out
      </NavLink>

      <NavLink
        to={"/dashboard"}
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-gauge"></i>Dashboard
      </NavLink>

      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={25} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
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
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      expand="md"
      className={`bg-body-tertiary ${styles.navBar}`}
    >
      <Container>
        <NavLink to={"/"}>
          <Navbar.Brand className={styles.navLink}>
            <img src={logo} alt="logo" height="25"></img>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
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
