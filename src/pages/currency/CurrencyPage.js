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
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Currencies from "./Currencies";
import axios from "axios";
import CurrencyPostForm from "../posts/CurrencyPostForm";
import ShowPosts from "../posts/ShowPosts";
import { useCurrentUser } from "../../context/CurrentUserContext";

function CurrencyPage() {
  const { id } = useParams();
  const [currency, setCurrency] = useState({});
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

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <p>Rank #{currency.id}</p>
          <h1>{currency.name}</h1>
        </Col>
        <Col sm={4}>select icon</Col>
      </Row>
      <Row>
        <Col sm={8}>Chart goes in here</Col>
        <Col sm={4}>{currency.description}</Col>
      </Row>
      <ShowPosts currencyId={currency.id} />
      <Container>
        {currentUser ? (
          <CurrencyPostForm currencyId={currency.id} />
        ) : (
          "Comments"
        )}
      </Container>
    </Container>
  );
}

export default CurrencyPage;
