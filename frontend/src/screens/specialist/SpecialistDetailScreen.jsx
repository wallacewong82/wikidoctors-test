// this is the individual screen when you click profile
import React, { useState } from "react";

import { Row, Col, Container, Button, Image, Dropdown } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetSpecialistDetailsQuery } from "../../slices/specialistsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import NewAppointmentScreen from "../appointment/AppointmentScreen";
import GoogleMapComp from "../../components/GoogleMapComp";

const SpecialistDetailScreen = () => {
  const { id: specialistId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [startclinicval, setStartClinicVal] = useState(0);
  const changeClinicHandler = (value) => {
    setStartClinicVal(value);
  };
  const {
    data: specialist,
    isLoading,
    error,
  } = useGetSpecialistDetailsQuery(specialistId);

  const displaySpecHandler = () => {
    setShowModal(true);
  };
  const mapcenter = {
    lat: 1.357107,
    lng: 103.8194992,
  };
  // const [imageUrl, setImageUrl] = useState('');
  // useEffect(() => {
  //   // Construct the image URL using the fileId from specialist.image
  //   const imageSrc = `/api/image/${specialist.image}`;
  //   setImageUrl(imageSrc);
  // }, [specialist.image]);
  return (
    <>
      <Container style={{ height: 100 }}></Container>
      <Link className="btn btn-dark my-3" to={-1}>
        Back to Search Result
      </Link>
      <h2>Specialist Details</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Container style={{ borderWidth: "2px", borderStyle: "solid" }}>
          {showModal ? (
            <NewAppointmentScreen
              specialist={specialist}
              setShowModal={setShowModal}
            />
          ) : null}
          <Row className="my-3">
            <Col
              md={3}
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={`/api/image/${specialist.image}`}
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "1em 1em 1em 1em",
                  borderColor: "grey",
                  maxHeight: "320px",
                  maxWidth: "400px",
                  minWidth: "240px",
                }}
              ></Image>
            </Col>
            <Col md={9}>
              <Row>
                <Col md={9}>
                  <h3>
                    {specialist.title ? specialist.title : "Dr"}{" "}
                    {specialist.name}{" "}
                    {specialist.verified ? (
                      <Button
                        style={{
                          borderRadius: "1em 1em 1em 1em",
                          maxWidth: "max-content",
                          backgroundColor: "white",
                          fontSize: "20px",
                          color: "maroon",
                          borderColor: "maroon",
                          display: "absolute",
                          alignItems: "center",
                          marginLeft: "auto",
                          marginTop: "-5px",
                        }}
                        disabled
                      >
                        Verified
                      </Button>
                    ) : null}
                  </h3>
                </Col>
                <Col md={3}>
                  <Button
                    className="btn-block"
                    type="button"
                    style={
                      !(specialist.clinic.length > 0)
                        ? {
                            backgroundColor: "lightgrey",
                            borderColor: "lightgrey",
                            fontSize: "24px",
                            borderRadius: "1em 1em 1em 1em",
                          }
                        : {
                            fontSize: "24px",
                            borderRadius: "1em 1em 1em 1em",
                            backgroundColor: "#40679E",
                            borderColor: "#40679E",
                          }
                    }
                    disabled={!(specialist.clinic.length > 0)}
                    onClick={displaySpecHandler}
                  >
                    <strong>Make Appointment</strong>
                  </Button>
                  {/* {specialist.clinic.length > 0 ? (
                    
                  ) : null} */}
                </Col>
              </Row>
              <Row>
                {specialist.specialty.length >= 1 && (
                  <Row key={specialist.specialty._id}>
                    <Col md={3} className="my-2">
                      <h5>Specialties :</h5>
                    </Col>
                    <Col
                      md={9}
                      className="my-2"
                      style={{ display: "flex", verticalAlign: "center" }}
                    >
                      {specialist.specialty.map((specialtyfocus) =>
                        specialtyfocus.specialty ? (
                          <Button
                            key={specialtyfocus._id}
                            style={{
                              height: "36px",
                              maxWidth: "max-content",
                              fontSize: "13px",
                              backgroundColor: "grey",
                              borderColor: "grey",
                              borderRadius: "1em 1em 1em 1em",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "3px",
                              marginLeft: "10px",
                            }}
                            disabled
                          >
                            <h5>{specialtyfocus.specialty}</h5>
                          </Button>
                        ) : null
                      )}
                    </Col>
                  </Row>
                )}
                {specialist.specialty.some((obj) =>
                  obj.hasOwnProperty("subspecialty")
                ) ? (
                  <Row key={specialist.specialty._id}>
                    <Col md={3} className="my-2">
                      <h5>Sub-specialties :</h5>
                    </Col>
                    <Col
                      md={9}
                      className="my-2"
                      style={{ display: "flex", verticalAlign: "center" }}
                    >
                      {specialist.specialty.map((specialtyfocus) =>
                        specialtyfocus.subspecialty ? (
                          <Button
                            key={specialtyfocus._id}
                            style={{
                              height: "36px",
                              maxWidth: "max-content",
                              fontSize: "13px",
                              backgroundColor: "grey",
                              borderColor: "grey",
                              borderRadius: "1em 1em 1em 1em",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "3px",
                              marginLeft: "10px",
                            }}
                            disabled
                          >
                            <h5>{specialtyfocus.subspecialty}</h5>
                          </Button>
                        ) : null
                      )}
                    </Col>
                  </Row>
                ) : null}
                {specialist.specialty.some((obj) =>
                  obj.hasOwnProperty("clinicalinterest")
                ) ? (
                  <Row key={specialist.specialty._id}>
                    <Col md={3} className="my-2">
                      <h5>Clinical interests :</h5>
                    </Col>
                    <Col
                      md={9}
                      className="my-2"
                      style={{ display: "flex", verticalAlign: "center" }}
                    >
                      {specialist.specialty.map((specialtyfocus) =>
                        specialtyfocus.clinicalinterest ? (
                          <Button
                            key={specialtyfocus._id}
                            style={{
                              height: "40px",
                              maxWidth: "max-content",
                              fontSize: "8px",
                              backgroundColor: "navy",
                              borderColor: "navy",
                              borderRadius: "1em 1em 1em 1em",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "3px",
                              marginLeft: "10px",
                            }}
                            disabled
                          >
                            <p style={{fontSize:"15px", marginTop:"12px"}}>{specialtyfocus.clinicalinterest}</p>
                          </Button>
                        ) : null
                      )}
                    </Col>
                  </Row>
                ) : null}
              </Row>
              {specialist.qualifications ? (
                <Row>
                  <Col md={3} className="my-2">
                    <h5>Qualifications :</h5>
                  </Col>
                  <Col
                    md={9}
                    className="my-2"
                    style={{ display: "flex", verticalAlign: "center" }}
                  >
                    {specialist.qualifications.length >= 1 && (
                      <h5 style={{ marginLeft: "6px" }}>
                        {specialist.qualifications.trim()}
                      </h5>
                    )}
                  </Col>
                </Row>
              ) : null}
              {specialist.insurerPanel ? (
                <Row>
                  <Col md={3} className="my-2">
                    <h5>Insurers :</h5>
                  </Col>
                  <Col
                    md={9}
                    className="my-2"
                    style={{ display: "flex", verticalAlign: "center" }}
                  >
                    {specialist.insurerPanel.map((insurer) =>
                      insurer.insurerName ? (
                        <Button
                          key={insurer._id}
                          style={{
                            height: "36px",
                            maxWidth: "max-content",
                            fontSize: "13px",
                            color: "black",
                            backgroundColor: "lightgrey",
                            borderColor: "lightgrey",
                            borderRadius: "1em 1em 1em 1em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "3px",
                          }}
                          disabled
                        >
                          <h5>
                            {insurer.insurerName} {insurer.panelType}
                          </h5>
                        </Button>
                      ) : null
                    )}
                  </Col>
                </Row>
              ) : null}
              {specialist.languages ? (
                <Row>
                  <Col md={3} className="my-2">
                    <h5>Languages :</h5>
                  </Col>
                  <Col
                    md={9}
                    className="my-2"
                    style={{
                      display: "flex",
                      verticalAlign: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {specialist.languages.map((language) =>
                      language ? (
                        <Button
                          key={language._id}
                          style={{
                            height: "36px",
                            maxWidth: "max-content",
                            color: "black",
                            backgroundColor: "white",
                            fontSize: "13px",
                            borderRadius: "1em 1em 1em 1em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "3px",
                          }}
                          disabled
                        >
                          <h5>{language.language}</h5>
                        </Button>
                      ) : null
                    )}
                  </Col>
                </Row>
              ) : null}
              {specialist.location ? (
                <Row>
                  <Col md={3} className="my-2">
                    <h5>Locations :</h5>
                  </Col>
                  <Col
                    md={9}
                    className="my-2"
                    style={{
                      display: "flex",
                      verticalAlign: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {specialist.location.map((location) =>
                      location ? (
                        <Button
                          key={location._id}
                          style={{
                            height: "36px",
                            maxWidth: "max-content",
                            color: "white",
                            backgroundColor: "black",
                            fontSize: "13px",
                            borderRadius: "1em 1em 1em 1em",
                            borderColor: "black",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "3px",
                          }}
                          disabled
                        >
                          <h5>{location.locationName}</h5>
                        </Button>
                      ) : null
                    )}
                  </Col>
                </Row>
              ) : null}
            </Col>
          </Row>
          <hr />
          {specialist.writeup ? (
            <Row className="my-2">
              <span style={{ fontSize: "20px" }}>
                <h4>Professional Profile:</h4>{" "}
                {specialist.writeup
                  .replace("&amp;", "&")
                  .replace("・・", "'")
                  .replace("・・", "'")
                  .replace("・・", "'")}
              </span>
            </Row>
          ) : null}

          {specialist.clinic.length > 0 ? (
            specialist.clinic.length > 1 ? (
              <>
                <Row style={{ fontSize: "20px" }}>
                  <hr />
                  <span style={{ fontSize: "22px" }}>
                    <h4>Clinic(s)</h4>
                  </span>
                  <Col md={3}>Clinic name:</Col>
                  <Col md={7}>
                    <strong>
                      {specialist.clinic[startclinicval].clinicName.replace(
                        "&amp;",
                        "&"
                      )}{" "}
                      - {specialist.location[startclinicval].locationName}
                    </strong>
                  </Col>

                  <Col md={2}>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Change Clinic
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {specialist.clinic.map((clinic, index) => (
                          <Dropdown.Item
                            onClick={() => changeClinicHandler(index)}
                            key={index}
                          >
                            {clinic.clinicName.replace("&amp;", "&")} -{" "}
                            {specialist.location[index].locationName}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Row style={{ fontSize: "20px" }}>
                  <Col md={3}>Clinic address:</Col>
                  <Col md={9}>
                    {specialist.clinic[startclinicval].clinicAddress.replace(
                      "&amp;",
                      "&"
                    )}
                    <GoogleMapComp
                      center={
                        specialist.location[startclinicval].locationLongitude
                          ? {
                              lat: parseFloat(
                                specialist.location[startclinicval].locationLatitude
                              ),
                              lng: parseFloat(
                                specialist.location[startclinicval]
                                  .locationLongitude
                              ),
                            }
                          : mapcenter
                      }
                      zoom={14}
                      height={"25vh"}
                      locationname={"X"}
                    />
                  </Col>
                </Row>
                <Row style={{ fontSize: "20px" }}>
                  <Col md={3}>Clinic hours:</Col>
                  <Col md={9}>
                    {specialist.clinic[startclinicval].clinicHours
                      .split("; ")
                      .map((item, index) => {
                        // Split each pair by colon to separate day and hours
                        const [day, hours] = item.split(" : ");

                        // Check if the day contains numbers
                        if (!/\d/.test(day)) {
                          // Render the day and hours
                          return (
                            <div key={index}>
                              <strong>{day}:</strong> {hours}
                            </div>
                          );
                        }

                        // If the day contains numbers, skip rendering
                        return null;
                      })}
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row style={{ fontSize: "20px" }}>
                  <hr />
                  <span style={{ fontSize: "22px" }}>
                    <h4>Clinic</h4>
                  </span>
                  <Col md={3}>Clinic name:</Col>
                  <Col md={7}>
                    <strong>
                      {specialist.clinic[startclinicval].clinicName.replace(
                        "&amp;",
                        "&"
                      )}{" "}
                      - {specialist.location[startclinicval].locationName}
                    </strong>
                  </Col>
                </Row>
                <Row style={{ fontSize: "20px" }}>
                  <Col md={3}>Clinic address:</Col>
                  <Col md={9}>
                    {specialist.clinic[startclinicval].clinicAddress.replace(
                      "&amp;",
                      "&"
                    )}
                    <GoogleMapComp
                      center={
                        specialist.location[startclinicval].locationLongitude
                          ? {
                              lat: parseFloat(
                                specialist.location[startclinicval].locationLatitude
                              ),
                              lng: parseFloat(
                                specialist.location[startclinicval]
                                  .locationLongitude
                              ),
                            }
                          : mapcenter
                      }
                      zoom={14}
                      height={"25vh"}
                      locationname={"X"}
                    />
                  </Col>
                </Row>
                <Row style={{ fontSize: "20px" }}>
                  <Col md={3}>Clinic hours:</Col>
                  <Col md={9}>
                    {specialist.clinic[startclinicval].clinicHours
                      .split("; ")
                      .map((item, index) => {
                        // Split each pair by colon to separate day and hours
                        const [day, hours] = item.split(" : ");

                        // Check if the day contains numbers
                        if (!/\d/.test(day)) {
                          // Render the day and hours
                          return (
                            <div key={index}>
                              <strong>{day}:</strong> {hours}
                            </div>
                          );
                        }

                        // If the day contains numbers, skip rendering
                        return null;
                      })}
                  </Col>
                </Row>
              </>
            )
          ) : null}
        </Container>
      )}
    </>
  );
};

export default SpecialistDetailScreen;
