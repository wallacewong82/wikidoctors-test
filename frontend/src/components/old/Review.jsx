import React from "react";
import { Card } from "react-bootstrap";

const Review = ({ review }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Title as="h6" style={{ fontStyle: "italic" }}>
          <strong>{review.description}</strong>
        </Card.Title>
        <Card.Text as="h6">- {review.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Review;
