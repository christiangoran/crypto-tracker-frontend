import React from "react";

import logo from "../assets/logo2.webp";
import styles from "../styles/NavBar.module.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { NavLink } from "react-router-dom";
import axios from "axios";

import { removeTokenTimestamp } from "../utils/utils";
import TradingViewTicker from "./TradingViewTicker";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink to={"/"} onClick={handleLogout} className={styles.NavLink}>
        <i className="fas fa-sign-out-alt"></i>Log out
      </NavLink>

      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavLink
        }
      >
        <i className="fa-solid fa-gauge"></i>Dashboard
      </NavLink>

      <NavLink to={`/edit-profile/`} className={styles.NavLink}>
        <Avatar src={currentUser?.profile_image} alt="Profile" height={40} />
        {currentUser?.username}
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        to={"/signin"}
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavLink
        }
      >
        <i className="fas fa-sign-in-alt"></i>Sign In
      </NavLink>
      <NavLink
        to={"/signup"}
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavLink
        }
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
      <TradingViewTicker />

      <Container>
        {/* Each NavLink takes a "to" prop which is where we want to 
      navigate the user to when the NavLink is clicked. 
      Just like an href-attribute on an anchor tag. */}
        <NavLink to={"/"}>
          <Navbar.Brand className={styles.navLink}>
            <img src={logo} alt="logo" height="25"></img>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          className="navbar-toggler-icon-bg"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`text-start ${styles.NavLink}`}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? styles.Active : styles.NavLink
              }
            >
              {" "}
              Home
            </NavLink>

            <NavLink
              to={"/currencies"}
              className={({ isActive }) =>
                isActive ? styles.Active : styles.NavLink
              }
            >
              {" "}
              Cryptocurrencies
            </NavLink>

            <NavLink
              to={"/forum"}
              className={({ isActive }) =>
                isActive ? styles.Active : styles.NavLink
              }
            >
              Forum
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
