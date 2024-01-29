//React & React Hooks:
import React from "react";
//Routing:
import { Link } from "react-router-dom";
//UI Framework Components:
import { Button, Col, Row, Container } from "react-bootstrap";
//Styling
import btnStyles from "../styles/Button.module.css";
import appStyles from "../App.module.css";
import styles from "../styles/LandingPage.module.css";
//Assets
import rocket from "../assets/rocket.mp4";
//Components
import LandingPageCurrencies from "../pages/currency/LandingPageCurrencies";

//----------------------------------------------------------------

function LandingPage() {
  return (
    <div className={appStyles.Distance}>
      <Container className="col-md-10 mx-auto">
        <Row className="align-items-center">
          {/* Left column element */}
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
          {/* Right column element */}
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
      {/* Imported currency list component */}
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
