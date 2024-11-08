import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a
              href="https://www.facebook.com/people/WikiDoctorscom/61559327890551/"
              class="facebook-follow-button"
              data-show-count="false"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "5px" }}
            >
              <img
                src={`https://m.facebook.com/favicon.ico?next=https%3A%2F%2Fm.facebook.com%2F%3Fwtsid%3Drdr_07Uzt4rdM1mphPctm&refsrc=deprecated&wtsid=rdr_07Uzt4rdM1mphPctm&_rdr`}
                alt={"link to Facebook site"}
                style={{ height: "25px", width: "25px" }}
              />
            </a>
            <a
              href="https://www.instagram.com/wikidoctors/"
              class="instagram-follow-button"
              data-show-count="false"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "5px" }}
            >
              <img
                src={`https://static.cdninstagram.com/rsrc.php/v3/yR/r/lam-fZmwmvn.png`}
                alt={"link to Instagram site"}
                style={{ height: "25px", width: "25px" }}
              />
            </a>
            {/* <Image
            src={`https://www.linkedin.com/favicon.ico`}
            alt={"link to LinkedIn site"}
            // src={"/images/linkedin-in.svg"}
            style={{ height: "25px", width: "50px" }}
          /> */}
            <a
              href="https://www.youtube.com/@WikiDoctors"
              class="youtube-follow-button"
              data-show-count="false"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "5px" }}
            >
              <FaYoutube
                alt={"link to Youtube"}
                style={{ height: "25px", width: "25px" }}
              />
            </a>
            <a
              href="https://twitter.com/wikiDoctors8888"
              class="twitter-follow-button"
              data-show-count="false"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "5px" }}
            >
              <img
                src={`https://twitter.com/favicon.ico`}
                alt={"link to X site"}
                //src={"/images/x-twitter.svg"}
                style={{ height: "25px", width: "25px" }}
              />
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"
            ></script>
          </Col>
        </Row>
        <Row>
          <span style={{ fontSize: "12px" }}>
            <strong>Disclaimer</strong>: WikiDoctors aims to provide the most
            updated, accurate, and objective information to our clients. This
            information may change from time to time. Some content may be
            compensated via third-party advertisers. Any health related
            information presented was generated by medical professionals, which
            Health Channel presents without warranty. The list of products
            presented via our search algorithms are not exhaustive.{" "}
          </span>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <img src={"/api/webimage/66407bb03c516e3cea4baed1"} alt={"wikidoctors logo"} style={{height:"20px", weight:"20px", marginBottom:"5px"}}></img>
            <span style={{ fontSize: "14px" }}>
              <strong>WikiDoctors</strong> &copy; {currentYear}. All rights
              reserved. Use of this site constitutes acceptance of our{" "}
              <Link to={"/termsofuse"} style={{ color: "black" }}>
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to={"/privacypolicy"} style={{ color: "black" }}>
                Privacy Policy
              </Link>
              .
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
