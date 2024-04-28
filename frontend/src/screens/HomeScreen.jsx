import React, { useContext, useEffect } from "react";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import stepcount from "../stepcount";
import Step from "../components/home/Step";
import SearchBox from "../components/home/SearchBox";
import HealthConcernCard from "../components/home/HealthConcernCard";
import healthconcerns from "../healthconcerns";
import NewsLetterBox from "../components/submissions/NewsLetterBox";
import FeedbackForm from "../components/submissions/FeedbackForm";
import GoogleMapComp from "../components/GoogleMapComp";
import { PageContext } from "../App";
import Meta from "../components/Meta";
const HomeScreen = () => {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage("home");
  }, [setCurrentPage]);

  const mapcenter = {
    lat: 1.357107,
    lng: 103.8194992,
  };

  return (
    <>
      <Meta title="Welcome to HealthChannel.sg!" />
      <Container style={{ height: 100 }}></Container>

      <div style={{ position: "relative", width: "100%", maxHeight: "820px" }}>
        <Image
          src={`/api/webimage/662e13ca8ae813b7214f5cbb`}
          alt="FrontImage"
          fluid
          style={{ marginTop: "-20px" }}
        />
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "black",
            width: "800px",
          }}
        >
          <h1>
            Search for the <b style={{ color: "#40679E" }}>right doctors</b> in
            Singapore:
          </h1>
          <SearchBox />
          <Button
            disabled
            style={{
              backgroundColor: "black",
              borderColor: "black",
              marginTop: "30px",
              fontSize: "24px",
            }}
          >
            More than 2,000 specialists
          </Button>
        </div>
      </div>
      <hr />
      <div
        style={{
          minHeight: "300px",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "80px",
        }}
      >
        <h2>Find a doctor by your health interest</h2>
        <Row style={{ alignItems: "center", justifyContent: "center" }}>
          {healthconcerns.map((healthconcern) => (
            <Col key={healthconcern._id} sm={6} md={3} lg={"auto"} xl={"auto"}>
              <HealthConcernCard concerncount={healthconcern} />
            </Col>
          ))}
        </Row>
      </div>
      <hr />
      <Row
        style={{
          minHeight: "300px",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        <Col>
          <Image
            src={`/api/webimage/662e122737e110aa3dad1de8`}
            // src={"/images/pexels6.png"}
            alt="SideImage1"
            fluid
            style={{ marginTop: "-20px", maxHeight: "500px" }}
          />
        </Col>
        <Col
          className="d-flex vh-10"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Row>
            <h2>
              Take charge with the{" "}
              <b style={{ color: "#40679E" }}>right health options</b>{" "}
            </h2>
            <h5>Finding the right private healthcare provider is hard.</h5>
            <h5>HealthChannel simplifies this, and puts you in control.</h5>
            <h5>
              We are dedicated to provide transparency of the Singapore private
              health landscape for you to make the right healthcare decisions.
            </h5>
          </Row>
        </Col>
      </Row>
      <hr />
      <div
        style={{
          minHeight: "300px",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        <h2>Our 3-step booking process</h2>
        <h5>Booking an appointment is easy.</h5>
        <Row>
          {stepcount.map((step) => (
            <Col key={step._id} sm={12} md={6} lg={4} xl={4}>
              <Step stepcount={step}></Step>
            </Col>
          ))}
        </Row>
      </div>
      <hr />
      <Row
        style={{
          minHeight: "300px",
          marginTop: "30px",
          marginBottom: "10px",
        }}
      >
        <Image
          src={`/api/webimage/662e141422b517267e565aad`}
          // src={"/images/pexels7.png"}
          alt="SideImage2"
          fluid
          style={{ marginTop: "-20px", maxHeight: "500px", opacity: "30%" }}
        />
        <div
          style={{
            position: "relative",
            left: "25%",
            color: "black",
            width: "800px",
          }}
        >
          <span
            style={{
              position: "absolute",
              fontSize: "30px",
              fontWeight: "bold",
              bottom: "220px",
            }}
          >
            Stay updated all the time
          </span>
          <span
            style={{ position: "absolute", fontSize: "18px", bottom: "175px" }}
          >
            Subscribe to get the latest updates on our products and services.
          </span>
          <NewsLetterBox />
        </div>
      </Row>
      <hr />
      <Row
        style={{
          minHeight: "300px",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        <Col md={4}>
          <h4 style={{ fontWeight: "bold", textAlign: "center" }}>About Us</h4>
          <p style={{ fontWeight: "none", textAlign: "left" }}>
            Welcome to HealthChannel, your trusted destination for reliable
            health information and comparisons.
          </p>
          <p>
            We understand the importance of making informed decisions about your
            health and well-being, which is why we are dedicated to providing
            you with accurate, up-to-date information and resources.{" "}
          </p>
          <p>
            At HealthChannel, we believe that everyone deserves access to
            quality health information that empowers them to take control of
            their health journey.{" "}
          </p>
          <p>
            Our team of experienced healthcare professionals and writers
            meticulously curate and review all content to ensure that it meets
            the highest standards of accuracy and credibility.{" "}
          </p>
          <p>
            We strive to present complex medical information in a clear and
            understandable manner, making it easier for you to make informed
            decisions about your health.{" "}
          </p>
          <p>
            What sets us apart is our commitment to transparency and
            impartiality.{" "}
          </p>
          <p>
            We focus on providing you with unbiased information and comparisons
            to help you make the right choices for your health.{" "}
          </p>
          <p>
            Whether you're looking for in-depth articles on medical conditions,
            expert reviews of healthcare products, or comparative analyses of
            treatment options, you can trust HealthChannel to provide you with
            the information you need to make informed decisions about your
            health.
          </p>
        </Col>
        <Col md={4}>
          <h4 style={{ fontWeight: "bold", textAlign: "center" }}>Find us</h4>
          <Row style={{ backgroundColor: "lightgrey" }}>
            <Row style={{ marginTop: "20px" }}>
              <h6 style={{ fontWeight: "bold" }}>HealthChannel Pte Ltd</h6>
            </Row>

            <Row style={{ marginTop: "20px" }}>
              <span style={{ fontWeight: "bold" }}>Operating Hours:</span>
              <span>9am - 6pm</span>
              <span>Mon - Fri</span>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <span style={{ fontWeight: "bold" }}>Address:</span>
              <span>111 Somerset Drive</span>
              <span>Singapore 123456</span>
            </Row>
            <Row
              style={{
                marginTop: "20px",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "0px",
                marginBottom: "20px",
              }}
            >
              <GoogleMapComp
                center={mapcenter}
                zoom={12}
                height={"40vh"}
                locationname={"healthchannel"}
              />
            </Row>
          </Row>
        </Col>

        <Col md={4}>
          <h4 style={{ fontWeight: "bold", textAlign: "center" }}>
            Have feedback for us?
          </h4>
          <FeedbackForm />
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default HomeScreen;
