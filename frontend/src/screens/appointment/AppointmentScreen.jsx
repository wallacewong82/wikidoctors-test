import React from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import "../../assets/styles/index.css";
import ClinicAppointmentCard from "../../components/appointment/ClinicAppointmentCard";
const AppointmentScreen = ({ specialist, setShowModal }) => {

  return (
    <>
      <Modal show={true} className="customModal">
        <Modal.Header>
          <Modal.Title>
            Book appointment with {specialist.title ? specialist.title : "Dr"}{" "}
            {specialist.name}
          </Modal.Title>
          <Button
            style={{
              backgroundColor: "red",
              borderColor: "red",
              fontWeight: "bold",
            }}
            onClick={() => setShowModal(false)}
          >
            X
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={12}>
              <ClinicAppointmentCard
                specialistLocs = {specialist.location}
                specialistTitle={specialist.title}
                specialistName={specialist.name}
                specialistClinics={specialist.clinic}
                setShowModal={setShowModal}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentScreen;
