import React, { useState, useEffect } from "react";
import { Card, Row, Col, Dropdown, Button, Form } from "react-bootstrap";
import ShowClinicHours from "./ShowClinicHours";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../components/Loader";
import { useNewAppointmentMutation, useGetAppointmentsByClinicIdQuery } from "../../slices/appointmentsApiSlice";

const ClinicAppointmentCard = ({
  specialistLocs,
  specialistTitle,
  specialistName,
  specialistClinics,
  setShowModal
}) => {
  const [startclinicval, setStartClinicVal] = useState(0);
  const [selectedClinic, setSelectedClinic] = useState(
    specialistClinics[0].clinicName.replace("&amp;", "&")
  );
  const [selectedClinicID, setSelectedClinicID] = useState(
    specialistClinics[0]._id
  );
  const [selectedClinicAddress, setSelectedClinicAddress] = useState(
    specialistClinics[0].clinicAddress
  );
  // const [selectedLocation, setSelectedLocation] = useState(
  //   specialistLocs[0].locationName
  // )

  const {
    data: previousappointments,
    refetch,
    isLoading,
  } = useGetAppointmentsByClinicIdQuery(selectedClinicID);

  const changeClinicHandler = (value) => {
    setStartClinicVal(value);
    setSelectedClinic(
      specialistClinics[value].clinicName.replace("&amp;", "&")
    );
    setSelectedClinicID(specialistClinics[value]._id);
    setSelectedClinicAddress(specialistClinics[value].clinicAddress);
  };
  const [CreateNewAppointment] = useNewAppointmentMutation();
  const options = { month: "short", day: "numeric", weekday: "short" };
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [weekcount, setWeekcount] = useState(0);
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(true);
  const [currentHours, setCurrentHours] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  //const formatTodayDate = todayDate.toLocaleDateString(undefined, options);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const todayDay = todayDate.getDay();
  const [activeIndex, setActiveIndex] = useState(todayDay);
  const [showMyHours, setShowMyHours] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{8,}$/;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [showConfirmAppointmentPage, setShowConfirmAppointmentPage] =
    useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [emailButtonEnabled, setEmailButtonEnabled] = useState(false);
  const [phoneButtonEnabled, setPhoneButtonEnabled] = useState(false);

  const activateJoinHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (emailRegex.test(email)) {
      setEmailButtonEnabled(true);
    }
    if (!emailRegex.test(email)) {
      setEmailButtonEnabled(false);
    }
  };
  const activatePhoneHandler = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
    if (phoneRegex.test(phone.replace(" ", ""))) {
      setPhoneButtonEnabled(true);
    }
    if (!phoneRegex.test(phone.replace(" ", ""))) {
      setPhoneButtonEnabled(false);
    }
  };
  const onClickHandler = (hours) => {
    setShowMyHours(true);
    setCurrentHours(hours);
  };
  const nextweekHandler = () => {
    if (weekcount < 2) {
      setDisplayedDate(
        new Date(displayedDate.setDate(displayedDate.getDate() + 7))
      );
      setWeekcount(weekcount + 1);
      setShowMyHours(false);
      setSelectedTime("");
      setSelectedDate("");
      setSelectedYear("");
    }
  };
  const previousweekHandler = () => {
    if (weekcount > 0) {
      setDisplayedDate(
        new Date(displayedDate.setDate(displayedDate.getDate() - 7))
      );
      setWeekcount(weekcount - 1);
      setShowMyHours(false);
      setSelectedTime("");
      setSelectedDate("");
      setSelectedYear("");
    }
  };
  useEffect(() => {
    if (weekcount === 0) {
      setLeftActive(false);
    }
    if (weekcount < 2) {
      setRightActive(true);
    }
    if (weekcount === 2) {
      setRightActive(false);
    }
    if (weekcount > 0) {
      setLeftActive(true);
    }
  }, [weekcount, setLeftActive, setRightActive]);

  useEffect(() => {
    if(todayDate === ""){
      setTodayDate(new Date());
    }
    const weekStart = new Date(displayedDate);
    const weekEnd = new Date(displayedDate);

    weekStart.setDate(displayedDate.getDate() - displayedDate.getDay() + 1);
    weekEnd.setDate(displayedDate.getDate() - displayedDate.getDay() + 7);

    var countofworkingdaysleft = 0;
    var weekCounter = weekStart;
    for (let i = 0; i < 7; i++) {
      weekCounter.setDate(weekStart.getDate() - weekStart.getDay() + i + 1);
      const initialHighlightedDay = weekCounter.toLocaleDateString("en-US", {
        weekday: "short",
      });
      const istodayaworkday = specialistClinics[startclinicval].clinicHours
        .split(", ")
        .map((item) => item.split(" : "))
        .find(([day]) => day === initialHighlightedDay)?.[1];
      if (todayDate < weekCounter && istodayaworkday !== "Closed") {
        countofworkingdaysleft += 1;
      }
    }
    if (countofworkingdaysleft === 0) {
      setDisplayedDate(weekEnd);
    }
  }, [
    todayDate,
    displayedDate,
    specialistClinics,
    startclinicval,
    setDisplayedDate,
    setTodayDate
  ]);

  useEffect(() => {
    // Extract hours for the initially highlighted button on load
    const initialHighlightedIndex = activeIndex; // You can set this to the index of the initially highlighted button
    const initialHighlightedDate = new Date(); // Get the date of the initially highlighted button
    initialHighlightedDate.setDate(
      initialHighlightedDate.getDate() + (initialHighlightedIndex - todayDay)
    );
    const initialHighlightedDay = initialHighlightedDate.toLocaleDateString(
      "en-US",
      { weekday: "short" }
    );
    // console.log(initialHighlightedDay)

    // const hours = specialistClinics[startclinicval].clinicHours
    //   .split("; ")
    //   .map((item) => item.split(" : "))
    //   .find(([day]) => day === initialHighlightedDay)?.[1];
      const hours = specialistClinics[startclinicval].clinicHours
      .split("; ")
      .map((item) => item.split(" : "))
      .find(([day]) => day === initialHighlightedDay)?.[1];
    // console.log(specialistClinics[startclinicval].clinicHours.split("; ").map((item) => item.split(" : ")[1]))
    setCurrentHours(hours);
  }, [displayedDate, activeIndex, specialistClinics, todayDay, startclinicval]); // Run this effect whenever displayedDate changes

  const confirmAppointmentHandler = () => {
    setShowConfirmAppointmentPage(true);
    //setShowModal(false);
  };
  const reverseAppointmentHandler = () => {
    setShowConfirmAppointmentPage(false);
    setSelectedTime("");
  };

  const submitConfirmHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await CreateNewAppointment({
        _id: uuidv4(),
        eventtitle:
          "<HealthChannel.sg> Your appointment with " +
          (specialistTitle ? specialistTitle : "Dr ") +
          specialistName,
        clinicname: selectedClinic,
        clinicID: selectedClinicID,
        clinicAddress:selectedClinicAddress, 
        doctorname: (specialistTitle ? specialistTitle : "Dr ") + specialistName,
        time: selectedTime,
        date: selectedDate + " " + selectedYear,
        patientName: name,
        patientEmail: email,
        patientPhone: phone,
        patientComments: message,
        bookingStatus: "pending",
        taggedaccount: "",
      }).unwrap();
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      toast.success("Appointment request submitted for " + res.patientName);
      setShowModal(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    console.log("appointment submitted");
  };
  return (
    <Card style={{ marginTop: "5px" }}>
      {isLoading && <Loader/>}
      {!showConfirmAppointmentPage && (
        <>
          <Card.Header>
            <Card.Title style={{ fontSize: "22px", fontWeight: "bold" }}>
              {specialistClinics.length > 1 ? (
                <Row>
                  <Col md={3}>Clinic name:</Col>
                  <Col md={7}>
                    {specialistClinics[startclinicval].clinicName.replace(
                      "&amp;",
                      "&"
                    )} - {specialistLocs[startclinicval].locationName}
                  </Col>
                  <Col md={2}>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{
                          backgroundColor: "#40679E",
                          borderColor: "#40679E",
                        }}
                        id="dropdown-basic"
                      >
                        Change Clinic
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {specialistClinics.map((clinic, index) => (
                          <Dropdown.Item
                            onClick={() => changeClinicHandler(index)}
                            key={index}
                          >
                            {clinic.clinicName.replace("&amp;", "&")} - {specialistLocs[index].locationName}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col md={3}>Clinic name:</Col>
                  <Col md={7}>
                    {specialistClinics[startclinicval].clinicName.replace(
                      "&amp;",
                      "&"
                    )} - {specialistLocs[startclinicval].locationName}
                  </Col>
                </Row>
              )}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row style={{ fontSize: "20px" }}>
              <Col md={3}>Clinic address:</Col>
              <Col md={9}>
                {specialistClinics[startclinicval].clinicAddress.replace(
                  "&amp;",
                  "&"
                )}
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col md={3} style={{ fontSize: "20px" }}>
                Available dates:
              </Col>
              <Col md={9} style={{ fontSize: "16px" }}>
                <Row>
                  <Col md={1}>
                    <Button
                      onClick={previousweekHandler}
                      disabled={!leftActive}
                      style={{ backgroundColor: "black", borderColor: "black" }}
                    >
                      &lt;
                    </Button>
                  </Col>
                  <Col md={10}>
                    <Row>
                      {daysOfWeek.map((_, index) => {
                        const date = displayedDate;
                        const today = displayedDate.getDay();
                        date.setDate(date.getDate() + (index - today));
                        const options2 = { weekday: "short" };
                        const myday = date.toLocaleDateString(
                          "en-US",
                          options2
                        );
                        const selectyear =  date.getFullYear();

                        const formattedDate = date.toLocaleDateString(
                          undefined,
                          options
                        );

                        const isDisabled =
                          date.setHours(0, 0, 0, 0) <
                          todayDate.setHours(0, 0, 0, 0);

                        return (
                          <Col
                            key={index}
                            style={{ flex: 1, textAlign: "center" }}
                          >
                            {specialistClinics[startclinicval].clinicHours
                              .split("; ")
                              .map((item, i) => {
                                const [day, hours] = item.split(" : ");

                                if (
                                  !/\d/.test(day) &&
                                  day !== "Public Holiday" &&
                                  day === myday &&
                                  !hours.includes("Closed")
                                ) {
                                  return (
                                    <Col key={i}>
                                      <Button
                                        style={{
                                          height: "50px",
                                          minWidth: "70px",
                                          maxWidth: "100px",
                                          fontSize: "14px",
                                          flex: "1 1 auto",
                                          borderColor:
                                            activeIndex === index &&
                                            selectedDate === formattedDate
                                              ? "black"
                                              : isDisabled
                                              ? "grey"
                                              : "#40679E",
                                          backgroundColor:
                                            activeIndex === index &&
                                            selectedDate === formattedDate
                                              ? "black"
                                              : isDisabled
                                              ? "grey"
                                              : "#40679E",
                                        }}
                                        onClick={() => {
                                          onClickHandler(hours);
                                          setActiveIndex(index);
                                          setSelectedDate(formattedDate);
                                          setSelectedYear(selectyear);
                                        }}
                                        disabled={isDisabled}
                                      >
                                        {formattedDate}
                                      </Button>
                                    </Col>
                                  );
                                }

                                return null;
                              })}
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                  <Col md={1}>
                    <Button
                      onClick={nextweekHandler}
                      disabled={!rightActive}
                      style={{ backgroundColor: "black", borderColor: "black" }}
                    >
                      &gt;
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col md={3} style={{ fontSize: "20px" }}>
                Available times:
              </Col>
              <Col md={9} style={{ fontSize: "16px" }}>
                {showMyHours && (
                  <ShowClinicHours
                    hours={currentHours}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    previousappointments={previousappointments}
                    selectedDate={selectedDate}
                  />
                )}
              </Col>
            </Row>
            <hr />
            <Row style={{ marginTop: "20px" }}>
              <Col md={3} className="mr-auto" style={{ fontSize: "20px" }}>
                Your selected appointment:
              </Col>
              <Col md={6} style={{ fontSize: "18px", fontWeight: "lighter" }}>
                <p>
                  {specialistTitle ? specialistTitle : "Dr"} {specialistName}
                </p>
                <p>
                  {selectedClinic} - {selectedClinicAddress}
                  {"  "}
                </p>
                {selectedDate} {selectedYear} {selectedTime ? `at ${selectedTime} hrs` : null}
              </Col>
              <Col md={3} style={{ fontSize: "24px", position: "relative" }}>
                <Button
                  style={{
                    backgroundColor: "black",
                    fontSize: "20px",
                    color: "white",
                    fontWeight: "bold",
                    borderColor: "black",
                    position: "absolute",
                    bottom: 0,
                    right: 30,
                  }}
                  onClick={confirmAppointmentHandler}
                  disabled={!selectedTime}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </>
      )}
      {showConfirmAppointmentPage && (
        <>
          <Card.Header>
            <Row>
              <Col md={3} className="mr-auto" style={{ fontSize: "20px" }}>
                Appointment details:
              </Col>
              <Col md={6} style={{ fontSize: "18px", fontWeight: "lighter" }}>
                <p>
                  {specialistTitle ? specialistTitle : "Dr"} {specialistName}
                </p>
                <p>
                  {selectedClinic} - {selectedClinicAddress}
                  {"  "}
                </p>
                {selectedDate} {selectedYear} {selectedTime ? `at ${selectedTime} hrs` : null}
              </Col>
              <Col md={3} style={{ position: "relative" }}>
                {" "}
                <Button
                  style={{
                    backgroundColor: "black",
                    fontSize: "16px",
                    color: "white",
                    fontWeight: "bold",
                    borderColor: "black",
                    position: "absolute",
                    right: "30px",
                  }}
                  onClick={reverseAppointmentHandler}
                >
                  Change appointment
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={submitConfirmHandler}>
              <Row>
                <Col md={3} className="mr-auto" style={{ fontSize: "20px" }}>
                  Enter personal details:
                </Col>
                <Col md={9}>
                  <Row>
                    <Col md={3} style={{ fontSize: "16px" }}>
                      {" "}
                      <Form.Label
                        className="float-start"
                        style={{
                          fontSize: "18px",
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontWeight: "lighter",
                        }}
                      >
                        Your Name*:
                      </Form.Label>
                    </Col>
                    <Col md={9} style={{ fontSize: "18px" }}>
                      {" "}
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter your name"
                        className="mr-sm-2 ml-sm-5"
                        style={{
                          fontSize: "18px",
                          width: "265px",
                          marginTop: "5px",
                          marginBottom: "10px",
                          marginRight: "5px",
                        }}
                        required
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} style={{ fontSize: "16px" }}>
                      {" "}
                      <Form.Label
                        className="float-start"
                        style={{
                          fontSize: "18px",
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontWeight: "lighter",
                        }}
                      >
                        Your Email*:
                      </Form.Label>
                    </Col>
                    <Col md={9} style={{ fontSize: "18px" }}>
                      {" "}
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={activateJoinHandler}
                        onBlur={activateJoinHandler}
                        value={email}
                        placeholder="Enter your email"
                        className="mr-sm-2 ml-sm-5"
                        style={{
                          fontSize: "18px",
                          width: "265px",
                          marginTop: "5px",
                          marginBottom: "10px",
                          marginRight: "5px",
                        }}
                        required
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Label
                        className="float-start"
                        style={{
                          fontSize: "18px",
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontWeight: "lighter",
                        }}
                      >
                        Your Phone*:
                      </Form.Label>
                    </Col>
                    <Col md={9}>
                      <Form.Control
                        type="text"
                        name="phone"
                        onChange={activatePhoneHandler}
                        onBlur={activatePhoneHandler}
                        value={phone}
                        placeholder="Enter your phone number"
                        className="mr-sm-2 ml-sm-5"
                        style={{
                          fontSize: "18px",
                          width: "265px",
                          marginTop: "5px",
                          marginBottom: "10px",
                          marginRight: "5px",
                        }}
                        required
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Label
                        className="float-start"
                        style={{
                          fontSize: "18px",
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontWeight: "lighter",
                        }}
                      >
                        Message to Clinic (optional):
                      </Form.Label>
                    </Col>
                    <Col md={9}>
                      <Form.Control
                        type="text"
                        name="message"
                        as="textarea"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder="Enter your message"
                        className="mr-sm-2 ml-sm-5"
                        rows={4}
                        style={{
                          fontSize: "18px",
                          width: "265px",
                          marginTop: "5px",
                          marginBottom: "10px",
                          marginRight: "5px",
                        }}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={9}></Col>

                <Col md={3} style={{ position: "relative" }}>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#40679E",
                      fontSize: "20px",
                      color: "white",
                      fontWeight: "bold",
                      borderColor: "black",
                      position: "absolute",
                      width: "200px",
                      right: "30px",
                      bottom: "0",
                    }}
                    disabled={
                      !(
                        !!name &&
                        !!emailButtonEnabled &&
                        !!phoneButtonEnabled &&
                        !!phone
                      )
                    }
                  >
                    Confirm appointment
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default ClinicAppointmentCard;
