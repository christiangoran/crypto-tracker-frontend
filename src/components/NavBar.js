import React, { useEffect, useRef, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo2.webp";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleLogout = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {}, [currentUser]);

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
              Home
            </NavLink>

            <NavLink
              to={"/currencies"}
              className={({ isActive }) =>
                isActive ? styles.Active : styles.NavLink
              }
            >
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

            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? styles.Active : styles.NavLink
              }
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
