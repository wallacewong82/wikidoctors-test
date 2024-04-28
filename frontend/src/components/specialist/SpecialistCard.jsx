import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SpecialistCard = ({
  specialist,
  setSelectedSpecialist,
  setShowModal,
}) => {
  const [imageUrl, setImageUrl] = useState('');
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
  const appointmentEnabled = (
    specialist.clinic.length > 0 ? true : false
  );

  return (
    <Card
      className="my-1 p-1 rounded"
      key={specialist._id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "310px",
        height: "400px",
      }}
    >
      {isVerified ? (
        <Button
          style={{
            height: "16px",
            maxWidth: "max-content",
            backgroundColor: "maroon",
            fontSize: "12px",
            borderColor: "maroon",
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          Verified
        </Button>
      ) : null}
      <Row style={{ maxHeight: "40px", marginTop: "5px", textAlign: "center" }}>
        <Link
          to={`/specialists/profile/${specialist._id}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Title
            style={{ fontSize: "19px", fontWeight: "bold", marginTop: "5px" }}
          >
            <h5 style={{ color: "black" }}>
              {specialist.title ? specialist.title : "Dr"} {specialist.name}
            </h5>
          </Card.Title>
        </Link>
        <hr
          style={{ maxWidth: "324px", marginLeft: "7px", marginTop: "-7px" }}
        />
      </Row>

      <Row>
        <Row
          style={{
            height: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "400px",
            marginLeft: "1px",
          }}
        >
          {specialist.specialty.length > 1 ? (
            specialist.specialty.map((specialtyfocus) =>
              specialtyfocus.specialty ? (
                <Button
                  key={specialtyfocus._id}
                  style={{
                    height: "22px",
                    maxWidth: "max-content",
                    fontSize: "13px",
                    backgroundColor: "grey",
                    borderColor: "grey",
                    borderRadius: "1em 1em 1em 1em",
                    marginLeft: "1px",
                    marginTop: "1px",
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {specialtyfocus.specialty}{" "}
                </Button>
              ) : null
            )
          ) : (
            <Button
              style={{
                height: "22px",
                maxWidth: "max-content",
                fontSize: "12px",
                backgroundColor: "grey",
                borderColor: "grey",
                borderRadius: "1em 1em 1em 1em",
                marginLeft: "2px",
                marginTop: "1px",
                marginBottom: "1px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {specialist.specialty[0].specialty}
            </Button>
          )}
        </Row>
      </Row>
      <Row
        style={{
          height: "230px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to={`/specialists/profile/${specialist._id}`}>
          <Card.Img
            src={imageUrl}
            style={{
              // borderWidth: "1px",
              // borderStyle: "solid",
              // borderColor:"black",
              maxHeight: "200px",
              maxWidth: "250px",
              minWidth: "150px",
            }}
          />
        </Link>
      </Row>
      <Card.Body>
        <Row
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col md={4}>
            <Link to={`/specialists/profile/${specialist._id}`}>
              <Button
                className="btn-block btn-dark"
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
              className="btn-block"
              type="button"
              style={
                !appointmentEnabled
                  ? { backgroundColor: "lightgrey", borderColor: "lightgrey" }
                  : {
                      backgroundColor: "white",
                      borderColor: "#40679E",
                      color: "#40679E",
                    }
              }
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
