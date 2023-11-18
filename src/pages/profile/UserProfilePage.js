import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../context/CurrentUserContext";
import axios from "axios";
import styles from "../../styles/UserProfilePage.module.css";
import Avatar from "../../components/Avatar";
import { useRedirect } from "../../hooks/useRedirect";

export const UserProfilePage = () => {
  useRedirect("loggedOut");
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const [userProfile, setUserProfile] = useState({
    name: "",
    bio: "",
    profile_image: null,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `/profiles/${currentUser.profile_id}/`
        );
        setUserProfile({
          name: data.name,
          bio: data.bio,
          profile_image: data.profile_image,
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    setUserProfile({
      ...userProfile,
      profile_image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userProfile.name);
    formData.append("bio", userProfile.bio);
    if (
      userProfile.profile_image &&
      userProfile.profile_image instanceof File
    ) {
      formData.append("image", userProfile.profile_image);
    }
    try {
      const { data } = await axios.put(
        `/profiles/${currentUser.profile_id}/`,
        formData
      );
      setCurrentUser((oldUserData) => ({
        ...oldUserData,
        ...data,
        profile_image: data.image,
      }));
      setAlertContent("Profile updated successfully!");
      setShowAlert(true);
    } catch (err) {
      console.log(err);
      setAlertContent("Failed to update profile.");
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container className="col-md-10 mx-auto">
      {showAlert && (
        <Alert variant="success" onClose={handleCloseAlert} dismissible>
          {alertContent}
        </Alert>
      )}
      <Row>
        <Col md={8} className={styles.window}>
          <p className={styles.p}>User Profile</p>
          <h3>Update Name:</h3>
          <h1>{userProfile.name}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                value={userProfile.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit">Update Name</Button>
          </Form>
        </Col>

        <Col md={3} className={styles.window}>
          <h3>Update Image:</h3>
          <p className={styles.greyText}>
            <Avatar src={currentUser?.profile_image} alt="Profile" />
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChangeImage}
              />
            </Form.Group>

            <Button type="submit">Update Image</Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className={styles.window}>
          <h3>Background:</h3>
          <p>{userProfile.bio}</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="bio"
                value={userProfile.bio}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit">Update Bio</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
