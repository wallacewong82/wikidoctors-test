import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetPackagesQuery } from "../../slices/old/packagesApiSlice";

const FindPackageScreen = () => {
  const { data: packages, isLoading, error } = useGetPackagesQuery();
  return (
    <>
      <Container style={{ height: 100 }}></Container>
      <Link className="btn btn-dark my-3" to="/">
        Back
      </Link>
      <h1>Find a health screening package</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {packages.map((packageItem) => (
            <Col key={packageItem._id} sm={12} md={6} lg={4} xl={4}>
              <h5>{packageItem.name}</h5>
              <h5>${packageItem.price}</h5>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default FindPackageScreen;
