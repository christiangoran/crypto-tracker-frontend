import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../context/CurrentUserContext";
import axios from "axios";
import styles from "../../styles/UserProfilePage.module.css";
import Avatar from "../../components/Avatar";

export const UserProfilePage = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const [userProfile, setUserProfile] = useState({
    name: "",
    bio: "",
    image: null,
  });

  return (
    <Container className="col-md-10 mx-auto">
      <Row>
        <Col sm={8} className={styles.window}>
          <p className={styles.p}>User Profile</p>
          <h3>Update Name</h3>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={userProfile.name} />
            </Form.Group>

            <Button type="submit">Update Name</Button>
          </Form>
        </Col>

        <Col sm={3} className={styles.window}>
          <p className={styles.greyText}>
            <Avatar
              src={currentUser.profile_image}
              alt="Profile"
              height={180}
            />
          </p>
          <p>Change Image</p>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className={styles.window}>
          <h3>NOT SURE WHAT TO HAVE HERE</h3>
        </Col>

        <Col lg={3} className={styles.window}>
          <h3>Background:</h3>
          <Form>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" name="bio" value={userProfile.bio} />
            </Form.Group>

            {/* Image upload logic needs to be implemented */}

            <Button type="submit">Update Bio</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;