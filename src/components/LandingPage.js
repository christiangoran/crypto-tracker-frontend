import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import btnStyles from "../styles/Button.module.css";
import appStyles from "../App.module.css";
import styles from "../styles/LandingPage.module.css";
import rocket from "../assets/rocket.mp4";
import LandingPageCurrencies from "../pages/currency/LandingPageCurrencies";
import TradingViewTicker from "./TradingViewTicker";

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
    <div className={appStyles.Distance}>
      <Container className="col-md-10 mx-auto">
        <Row className="align-items-center">
          <Col xs={12} lg={4}>
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

          <Col xs={12} lg={8}>
            <video
              className={`${appStyles.FillerImage}`}
              src={rocket}
              alt="video of rocket"
              autoPlay
              // controls
              loop
              muted
            >
              Your browser does not support the video tag.
            </video>
          </Col>
        </Row>
      </Container>

      <LandingPageCurrencies />
      <Link to="/currencies">
        <Button className={`${btnStyles.Button} ${btnStyles.Dark}`}>
          See More
        </Button>
      </Link>
    </div>
  );
}

export default LandingPage;
