import React from "react";
import { Card } from "react-bootstrap";

const Step = ({ stepcount }) => {
  return (
    <Card className="my-1 p-1 rounded" style={{borderStyle:"none"}}>
      <Card.Body>
        <Card.Title as="div">
          <strong className={"custom-bookingstrong"}>{stepcount.description}</strong>
        </Card.Title>
        <Card.Img src={stepcount.image} variant="top" alt={`steps image ${stepcount._id}`} className={"custom-bookingsteps"}/>
      </Card.Body>
    </Card>
  );
};

export default Step;
