import React from "react";
import { Row, Card, Col, Form, Table, Button } from "react-bootstrap";

const ClinicBoxCard = ({
  clinic,
  onSelectClinicNameHandler,
  onSelectClinicAddressHandler,
  onSelectClinicHoursHandler,
  onSelectClinicLongitudeHandler,
  onSelectClinicLatitudeHandler,
  removeClinicHandler,
}) => {
  const dayHoursPairs = clinic.clinicHours.split(/,\s(?=[A-Za-z])/);
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>Name:</Col>
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Enter clinic name"
              name="message"
              as="textarea"
              rows={3}
              value={clinic.clinicName}
              onChange={(e)=>onSelectClinicNameHandler(clinic._id, e)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>Address:</Col>
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Enter clinic address"
              name="message"
              as="textarea"
              rows={3}
              value={clinic.clinicAddress}
              onChange={(e)=>onSelectClinicAddressHandler(clinic._id,e)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>Longitude:</Col>
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Enter clinic longitude"
              value={clinic.clinicLongitude}
              onChange={(e)=>onSelectClinicLongitudeHandler(clinic._id,e)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>Latitude:</Col>
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Enter clinic latitude"
              value={clinic.clinicLatitude}
              onChange={(e)=>onSelectClinicLatitudeHandler(clinic._id,e)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>Hours:</Col>
          <Col md={9}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {dayHoursPairs.map((pair) => {
                  // Split each pair into day and hours
                  //console.log(pair)
                  const [day, hours] = pair.split(" : ");
                  // Split the hours into individual time slots
                  return (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>
                        <Form.Control type="text" value={hours} onChange={(e) =>onSelectClinicHoursHandler(clinic._id, day, e)}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          {" "}
          <Button
            style={{ backgroundColor: "red", borderColor: "red" }}
            onClick={() => removeClinicHandler(clinic._id)}
          >
            Remove clinic
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ClinicBoxCard;
