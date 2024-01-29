//React:
import React from "react";
//Routing:
import { NavLink } from "react-router-dom";
//HTTP Request:
import axios from "axios";
//UI Framework components:
import { Container, Navbar, Nav } from "react-bootstrap";
//Styling
import styles from "../styles/NavBar.module.css";
//Assets
import logo from "../assets/logo2.webp";
//Context/Hooks:
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
//Custom Hooks:
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
//Local components:
import TradingViewTicker from "./TradingViewTicker";
import Avatar from "./Avatar";
//Utilities:
import { removeTokenTimestamp } from "../utils/utils";

//----------------------------------------------------------------

const NavBar = () => {
  //Current user contexts
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  //Destructuring the useClickOutsideToggle hook to be
  //able to use the keywords expanded, setExpanded & ref directly
  //In hamburger toggle menu.
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  //----------------------------------------------------------------
  //Handles when the user chooses to logout with an async function
  const handleLogout = async () => {
    //The user is asked to confirm the action
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    //That triggers the HTTP POST request using axios
    try {
      await axios.post("/dj-rest-auth/logout/");
      //If successful sets the current user context globally to "null"
      setCurrentUser(null);
      //And removes the token timestamp
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };
  //----------------------------------------------------------------------
  //The loggedInIcons are displayed if the currentUser state (from context)
  //is not null or undefined.
  const loggedInIcons = (
    <>
      {/* Each NavLink takes a "to" prop which is where we want to 
      navigate the user to when the NavLink is clicked. 
      Just like an href-attribute on an anchor tag or 
      Bootstrap Nav.Link element. */}
      <NavLink to={"/"} onClick={handleLogout} className={styles.NavLink}>
        <i className="fas fa-sign-out-alt"></i>Log out
      </NavLink>

      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        //The isActive property/keyword is a feature of
        //React Router DOM and provided by the NavLink.
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavLink
        }
      >
        <i className="fa-solid fa-gauge"></i>Dashboard
      </NavLink>

      <NavLink to={`/edit-profile/`} className={styles.NavLink}>
        {/* The Avatar component displays the user's profile image.
          the "src" prop is given the profile image URL from the
          currentUser context.
          The "height" prop is set to control the size of the Avatar.

          The "?" in "src" prop prevents an error in case currentUser
          is null or undefined*/}
        <Avatar
          src={currentUser?.profile_image}
          alt="Profile"
          height={40}
          text={currentUser?.username}
        />
      </NavLink>
    </>
  );
  //----------------------------------------------------------------
  //If the currentUser state (from context) is null or undefined then
  //loggedOutIcons are dislayed.
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
  //----------------------------------------------------------------

  return (
    <Navbar
      //Expanded prop is part of the useClickOutsideToggle hook
      expanded={expanded}
      expand="md"
      className={`bg-body-tertiary ${styles.navBar}`}
    >
      <TradingViewTicker />

      <Container>
        <NavLink to={"/"}>
          <Navbar.Brand className={styles.navLink}>
            <img src={logo} alt="logo" height="25"></img>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle
          //The 'ref' prop us used to detect clicks outside this
          //component for collapsing the navbar.
          //'setExpanded' is a function from the
          //useClickOutsideToggle hook to toggle navbars expanded state.
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
