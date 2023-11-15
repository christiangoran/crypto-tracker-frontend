import React, { useState } from "react";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import loginImage from "../../assets/login.webp";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign In</h1>

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
              <Form.Text className={styles.FormText}>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

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
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image className={`${appStyles.FillerImage}`} src={loginImage} />
      </Col>
    </Row>
  );
}

export default SignInForm;
