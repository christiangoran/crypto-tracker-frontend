import React, { useEffect, useState } from "react";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
  Table,
} from "react-bootstrap";

import appStyles from "../../App.module.css";
import styles from "../../styles/CurrencyPage.module.css";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Currencies from "./Currencies";
import axios from "axios";
import CurrencyPostForm from "../posts/CurrencyPostForm";
import ShowPosts from "../posts/ShowPosts";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Favourite } from "../../components/Favourite";

function CurrencyPage() {
  const { id } = useParams();
  const [currency, setCurrency] = useState({});
  const [errors, setErrors] = useState([]);
  const [updatePostTrigger, setUpdatePostTrigger] = useState(0);
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

  const incrementPostTrigger = () => {
    setUpdatePostTrigger((prev) => prev + 1);
  };

  return (
    <Container className="col-md-10 mx-auto">
      <Row>
        <Col sm={8} className={styles.window}>
          <p className={styles.p}>Rank #{currency.id}</p>
          <h1>{currency.name}</h1>
        </Col>
        <Col sm={3} className={styles.window}>
          <Favourite currency={currency} currentUser={currentUser} />
        </Col>
      </Row>

      <Row>
        <Col sm={8} className={styles.window}>
          Chart goes in here
        </Col>
        <Col sm={3} className={styles.window}>
          <h3>Background:</h3>
          <p className={styles.greyText}>{currency.description}</p>
        </Col>
      </Row>

      <Row className={`col-md-11 mx-auto ${styles.window}`}>
        <Row className="mx-auto">
          <Col sm={12}>
            <h3>Currency Channel:</h3>
          </Col>
        </Row>

        <Col sm={12} className={`${styles.window}`}>
          {currency.id && (
            <ShowPosts
              currencyId={currency.id}
              updatePostTrigger={updatePostTrigger}
            />
          )}
        </Col>

        <Row className="mx-auto">
          <Col sm={12}>
            <h3>Post a Comment:</h3>
          </Col>
        </Row>

        <Col sm={11} className=" col-md-11">
          {currentUser ? (
            <CurrencyPostForm
              currencyId={currency.id}
              onPostCreated={incrementPostTrigger}
            />
          ) : (
            "Comments"
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CurrencyPage;
