import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/Dashboard.module.css";
import { Favourite } from "../../components/Favourite";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../context/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

export const Dashboard = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get(`/profiles/${currentUser.id}/`);
        setUserProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
  });

  const profileFavourites = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <p>Image</p>
        </Col>
        <Col lg={6}>
          <h3 className="m-2">Profile username</h3>
          <p>Profile stats</p>
        </Col>
        <Col lg={3} className="text-lg-right">
          <p>Follow button</p>
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  console.log("currentUser:", currentUser); // Check what this prints out
  console.log("userProfile:", userProfile); // Check what this prints out
  return (
    <div>
      <Container className="col-md-10 mx-auto">
        <Row>
          <Col sm={8} className={styles.window}>
            <p className={styles.p}>Portfolio</p>
            <h1>Christian Göran</h1>
            <p className={styles.greyText}></p>
          </Col>

          <Col sm={3} className={styles.window}>
            <p className={styles.greyText}>
              <Avatar
                src={currentUser.profile_image}
                alt="Profile"
                height={180}
              />
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className={styles.window}>
            <h3>Selected Currencies:</h3>
            <>{profileFavourites}</>
          </Col>

          <Col lg={3} className={styles.window}>
            <h3>Background:</h3>
            <p className={styles.greyText}>hej</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
