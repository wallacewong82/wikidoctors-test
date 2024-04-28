import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import { Form, Button, Col, Row, Container } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetAppointmentByIdQuery,
  useUpdateAppointmentMutation,
} from "../../slices/appointmentsApiSlice";

const AppointmentEditScreen = () => {
  const { id: appointmentId } = useParams();
  const [eventtitle, setEventTitle] = useState("");
  const [clinicname, setClinicName] = useState("");
  const [clinicID, setClinicID] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [doctorname, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentdate, setDate] = useState("");
  const [appointmenttime, setTime] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientComments, setPatientComments] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [taggedaccount, setTagging] = useState("");
  // const [sendemailflag, setSendEmailFlag] = useState(false);
  const {
    data: appointment,
    isLoading,
    refetch,
    error,
  } = useGetAppointmentByIdQuery(appointmentId);
  const [updateAppointment, { isLoading: loadingUpdate }] =
    useUpdateAppointmentMutation();

  const changeBookingStatus = (e) => {
    e.preventDefault();
    setBookingStatus(e.target.value);
    // if(e.target.value === "Confirmed" || e.target.value === "Canceled" || e.target.value === "Rescheduled"){
    //   setSendEmailFlag(true);
    // }
  };

  useEffect(() => {
    if (appointment) {
      setEventTitle(appointment.eventtitle);
      setClinicName(appointment.clinicname);
      setClinicID(appointment.clinicID);
      setClinicAddress(appointment.clinicAddress);
      setDoctorName(appointment.doctorname);
      setPatientName(appointment.patientName);
      setDate(appointment.date);
      setTime(appointment.time);
      setPatientEmail(appointment.patientEmail);
      setPatientPhone(appointment.patientPhone);
      setPatientComments(appointment.patientComments);
      setBookingStatus(appointment.bookingStatus);
      setTagging(appointment.taggedaccount);
    }
  }, [appointment]);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateAppointment({
        appointmentId,
        eventtitle,
        clinicname,
        clinicID,
        clinicAddress,
        doctorname,
        patientName,
        appointmentdate,
        appointmenttime,
        patientEmail,
        patientPhone,
        patientComments,
        bookingStatus,
        taggedaccount,
      });
      toast.success("Appointment updated successfully");
      refetch();
      navigate("/admin/appointmentlist");
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
        <h2>Edit Appointment Post</h2>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="eventtitle" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Event Title</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter event title"
                    value={eventtitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="clinicname" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Clinic Name</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter clinic name"
                    value={clinicname}
                    onChange={(e) => setClinicName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="clinicAddress" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Clinic Address</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter clinic address"
                    value={clinicAddress}
                    onChange={(e) => setClinicAddress(e.target.value)}
                  ></Form.Control>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="doctorname" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Doctor Name</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter doctor name"
                    value={doctorname}
                    onChange={(e) => setDoctorName(e.target.value)}
                  ></Form.Control>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="patientName" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Patient Name</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter patient name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="patientEmail" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Patient Email</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="email"
                    placeholder="Enter patient email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="patientPhone" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Patient Phone</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter patient phone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="patientComments" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Patient Comments</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter patient comments"
                    value={patientComments}
                    onChange={(e) => setPatientComments(e.target.value)}
                  ></Form.Control>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="bookingStatus" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Category</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    as="select" // Set the 'as' prop to 'select' to create a dropdown
                    value={bookingStatus}
                    onChange={changeBookingStatus} //pending, confirmed, canceled, completed, rescheduled, noshow
                    style={{ backgroundColor: "lightgrey" }}
                  >
                    <option value="" hidden>
                      Choose booking status
                    </option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="canceled">Canceled</option>
                    <option value="completed">Completed</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="noshow">No show</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="taggedaccount" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Account tagging</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter account to tag"
                    value={taggedaccount}
                    onChange={(e) => setTagging(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
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

export default AppointmentEditScreen;
