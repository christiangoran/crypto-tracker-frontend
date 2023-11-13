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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `/profiles/${currentUser.profile_id}/`
        );
        setUserProfile({
          name: data.name,
          bio: data.bio,
          image: data.image,
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
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userProfile.name);
    formData.append("bio", userProfile.bio);
    if (userProfile.image && userProfile instanceof File) {
      formData.append("image", userProfile.image);
    }
    try {
      const { data } = await axios.put(
        `/profiles/${currentUser.profile_id}/`,
        formData
      );
      setCurrentUser((prev) => ({
        ...prev,
        ...data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="col-md-10 mx-auto">
      <Row>
        <Col sm={8} className={styles.window}>
          <p className={styles.p}>User Profile</p>
          <h3>Update Name</h3>
          <h1>{userProfile.name}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
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

        <Col sm={3} className={styles.window}>
          <p className={styles.greyText}>
            <Avatar
              src={currentUser.profile_image}
              alt="Profile"
              height={180}
            />
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Image</Form.Label>
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
              <Form.Label>Bio</Form.Label>
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

        <Col lg={3} className={styles.window}></Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
