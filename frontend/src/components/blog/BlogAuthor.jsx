import React from "react";
import { Row, Col, Image, Card } from "react-bootstrap";

const BlogAuthor = ({ authorname, authorpic, authorprofile }) => {
  return (
    <Card style={{ marginTop: "30px" }}>
      <Card.Header>
        <span>
          {" "}
          <b>Disclaimer</b>: The purpose of this article is to increase
          awareness of prevalent health concerns. However, it is important to
          note that the information provided here does not constitute
          personalized medical advice. Before implementing any suggestions or
          treatment strategies discussed in this article, it is imperative to
          seek guidance from a qualified medical professional.{" "}
        </span>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col sm={3}>
            <Image
              src={authorpic}
              style={{ marginLeft: "40px", borderRadius: "100%", maxWidth:"200px" }}
            ></Image>
          </Col>
          <Col sm={9}>
            <Card.Text>
              <p style={{ fontWeight: "bold", fontSize: "24px" }}>
                {authorname} - Author
              </p>
              <span>{authorprofile}</span>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BlogAuthor;
