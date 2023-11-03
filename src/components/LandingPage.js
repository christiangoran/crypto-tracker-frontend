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
import { Link } from "react-router-dom";
import axios from "axios";
import btnStyles from "../styles/Button.module.css";
import appStyles from "../App.module.css";
import styles from "../styles/LandingPage.module.css";

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
    console.log(
      "getCurrencies within useEffect in LandingPage about to be called"
    );
    getCurrencies();
  }, []);

  return (
    <div>
      <div>
        <Table striped bordered hover className={styles.TableStyle}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Total Volume</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.id}>
                <td>{currency.id}</td>
                <td>
                  <Image
                    src={currency.logo_url}
                    alt={`${currency.name} logo`}
                    height={25}
                  />
                  {currency.name} - {currency.symbol}
                </td>
                <td>{currency.current_price}</td>
                <td>{currency.market_cap}</td>
                <td>{currency.total_volume}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ul></ul>
      <Link to="/currencies">
        <Button className={`${btnStyles.Button} ${btnStyles.Dark}`}>
          See More
        </Button>
      </Link>
    </div>
  );
}

export default LandingPage;
