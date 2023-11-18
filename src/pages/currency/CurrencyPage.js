import React, { useEffect, useState } from "react";

import { Col, Row, Container } from "react-bootstrap";

import styles from "../../styles/CurrencyPage.module.css";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import CurrencyPostForm from "../posts/CurrencyPostForm";
import ShowPosts from "../posts/ShowPosts";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Favourite } from "../../components/Favourite";

function CurrencyPage(props) {
  const { id } = useParams();
  const [currency, setCurrency] = useState({});
  const [errors, setErrors] = useState([]);
  const [updatePostTrigger, setUpdatePostTrigger] = useState(0);
  const [editPost, setEditPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get(`/currencies/${id}/`);
        setCurrency(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  // This function is passed to the CurrencyPostForm component and
  // triggers the showpost component to update
  const incrementPostTrigger = () => {
    setUpdatePostTrigger((prev) => prev + 1);
  };

  const decrementPostTrigger = () => {
    setUpdatePostTrigger((prev) => prev - 1);
  };

  const handleEditPost = (id) => {
    setEditPost(id);
    setIsEditing(true);
  };

  const onPostUpdated = () => {
    setUpdatePostTrigger((prev) => prev + 1);
    setIsEditing(false);
    setEditPost(null);
  };

  return (
    <Container className="col-md-10 mx-auto">
      <Row>
        <Col sm={8} className={styles.window}>
          <p className={styles.p}>Rank #{currency.id}</p>
          <h1>{currency.name}</h1>
        </Col>

        <Col sm={3} className={styles.window}>
          <p className={styles.greyText}>Add to your dashboard:</p>
          <Favourite currency={currency} currentUser={currentUser} />
        </Col>
      </Row>

      <Row>
        <Col lg={8} className={styles.window}>
          Chart goes in here
        </Col>

        <Col lg={3} className={styles.window}>
          <h3>Background:</h3>
          <p className={styles.greyText}>{currency.description}</p>
        </Col>
      </Row>

      <Row className="col-md-11 mx-auto">
        <Row className="mx-auto">
          <Col md={12} className={styles.distanceTop}>
            <h3 className={styles.centerText}>Currency Forum</h3>
          </Col>
        </Row>

        <Col md={12} className={styles.distanceLessTop}>
          {currency.id && (
            <ShowPosts
              currencyId={currency.id}
              updatePostTrigger={updatePostTrigger}
              decrementPostTrigger={decrementPostTrigger}
              handleEditPost={handleEditPost}
            />
          )}
        </Col>

        <Row className="mx-auto">
          <Col md={12} className={styles.distanceTop}>
            <h3 className={styles.centerText}>Post a Comment</h3>
          </Col>
        </Row>

        <Col md={11}>
          {currentUser ? (
            <CurrencyPostForm
              currencyId={currency.id}
              onPostCreated={incrementPostTrigger}
              editPost={editPost}
              isEditing={isEditing}
              onPostUpdated={onPostUpdated}
            />
          ) : (
            <p className={styles.greyText}>
              You must be logged in to post a comment.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CurrencyPage;
