import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import btnStyles from "../styles/Button.module.css";
import appStyles from "../App.module.css";

function LandingPage() {
  const [currencies, setCurrencies] = useState([]);
  const [errors, setErrors] = useState([]);

  const getCurrencies = async () => {
    try {
      const response = await axios.get("/currencies/");
      setCurrencies(response.data.results.slice(0, 10));
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <div>
      <ul>
        {currencies.map((currency) => (
          <li key={currency.id}>
            <Image src={currency.logo_url} alt={`${currency.name} logo`} /> -
            {currency.name} - {currency.symbol} -{currency.current_price} -
            {currency.market_cap} -{currency.total_volume}
          </li>
        ))}
      </ul>
      <Link to="/cryptocurrencies">
        <Button className={`${btnStyles.Button} ${btnStyles.Dark}`}>
          See More
        </Button>
      </Link>
    </div>
  );
}

export default LandingPage;
