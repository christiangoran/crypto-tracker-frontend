import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import signUpImage from "../../assets/signup.webp";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={appStyles.Distance}>
      <Container className="col-md-9 mx-auto">
        <Row>
          <Col className={styles.SignUpInCol} lg={6}>
            <Container className={`${appStyles.Content} p-4 `}>
              <h1 className={styles.Header}>Sign Up</h1>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="d-none">Username</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                  <Form.Text className={styles.FormText}></Form.Text>
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="password1">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.password1?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="password2">
                  <Form.Label className="d-none">Confirm Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                  />
                </Form.Group>
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
