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
import LandingPageCurrencies from "../pages/currency/LandingPageCurrencies";

function LandingPage() {
  const [currencies, setCurrencies] = useState([]);
  const [errors, setErrors] = useState([]);

  const getCurrencies = async () => {
    try {
      const response = await axios.get("/currencies/");
      setCurrencies(response.data.results.slice(0, 10));
      console.log("this is from landing page receiving the call", currencies);
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
      <Container className={`col-md-9 mx-auto ${styles.divStyle}`}>
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
