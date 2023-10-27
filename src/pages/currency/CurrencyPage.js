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

  return <div></div>;
}

export default CurrencyPage;
