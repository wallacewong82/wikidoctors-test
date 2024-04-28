import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        isAdmin,
      });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <FormContainer>
        <Container style={{ height: 100 }}></Container>
        <Link to={-1} className="btn btn-dark my-3">
          Back
        </Link>
        <h2>Edit User</h2>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="firstName" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>First Name</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Form.Control>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="lastName" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Last Name</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></Form.Control>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              {" "}
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>User Email</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="phoneNumber" className="my-2">
              {" "}
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>User Phone</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            {userInfo.isSuperAdmin && (
              <Form.Group controlId="isAdmin" className="my-2">
                <Row>
                  <Col
                    md={3}
                    className="text-end"
                    style={{ marginTop: "8px" }}
                  ></Col>
                  <Col md={9}>
                    <Form.Check
                      type="checkbox"
                      label="Set as Admin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                  </Col>
                </Row>
              </Form.Group>
            )}
            <Row>
              <Col
                md={10}
                className="text-end"
                style={{ marginTop: "8px" }}
              ></Col>
              <Col md={2}>
                <Button
                  type="submit"
                  className="btn my-2"
                  style={{ backgroundColor: "#40679E", borderColor: "#40679E" }}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
