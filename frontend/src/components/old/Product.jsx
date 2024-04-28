import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product, setShowModal, setSelectedPackage }) => {
  return (
    <Card className="my-1 p-1 rounded">
      <Link to={`/screening/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/screening/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Row>
          <Col md={6}>
            <Card.Text as="h3">S${product.price}</Card.Text>
          </Col>
          <Col md={6}>
            <Button
              className="btn-block"
              type="button"
              onClick={() => {
                setShowModal(true);
                setSelectedPackage(product);
              }}
            >
              Book now
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Product;
