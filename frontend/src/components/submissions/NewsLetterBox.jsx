import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useCreateNewsletterMutation } from "../../slices/newsletterApiSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Message from "../Message";

const NewsLetterBox = () => {
  const [userEmail, setUserEmail] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [createNewsletter] = useCreateNewsletterMutation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const activateJoinHandler = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
    if (emailRegex.test(userEmail)) {
      setButtonEnabled(true);
    }
    if (!emailRegex.test(userEmail)) {
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


  const joinNewsletterHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createNewsletter({
        _id: uuidv4(),
        emailAddress: userEmail,
      }).unwrap();
      setUserEmail("");
      toast.success("Newsletter signup success for " + res.emailAddress);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setError(err);
    }
  };
  return (
    <Form
      className={"custom-newsletterform"}
      onSubmit={joinNewsletterHandler}
    >
      <Form.Control
        type="email"
        name="q"
        onChange={activateJoinHandler}
        onBlur={activateJoinHandler}
        value={userEmail}
        placeholder="Enter valid email address"
        className={"custom-newsletterfield"}
      ></Form.Control>
      <Button
        type="submit"
        variant="btn"
        className={"custom-newsletterbutton"}
        disabled={!buttonEnabled}
      >
        Subscribe
      </Button>
    </Form>
  );
};

export default NewsLetterBox;
