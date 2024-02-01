import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} mx-auto`}>
      <Container className="text-center">
        <Row>
          <Col md={4} sm={12} className="text-center mb-3 mb-md-0">
            <h5>BlockBoard: Your Gateway to the Cryptocurrency World</h5>
            <p className="text-center">
              Stay ahead with BlockBoard - the ultimate platform for
              cryptocurrency enthusiasts and investors. Discover, learn, and
              engage in the dynamic world of digital currencies. Your journey
              into the future of finance starts here.
            </p>
          </Col>
          <Col md={4} sm={6} className="text-center mb-3 mb-md-0">
            <h5>Links</h5>
            <div>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className={styles.iconLink}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                className={styles.iconLink}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord server"
                className={styles.iconLink}
              >
                <i className="fab fa-discord"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Github page"
                className={styles.iconLink}
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </Col>
          <Col md={4} sm={6}>
            <h5>Contact</h5>
            <p className="text-center">
              <br />
              <strong>Phone:</strong> (46) 01910191
              <br />
              <strong>Email:</strong> christian.goran@protonmail.com
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="text-center">
              &copy; {new Date().getFullYear()} BlockBoard. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
