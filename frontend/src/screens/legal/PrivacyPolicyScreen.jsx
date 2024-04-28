import React from "react";
import { Container, Row } from "react-bootstrap";
const PrivacyPolicyScreen = () => {
  return (
    <>
      <Container style={{ height: 100 }}></Container>
      <div
        style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "700px" }}
      >
        <h1>Privacy Policy</h1>
        <br />
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          At HealthChannel, we are committed to protecting the privacy and
          security of our users' personal information.{" "}
        </Row>
        <br />
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          This Privacy Statement outlines our practices regarding the
          collection, use, and disclosure of personal data when you use our
          website.{" "}
        </Row>
        <br />
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          By accessing or using our website, you consent to the terms of this
          Privacy Statement.
        </Row>
        <br />
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}>Information We Collect:</b>
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            We may collect personal information from users in various ways,
            including but not limited to:
          </p>
          <ul style={{ marginLeft: "10px" }}>
            <li>
              Information provided voluntarily by users when creating an account
              or using our services, such as name, email address, and
              demographic information.
            </li>{" "}
            <li>
              Information collected automatically, including IP addresses,
              browser type, operating system, and browsing behavior on our
              website through cookies and similar technologies.{" "}
            </li>{" "}
          </ul>
        </Row>
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}>Use of Information: </b>
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            We may use the information collected for the following purposes:{" "}
          </p>
          <ul style={{ marginLeft: "10px" }}>
            <li>
              To provide and personalize our services, including facilitating
              comparisons of health services.
            </li>
            <li>
              To communicate with users regarding their account, inquiries, or
              updates to our services.
            </li>
            <li>
              To analyze usage trends and improve the functionality and user
              experience of our website.
            </li>
            <li>
              To comply with legal obligations and protect the rights and safety
              of our users and others.
            </li>{" "}
          </ul>
        </Row>
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}>Sharing of Information: </b>
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            We may share personal information with third-party service providers
            and partners who assist us in operating our website and providing
            services to users. We may also disclose personal information in
            response to legal requests, to protect our rights or property, or to
            prevent harm to others.
          </p>
        </Row>
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}> Data Security: </b>
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            We take reasonable measures to protect the security of personal
            information collected through our website. However, no method of
            transmission over the internet or electronic storage is completely
            secure. Therefore, while we strive to use commercially acceptable
            means to protect your personal information, we cannot guarantee its
            absolute security.{" "}
          </p>
        </Row>
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}> User Choices: </b>
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            Users have the right to access, update, or delete their personal
            information stored on our website. Users can also opt-out of
            receiving promotional communications from us by following the
            instructions provided in such communications.
          </p>
        </Row>
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}> Children's Privacy: </b>
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            Our website is not directed to children under the age of 13, and we
            do not knowingly collect personal information from children. If we
            become aware that we have inadvertently collected personal
            information from a child under 13, we will take steps to delete such
            information as soon as possible.{" "}
          </p>
        </Row>
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}> Third-Party Links: </b>
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            Our website may contain links to third-party websites or services.
            We are not responsible for the privacy practices or content of such
            third parties. We encourage users to review the privacy policies of
            these third parties before providing any personal information.
          </p>{" "}
        </Row>
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}>Changes to Privacy Statement: </b>
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            We reserve the right to update or modify this Privacy Statement at
            any time without prior notice. Users are encouraged to review this
            statement periodically for changes.{" "}
          </p>
        </Row>
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          <b style={{ marginLeft: "-10px" }}>Contact Information:</b>{" "}
          <p style={{ marginLeft: "-10px", marginTop: "10px" }}>
            If you have any questions or concerns about our Privacy Statement or
            the handling of your personal information, please contact us at{" "}
            <a href="mailto:support@healthchannel.sg">support@healthchannel.sg</a>.{" "}
          </p>
        </Row>{" "}
        <Row style={{ fontSize: "20px", fontWeight: "none", margin: "5px" }}>
          By using HealthChannel, you acknowledge that you have read,
          understood, and agreed to this Privacy Statement. Thank you for
          trusting us with your personal information.
        </Row>
      </div>
    </>
  );
};

export default PrivacyPolicyScreen;
