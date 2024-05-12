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
      <Container className={"custom-specialistscreencontainer"}></Container>
      <Link className={"custom-specialistdetailbackbtn"} to={-1}>
        Back to Search Result
      </Link>
      <h2 className={"custom-htwo"}>Specialist Details</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Container className={"custom-specialistdetailcontainer"}>
          {showModal ? (
            <NewAppointmentScreen
              specialist={specialist}
              setShowModal={setShowModal}
            />
          ) : null}
          <Row className="d-md-none">
            <h3 className={"custom-hthree"}>
              {specialist.title ? specialist.title : "Dr"} {specialist.name}{" "}
              {specialist.verified ? (
                <Button
                  className={"custom-specialistdetailverifiedbtn"}
                  disabled
                >
                  Verified
                </Button>
              ) : null}
            </h3>
          </Row>
          <Row className="my-3">
            <Col md={3} className={"custom-specialistdetailcol1"}>
              <Image
                src={`/api/image/${specialist.image}`}
                className={"custom-specialistdetailimage"}
              ></Image>
            </Col>
            <Col md={9}>
              <Row>
                <Col md={9} className="d-none d-md-block">
                  <h3>
                    {specialist.title ? specialist.title : "Dr"}{" "}
                    {specialist.name}{" "}
                    {specialist.verified ? (
                      <Button
                        className={"custom-specialistdetailverifiedbtn"}
                        disabled
                      >
                        Verified
                      </Button>
                    ) : null}
                  </h3>
                </Col>
                <Col md={3}>
                  <Button
                    className={
                      !(specialist.clinic.length > 0)
                        ? "custom-specialistdetailappointmentbutton1"
                        : "custom-specialistdetailappointmentbutton2"
                    }
                    type="button"
                    disabled={!(specialist.clinic.length > 0)}
                    onClick={displaySpecHandler}
                  >
                    <strong>Make Appointment</strong>
                  </Button>
                </Col>
              </Row>
              <Row>
                {specialist.specialty.length >= 1 && (
                  <Row key={specialist.specialty._id}>
                    <Col md={3} className="my-2">
                      <h5 className="custom-hfive2">Specialties:</h5>
                    </Col>
                    <Col
                      md={9}
                      className={"custom-specialistdetailcol"}
                    >
                      {specialist.specialty.map((specialtyfocus) =>
                        specialtyfocus.specialty ? (
                          <Button
                            className={"custom-specialistcardspecialty"}
                            key={specialtyfocus._id}
                            disabled
                          >
                            <h5 className={"custom-hfive"}>
                              {specialtyfocus.specialty}
                            </h5>
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
                      <h5 className="custom-hfive2">Sub-specialties:</h5>
                    </Col>
                    <Col
                      md={9}
                      className={"custom-specialistdetailcol"}
                    >
                      {specialist.specialty.map((specialtyfocus) =>
                        specialtyfocus.subspecialty ? (
                          <Button
                            key={specialtyfocus._id}
                            className={"custom-specialistcardspecialty"}
                            disabled
                          >
                            <h5 className={"custom-hfive"}>
                              {specialtyfocus.subspecialty}
                            </h5>
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
                      <h5 className="custom-hfive2">Clinical interests:</h5>
                    </Col>
                    <Col
                      md={9}
                      className={"custom-specialistdetailcol"}
                    >
                      {specialist.specialty.map((specialtyfocus) =>
                        specialtyfocus.clinicalinterest ? (
                          <Button
                            key={specialtyfocus._id}
                            className={"custom-specialistcardspecialty"}
                            disabled
                          >
                            <h5 className={"custom-hfive"}>
                              {specialtyfocus.clinicalinterest}
                            </h5>
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
                    <h5 className="custom-hfive2">Qualifications:</h5>
                  </Col>
                  <Col
                    md={9}
                    className={"custom-specialistdetailcol"}
                  >
                    {specialist.qualifications.length >= 1 && (
                      <h5
                        className="custom-hfive3"
                      >
                        {specialist.qualifications.trim()}
                      </h5>
                    )}
                  </Col>
                </Row>
              ) : null}
              {specialist.insurerPanel ? (
                <Row>
                  <Col md={3} className="my-2">
                    <h5 className="custom-hfive2">Insurers:</h5>
                  </Col>
                  <Col
                    md={9}
                    className={"custom-specialistdetailcol"}
                  >
                    {specialist.insurerPanel.map((insurer) =>
                      insurer.insurerName ? (
                        <Button
                          key={insurer._id}
                          className={"custom-specialistcardspecialty"}
                          style={{
                            color: "black",
                            borderColor:"#1165a0",
                            backgroundColor: "white",
                            margin: "3px",
                          }}
                          disabled
                        >
                          <h5 className={"custom-hfive"}>
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
                    <h5 className="custom-hfive2">Languages:</h5>
                  </Col>
                  <Col
                    md={9}
                    className={"custom-specialistdetailcol"}
                  >
                    {specialist.languages.map((language) =>
                      language ? (
                        <Button
                          key={language._id}
                          className={"custom-specialistcardspecialty"}
                          style={{
                            color: "black",
                            backgroundColor: "white",
                            margin: "3px",
                          }}
                          disabled
                        >
                          <h5 className={"custom-hfive"}>
                            {language.language}
                          </h5>
                        </Button>
                      ) : null
                    )}
                  </Col>
                </Row>
              ) : null}
              {specialist.location ? (
                <Row>
                  <Col md={3} className="my-2">
                    <h5 className="custom-hfive2">Locations:</h5>
                  </Col>
                  <Col
                    md={9}
                    className={"custom-specialistdetailcol"}
                  >
                    {specialist.location.map((location) =>
                      location ? (
                        <Button
                          key={location._id}
                          className={"custom-specialistcardspecialty"}
                          style={{
                            color: "black",
                            backgroundColor: "white",
                            borderColor:"black",
                            margin: "3px",
                          }}
                          disabled
                        >
                          <h5 className={"custom-hfive"}>
                            {location.locationName}
                          </h5>
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
              <span className={"custom-specialistdetailwriteupspan"}>
                <h4 className="custom-hfive2">Professional Profile:</h4>{" "}
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
                <Row className={"custom-specialistdetailrow"}>
                  <hr />
                  <span className={"custom-specialistdetailspan"}>
                    <h4 className="custom-hfive2">Clinic(s):</h4>
                  </span>
                  <Dropdown className="d-md-none">
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                      Change Clinic
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      className={"custom-specialistdetailclinicdropdownmenu"}
                    >
                      {specialist.clinic.map((clinic, index) => (
                        <React.Fragment key={index}>
                          <Dropdown.Item
                            onClick={() => changeClinicHandler(index)}
                            key={index}
                            className={
                              "custom-specialistdetailclinicdropdownitem"
                            }
                          >
                            {clinic.clinicName.replace("&amp;", "&")} -{" "}
                            {specialist.location[index].locationName}
                          </Dropdown.Item>
                          {index !== specialist.clinic.length - 1 && (
                            <Dropdown.Divider />
                          )}
                        </React.Fragment>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Col md={3} className={"custom-specialistdetailclinictitle"}>
                    Clinic name:
                  </Col>
                  <Col
                    md={7}
                    className={"custom-specialistdetailclinicdetails"}
                  >
                    <strong>
                      {specialist.clinic[startclinicval].clinicName.replace(
                        "&amp;",
                        "&"
                      )}{" "}
                      - {specialist.location[startclinicval].locationName}
                    </strong>
                  </Col>

                  <Col md={2}>
                    <Dropdown className="d-none d-md-block">
                      <Dropdown.Toggle variant="dark" id="dropdown-basic" className={"custom-specialistdetailchangeclinicbtn"}>
                        Change Clinic
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {specialist.clinic.map((clinic, index) => (
                          <React.Fragment key={index}>
                            <Dropdown.Item
                              onClick={() => changeClinicHandler(index)}
                              key={index}
                              className={
                                "custom-specialistdetailclinicdropdownitem"
                              }
                            >
                              {clinic.clinicName.replace("&amp;", "&")} -{" "}
                              {specialist.location[index].locationName}
                            </Dropdown.Item>
                            {index !== specialist.clinic.length - 1 && (
                              <Dropdown.Divider />
                            )}
                          </React.Fragment>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Row className={"custom-specialistdetailrow"}>
                  <Col md={3} className={"custom-specialistdetailclinictitle"}>
                    Clinic address:
                  </Col>
                  <Col
                    md={9}
                    className={"custom-specialistdetailclinicdetails"}
                  >
                    {specialist.clinic[startclinicval].clinicAddress.replace(
                      "&amp;",
                      "&"
                    )}
                    <GoogleMapComp
                      center={
                        specialist.location[startclinicval].locationLongitude
                          ? {
                              lat: parseFloat(
                                specialist.location[startclinicval]
                                  .locationLatitude
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
                <Row className={"custom-specialistdetailrow"}>
                  <Col md={3} className={"custom-specialistdetailclinictitle"}>
                    Clinic hours:
                  </Col>
                  <Col
                    md={9}
                    className={"custom-specialistdetailclinicdetails"}
                  >
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
                <Row className={"custom-specialistdetailrow"}>
                  <hr />
                  <span className={"custom-specialistdetailspan"}>
                    <h4 className="custom-hfive2">Clinic:</h4>
                  </span>
                  <Col md={3} className={"custom-specialistdetailclinictitle"}>
                    Clinic name:
                  </Col>
                  <Col
                    md={7}
                    className={"custom-specialistdetailclinicdetails"}
                  >
                    <strong>
                      {specialist.clinic[startclinicval].clinicName.replace(
                        "&amp;",
                        "&"
                      )}{" "}
                      - {specialist.location[startclinicval].locationName}
                    </strong>
                  </Col>
                </Row>
                <Row className={"custom-specialistdetailrow"}>
                  <Col md={3} className={"custom-specialistdetailclinictitle"}>
                    Clinic address:
                  </Col>
                  <Col
                    md={9}
                    className={"custom-specialistdetailclinicdetails"}
                  >
                    {specialist.clinic[startclinicval].clinicAddress.replace(
                      "&amp;",
                      "&"
                    )}
                    <GoogleMapComp
                      center={
                        specialist.location[startclinicval].locationLongitude
                          ? {
                              lat: parseFloat(
                                specialist.location[startclinicval]
                                  .locationLatitude
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
                <Row className={"custom-specialistdetailrow"}>
                  <Col md={3} className={"custom-specialistdetailclinictitle"}>
                    Clinic hours:
                  </Col>
                  <Col
                    md={9}
                    className={"custom-specialistdetailclinicdetails"}
                  >
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
