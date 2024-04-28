import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import { format } from "date-fns";
import { cancelAppointment } from "../../slices/old/appointmentApiSlice";

const BookingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const appointment = useSelector((state) => state.appointment);
  const { appointmentItems } = appointment;

  const cancelApptHandler = () => {
    dispatch(cancelAppointment());
    navigate("/");
  };
  return (
    <>
      <Container style={{ height: 100 }}></Container>
      <Link className="btn btn-dark my-3" to="/">
        Back
      </Link>
      <h3>Confirm your appointment</h3>
      <Container style={{ borderWidth: 1, borderStyle: "solid" }}>
        <Row>
          <Col md={8}>
            {appointmentItems.length === 0 ? (
              <Message>
                There are no appointments so far <Link to="/">Go back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {appointmentItems.map((appointment) => (
                  <ListGroup.Item key={appointment.package._id}>
                    <Row>
                      <Col md={3}>
                        <Image
                          src={appointment.package.image}
                          style={{ maxWidth: "100%" }}
                        ></Image>
                      </Col>
                      <Col md={9} style={{ marginTop: "25px" }}>
                        <Row>
                          <Col md={7}>
                            <h5>Selected appointment:</h5>
                          </Col>
                          <Col md={5}>
                            <Link
                              to={`../screening/${appointment.package._id}`}
                            >
                              <h5>{appointment.package.name}</h5>
                            </Link>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={7}>
                            <h5>Selected day:</h5>
                          </Col>
                          <Col md={5}>
                            <h5>{format(appointment.day, "PP")}</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={7}>
                            <h5>Selected time:</h5>
                          </Col>

                          <Col md={5}>
                            <h5>{appointment.time} hrs</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={7}>
                            <h5>Service price:</h5>
                          </Col>

                          <Col md={5}>
                            <h4>
                              <strong>${appointment.package.price}</strong>
                            </h4>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <Button variant="danger" onClick={cancelApptHandler}>
                              <FaTrash />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "middle",
            }}
          >
            <Row>
              <Card>
                <Card.Body>
                  <Button variant="dark">Confirm and pay</Button>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingScreen;
