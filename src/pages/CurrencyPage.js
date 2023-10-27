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

import appStyles from "../App.module.css";
import { useParams } from "react-router-dom";
import { axiosRes } from "../api/axiosDefaults";

function CurrencyPage() {
  const { id } = useParams();
  const [currency, setCurrency] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: currency }] = await Promise.all([
          axiosRes.get(`/currencies/${id}/`),
        ]);
        setCurrency({ results: currency });
        console.log(currency);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <p>Post component</p>
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default CurrencyPage;
