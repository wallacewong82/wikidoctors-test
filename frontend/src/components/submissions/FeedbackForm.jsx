import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useCreatePublicFeedbackMutation } from "../../slices/publicFeedbackApiSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Message from "../Message";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [createPublicFeedback] = useCreatePublicFeedbackMutation();

  const activateJoinHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (emailRegex.test(email)) {
      setButtonEnabled(true);
    }
    if (!emailRegex.test(email)) {
      setButtonEnabled(false);
    }
  };
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    if (error?.status === 429) {
      // Redirect to the home page
      navigate("/");
    }
  }, [error, navigate]);
  if (error && error.status !== 429) {
    return <Message variant="danger">{error.message}</Message>;
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createPublicFeedback({
        _id: uuidv4(),
        userName: name,
        emailAddress: email,
        phoneNumber: phone,
        subject,
        message,
      }).unwrap();
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      toast.success("Feedback submitted for " + res.emailAddress);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setError(err);
    }
    console.log("form submitted");
  };

  return (
    <Form onSubmit={submitFormHandler}>
      <Row className="d-flex">
        <Col md={4}>
          <Form.Label
            className="float-end"
            style={{
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Name*:
          </Form.Label>
        </Col>
        <Col md={8}>
          <Form.Control
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
            className="mr-sm-2 ml-sm-5"
            style={{
              fontSize: "18px",
              width: "265px",
              marginTop: "5px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
          ></Form.Control>
        </Col>
      </Row>
      <Row className="d-flex">
        <Col md={4}>
          <Form.Label
            className="float-end"
            style={{
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Email*:
          </Form.Label>
        </Col>
        <Col md={8}>
          <Form.Control
            type="email"
            name="email"
            onChange={activateJoinHandler}
            onBlur={activateJoinHandler}
            value={email}
            placeholder="Enter your email"
            className="mr-sm-2 ml-sm-5"
            style={{
              fontSize: "18px",
              width: "265px",
              marginTop: "5px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
          ></Form.Control>
        </Col>
      </Row>
      <Row className="d-flex">
        <Col md={4}>
          <Form.Label
            className="float-end"
            style={{
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Phone:
          </Form.Label>
        </Col>
        <Col md={8}>
          <Form.Control
            type="text"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            placeholder="Enter your phone number"
            className="mr-sm-2 ml-sm-5"
            style={{
              fontSize: "18px",
              width: "265px",
              marginTop: "5px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
          ></Form.Control>
        </Col>
      </Row>
      <Row className="d-flex">
        <Col md={4}>
          <Form.Label
            className="float-end"
            style={{
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Subject*:
          </Form.Label>
        </Col>
        <Col md={8}>
          <Form.Control
            type="text"
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            placeholder="Enter your subject"
            className="mr-sm-2 ml-sm-5"
            style={{
              fontSize: "18px",
              width: "265px",
              marginTop: "5px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
          ></Form.Control>
        </Col>
      </Row>
      <Row className="d-flex">
        <Col md={4}>
          <Form.Label
            className="float-end"
            style={{
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Message*:
          </Form.Label>
        </Col>
        <Col md={8}>
          <Form.Control
            type="text"
            name="message"
            as="textarea"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Enter your message"
            className="mr-sm-2 ml-sm-5"
            rows={4}
            style={{
              fontSize: "18px",
              width: "265px",
              marginTop: "5px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
          ></Form.Control>
        </Col>
      </Row>
      <Button
        type="submit"
        variant="btn"
        className="p-2 mx-2 float-end "
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#40679E",
          borderColor: "#40679E",
        }}
        disabled={!(!!name && !!buttonEnabled && !!subject && !!message)}
      >
        Submit Feedback
      </Button>
    </Form>
  );
};

export default FeedbackForm;
