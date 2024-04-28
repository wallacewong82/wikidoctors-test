import React from "react";
import { Card } from "react-bootstrap";

const Step = ({ stepcount }) => {
  return (
    <Card className="my-1 p-1 rounded" style={{borderStyle:"none"}}>
      <Card.Img src={stepcount.image} variant="top" style={{maxHeight:"400px", maxWidth:"400px"}}/>

      <Card.Body>
        <Card.Title as="div">
          <strong style={{fontSize:"24px"}}>{stepcount.description}</strong>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Step;
