import React from "react";
import { Modal, Button } from "react-bootstrap";
const ConfirmAppointmentCard = ({setShowAppointmentModal}) => {
  return (
    <>
      <Modal show={true} className="customModal">
        <Modal.Header>
          <Modal.Title>
            Confirm Appointment
          </Modal.Title>
          <Button
            style={{
              backgroundColor: "red",
              borderColor: "red",
              fontWeight: "bold",
            }}
            onClick={() => setShowAppointmentModal(false)}
          >
            X
          </Button>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default ConfirmAppointmentCard;
