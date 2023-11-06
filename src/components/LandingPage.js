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
import Currencies from "../pages/currency/Currencies";
import rocket from "../assets/rocket.mp4";
import indexStyles from "../index.css";

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
      <Container className="col-md-9 mx-auto">
        <Row>
          <Col sm={4}>
            <h1 className={styles.h1}>Launch Your Portfolio</h1>
            <h2 className={styles.h2}>Endless Possibilities with</h2>
            <h3 className={styles.h3}>Cryptocurrency</h3>
            <p>
              Discover a seamless way to stay updated on the ever-evolving
              cryptocurrency market with BlockBoard. Our intuitive platform
              offers real-time tracking, analysis, and insights into a vast
              array of cryptocurrencies, helping both novices and seasoned
              investors make informed decisions.{" "}
            </p>
          </Col>
          <Col sm={8}>
            <video
              className={`${appStyles.FillerImage}`} // Use your own classname here
              src={rocket}
              alt="video of rocket"
              autoPlay
              // controls
              loop
              muted // Mute by default if autoplay is desired
            >
              Your browser does not support the video tag.
            </video>
          </Col>
        </Row>
      </Container>
      <Currencies />
      {/* <div>
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
      </Link> */}
    </div>
  );
}

export default LandingPage;
