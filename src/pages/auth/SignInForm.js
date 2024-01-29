//React & React Hooks:
import React, { useState } from "react";
//Routing:
import { Link, useNavigate } from "react-router-dom";
//HTTP Request:
import axios from "axios";
//UI Framework components:
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
//Assets:
import loginImage from "../../assets/login.webp";
//Context/Hooks:
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
//Utilities:
import { setTokenTimestamp } from "../../utils/utils";

//----------------------------------------------------------------

function SignInForm() {
  useRedirect("loggedIn"); //Redirects a logged in user to landing page
  //Current user context
  const setCurrentUser = useSetCurrentUser();
  //State to handle and store any sign-in errors that
  //are then displayed to the user.
  const [errors, setErrors] = useState({});
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  //Destructuring the SignInData object for easier access
  const { username, password } = signInData;

  //Redirects users programmatically after succeessful login
  const navigate = useNavigate();

  //----------------------------------------------------------------
  //Is triggered when the sign-in form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Makes an asynchronous http/POST request to login endpoint using axios
      //with the Sign-in data
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      //If successful:
      //updates the current user context,
      setCurrentUser(data.user);
      //sets the token timestamp
      setTokenTimestamp(data);
      //and redirects the user to landing page using
      //React Router DOM's useNavigate()
      navigate("/");
    } catch (err) {
      //Catches whatever authentication error that might
      //be returned and displays it to the user under
      //relevant text field.
      setErrors(err.response?.data);
    }
  };

  //----------------------------------------------------------------
  //The data entered by the user is registered in the
  //signInData state. The spread operator is used so
  //that username/password is NOT being entered by the
  //user is not overwritten by only what is registered.
  const handleChange = (e) => {
    setSignInData({
      ...signInData,
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
              <h1 className={styles.Header}>Sign In</h1>

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

                {/* Error Message Popup */}
                {/* Using the errors state */}
                {errors.username?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                {/* Username Password Field */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Password Error Message popup */}
                {/* Using the errors state */}
                {errors.password?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Dark}`}
                  type="submit"
                >
                  Sign In
                </Button>

                {/* General Errors Message popup */}
                {/* Using the errors state */}
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert variant="warning" key={idx} className="mt-3">
                    {message}
                  </Alert>
                ))}
              </Form>
              <Container className={styles.Distance}>
                <Link className={styles.Link} to="/signup">
                  Don't have an account? <span>Sign up now!</span>
                </Link>
              </Container>
            </Container>
          </Col>

          {/* Bootstrap column with Image element */}
          <Col lg={6} className={styles.SignUpInCol}>
            <Image className={`${styles.FillerImage}`} src={loginImage} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignInForm;
