//React & React Hooks:
import React, { useState } from "react";
//Routing:
import { Link, useNavigate } from "react-router-dom";
//HTTP Requests:
import axios from "axios";
//UI Framework Components:
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
//Styling:
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
//Assets
import signUpImage from "../../assets/signup.webp";
//Context/Hooks:
import { useRedirect } from "../../hooks/useRedirect";

//----------------------------------------------------------------

const SignUpForm = () => {
  useRedirect("loggedIn"); //Redirects logged in user to landingpage
  //signUpData state consisting of on object with username,
  //password1 and password2 (for confirmation of password)
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  //Destructuring signUpData object for easier access
  const { username, password1, password2 } = signUpData;
  //State to handle and store any sign-up errors that
  //are then displayed to the user.
  const [errors, setErrors] = useState({});
  //Redirects users programmatically after succeessful signup
  const navigate = useNavigate();
  //----------------------------------------------------------------
  //Is triggered when signup form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Makes an asynchronous http/POST request to registration
      //endpoint using axios with the Sign-up data
      await axios.post("/dj-rest-auth/registration/", signUpData);
      //When successful redirects the user to login page using
      //React Router DOM's useNavigate()
      navigate("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  //----------------------------------------------------------------
  //The data entered by the user is registered in the
  //signUpData state. The spread operator is used so
  //that username/passwrod is NOT being entered by the
  //user is not overwritten by only what is registered.
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  //----------------------------------------------------------------
  return (
    <div className={appStyles.Distance}>
      <Container className="col-md-9 mx-auto">
        <Row>
          <Col className={styles.SignUpInCol} lg={6}>
            <Container className={`${appStyles.Content} p-4 `}>
              <h1 className={styles.Header}>Sign Up</h1>

              <Form onSubmit={handleSubmit}>
                {/* Username Field */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="d-none">Username</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    //The deconstructed signInData state enables the direct
                    //use of the object keys in that state.
                    //username & password.
                    value={username}
                    onChange={handleChange}
                  />
                  <Form.Text className={styles.FormText}></Form.Text>
                </Form.Group>
                {/* Username Error Message Popup */}
                {/* Using the errors state */}
                {errors.username?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                {/* Password Field */}
                <Form.Group className="mb-3" controlId="password1">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="password1"
                    //The deconstructed signInData state enables the direct
                    //use of the object keys in that state.
                    //username & password.
                    value={password1}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* Password Error Message Popup */}
                {/* Using the errors state */}
                {errors.password1?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                {/* Password2 Field */}
                <Form.Group className="mb-3" controlId="password2">
                  <Form.Label className="d-none">Confirm Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    //The deconstructed signInData state enables the direct
                    //use of the object keys in that state.
                    //username & password.
                    value={password2}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* Password2 Error Message Popup */}
                {/* Using the errors state */}
                {errors.password2?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Dark}`}
                  type="submit"
                >
                  Sign Up
                </Button>
                {/* General Error Message Popup */}
                {/* Using the errors state */}
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert variant="warning" key={idx} className="mt-3">
                    {message}
                  </Alert>
                ))}
              </Form>
              <Container className={styles.Distance}>
                <Link className={styles.Link} to="/signin">
                  Already have an account? <span>Sign in</span>
                </Link>
              </Container>
            </Container>
          </Col>
          <Col lg={6} className={styles.SignUpInCol}>
            <Image className={`${styles.FillerImage}`} src={signUpImage} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpForm;
