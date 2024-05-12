import React from "react";
import { Row, Col, Image, Card } from "react-bootstrap";

const BlogAuthor = ({ authorname, authorpic, authorprofile }) => {
  return (
    <Card className="custom-blogauthorcard">
      <Card.Header>
        <span className="custom-blogauthorspan1">
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
          <Col sm={3} className="custom-blogauthorcol1">
            <Image
              src={authorpic}
              className="custom-blogauthorimg"
            ></Image>
          </Col>
          <Col sm={9} className="custom-blogauthorcol2">
            <Card.Text>
              <p className="custom-blogauthorp1">
                {authorname} - Author
              </p>
              <span className="custom-blogauthorspan2">{authorprofile}</span>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BlogAuthor;
