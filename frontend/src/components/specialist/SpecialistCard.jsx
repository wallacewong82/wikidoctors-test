import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SpecialistCard = ({
  specialist,
  setSelectedSpecialist,
  setShowModal,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    // Construct the image URL using the fileId from specialist.image
    const imageSrc = `/api/image/${specialist.image}`;
    setImageUrl(imageSrc);
  }, [specialist.image]);
  const displaySpecHandler = () => {
    setShowModal(true);
    setSelectedSpecialist(specialist);
  };
  const isVerified = specialist.verified; //to rejig data to add verified column
  const appointmentEnabled = specialist.clinic.length > 0 ? true : false;

  return (
    <Card
      //className="my-1 p-1 rounded"
      className={"custom-specialistcard"}
      key={specialist._id}
    >
      {isVerified ? (
        <Button className={"custom-specialistcardverifiedbutton"}>
          Verified
        </Button>
      ) : null}
      <Row className={"custom-specialistcardrow"}>
        <Link
          to={`/specialists/profile/${specialist._id}`}
          className={"custom-specialistcardlink"}
        >
          <Card.Title className={"custom-specialistcardtitle"}>
            <h5 className={"custom-hfive"} style={{ color: "black" }}>
              {specialist.title ? specialist.title : "Dr"} {specialist.name}
            </h5>
          </Card.Title>
        </Link>
        <hr className={"custom-specialistcardhr"} />
      </Row>

      <Row>
        <Row className={"custom-specialistcardrow2"}>
          {specialist.specialty.length > 1 ? (
            specialist.specialty.map((specialtyfocus) =>
              specialtyfocus.specialty ? (
                <Button
                  key={specialtyfocus._id}
                  className={"custom-specialistcardspecialty"}
                  disabled
                >
                  {specialtyfocus.specialty}{" "}
                </Button>
              ) : null
            )
          ) : (
            <Button className={"custom-specialistcardspecialty"} disabled>
              {specialist.specialty[0].specialty}
            </Button>
          )}
        </Row>
      </Row>
      <Row
      className={"custom-specialistcardrow3"}
      >
        <Link to={`/specialists/profile/${specialist._id}`}>
          <Card.Img
            src={imageUrl}
            className={"custom-specialistcardimg"}
            alt={`image for ${specialist.name}` }
          />
        </Link>
      </Row>
      <Card.Body>
        <Row
        className={"custom-specialistcardrow4"}
        >
          <Col md={4}>
            <Link to={`/specialists/profile/${specialist._id}`}>
              <Button
              className={"custom-specialistcardprofilebutton"}
                type="button"
                onClick={() => {
                  setSelectedSpecialist(specialist);
                }}
              >
                Profile
              </Button>
            </Link>
          </Col>
          <Col md={8}>
            <Button
            className={!appointmentEnabled
              ? "custom-specialistcardapptbutton1":"custom-specialistcardapptbutton2" }
             //className="btn-block"
              type="button"
              onClick={displaySpecHandler}
              disabled={!appointmentEnabled}
            >
              Appointment
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SpecialistCard;
