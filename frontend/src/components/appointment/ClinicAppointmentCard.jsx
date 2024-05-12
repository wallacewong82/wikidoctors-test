import React, { useState, useEffect } from "react";
import { Card, Row, Col, Dropdown, Button, Form } from "react-bootstrap";
import ShowClinicHours from "./ShowClinicHours";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../components/Loader";
import {
  useNewAppointmentMutation,
  useGetAppointmentsByClinicIdQuery,
} from "../../slices/appointmentsApiSlice";

const ClinicAppointmentCard = ({
  specialistLocs,
  specialistTitle,
  specialistName,
  specialistClinics,
  setShowModal,
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
  const phoneRegex = /^[3689]\d{7}$/;
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
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const activateJoinHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (emailRegex.test(email)) {
      setEmailButtonEnabled(true);
      setEmailValid(true);
    }
    if (!emailRegex.test(email)) {
      setEmailButtonEnabled(false);
      setEmailValid(false);
    }
  };
  const activatePhoneHandler = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
    if (phoneRegex.test(phone.replace(" ", ""))) {
      setPhoneButtonEnabled(true);
      setPhoneValid(true);
    }
    if (!phoneRegex.test(phone.replace(" ", ""))) {
      setPhoneButtonEnabled(false);
      setPhoneValid(false);
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
    if (todayDate === "") {
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
    setTodayDate,
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
          "<WikiDoctors.com> Your appointment with " +
          (specialistTitle ? specialistTitle : "Dr ") +
          specialistName,
        clinicname: selectedClinic,
        clinicID: selectedClinicID,
        clinicAddress: selectedClinicAddress,
        doctorname:
          (specialistTitle ? specialistTitle : "Dr ") + specialistName,
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
    <Card className={"custom-apptcard"}>
      {isLoading && <Loader />}
      {!showConfirmAppointmentPage && (
        <>
          <Card.Header>
            <Card.Title className={"custom-apptcardtitle"}>
              {specialistClinics.length > 1 ? (
                <Row>
                  <Col md={2} className="d-md-none">
                    <Dropdown>
                      <Dropdown.Toggle
                        className={"custom-apptcarddropdowntoggle"}
                        id="dropdown-basic"
                      >
                        Change Clinic
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className={"custom-apptcardclinicdropdownmenu"}
                      >
                        {specialistClinics.map((clinic, index) => (
                          <React.Fragment key={index}>
                            <Dropdown.Item
                              className={"custom-apptcardclinicdropdownitem"}
                              onClick={() => changeClinicHandler(index)}
                              key={index}
                            >
                              {clinic.clinicName.replace("&amp;", "&")} -{" "}
                              {specialistLocs[index].locationName}
                            </Dropdown.Item>
                            {index !== specialistClinics.length - 1 && (
                              <Dropdown.Divider />
                            )}
                          </React.Fragment>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col md={3} className={"custom-apptcardclinictitle"}>
                    Clinic name:
                  </Col>
                  <Col md={7} className={"custom-apptcardclinicdetails"}>
                    {specialistClinics[startclinicval].clinicName.replace(
                      "&amp;",
                      "&"
                    )}{" "}
                    - {specialistLocs[startclinicval].locationName}
                  </Col>
                  <Col md={2} className="d-none d-md-block">
                    <Dropdown>
                      <Dropdown.Toggle
                        className={"custom-apptcarddropdowntoggle"}
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
                            {clinic.clinicName.replace("&amp;", "&")} -{" "}
                            {specialistLocs[index].locationName}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col md={3} className={"custom-apptcardclinictitle"}>
                    Clinic name:
                  </Col>
                  <Col md={7} className={"custom-apptcardclinicdetails"}>
                    {specialistClinics[startclinicval].clinicName.replace(
                      "&amp;",
                      "&"
                    )}{" "}
                    - {specialistLocs[startclinicval].locationName}
                  </Col>
                </Row>
              )}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className={"custom-apptcardrow"}>
              <Col md={3} className={"custom-apptcardclinictitle"}>
                Clinic address:
              </Col>
              <Col md={9} className={"custom-apptcardclinicdetails"}>
                {specialistClinics[startclinicval].clinicAddress.replace(
                  "&amp;",
                  "&"
                )}
              </Col>
            </Row>
            <Row className={"custom-apptcardrow"}>
              <Col md={3} className={"custom-apptcardclinictitle"}>
                Available dates:
              </Col>
              <Col md={9} className="d-md-none">
                <Row className={"custom-apptcardrow2"}>
                  <Col>
                    <Button
                      onClick={previousweekHandler}
                      disabled={!leftActive}
                      className={"custom-apptcardarrowbtn"}
                    >
                      &lt;
                    </Button>
                  </Col>
                  <Col>
                    {daysOfWeek.map((_, index) => {
                      const date = displayedDate;
                      const today = displayedDate.getDay();
                      date.setDate(date.getDate() + (index - today));
                      const options2 = { weekday: "short" };
                      const myday = date.toLocaleDateString("en-US", options2);
                      const selectyear = date.getFullYear();

                      const formattedDate = date.toLocaleDateString(
                        undefined,
                        options
                      );

                      const isDisabled =
                        date.setHours(0, 0, 0, 0) <
                        todayDate.setHours(0, 0, 0, 0);

                      return (
                        <Col key={index}>
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
                                  <>
                                    <Row
                                      key={i}
                                      className="custom-apptcardcol3"
                                    >
                                      <Button
                                        className={
                                          activeIndex === index &&
                                          selectedDate === formattedDate
                                            ? "custom-apptcarddaybtn1"
                                            : "custom-apptcarddaybtn2"
                                        }
                                        onClick={() => {
                                          onClickHandler(hours);
                                          setActiveIndex(index);
                                          setSelectedDate(formattedDate);
                                          setSelectedYear(selectyear);
                                        }}
                                        disabled={isDisabled}
                                        block
                                      >
                                        {formattedDate}
                                      </Button>
                                    </Row>
                                  </>
                                );
                              }

                              return null;
                            })}
                        </Col>
                      );
                    })}
                  </Col>
                  <Col>
                    <Button
                      onClick={nextweekHandler}
                      disabled={!rightActive}
                      className={"custom-apptcardarrowbtn"}
                    >
                      &gt;
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col
                md={9}
                className={"d-none d-md-block custom-apptcardclinicdetails"}
              >
                <Row>
                  <Col md={1}>
                    <Button
                      onClick={previousweekHandler}
                      disabled={!leftActive}
                      className={"custom-apptcardarrowbtn"}
                    >
                      &lt;
                    </Button>
                  </Col>
                  <Col md={10} className={"custom-apptcardcol5"}>
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
                        const selectyear = date.getFullYear();

                        const formattedDate = date.toLocaleDateString(
                          undefined,
                          options
                        );

                        const isDisabled =
                          date.setHours(0, 0, 0, 0) <
                          todayDate.setHours(0, 0, 0, 0);

                        return (
                          <Col key={index} className={"custom-apptcardcol1"}>
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
                                    <>
                                      <Col
                                        key={i}
                                        className="custom-apptcardcol2"
                                      >
                                        <Button
                                          className={
                                            activeIndex === index &&
                                            selectedDate === formattedDate
                                              ? "custom-apptcarddaybtn1"
                                              : "custom-apptcarddaybtn2"
                                          }
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
                                    </>
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
                      className={"custom-apptcardarrowbtn"}
                    >
                      &gt;
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={"custom-apptcardrow"}>
              <Col md={3} className={"custom-apptcardclinictitle"}>
                Available times:
              </Col>
              <Col md={9} className={"custom-apptcardclinicdetails2"}>
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
            <Row className={"custom-apptcardrow"}>
              <Col md={3} className={"custom-apptcardclinictitle"}>
                Your selected appointment:
              </Col>
              <Col md={6} className={"custom-apptcardclinicdetails1"}>
                <p>
                  {specialistTitle ? specialistTitle : "Dr"} {specialistName}
                </p>
                <p>
                  {selectedClinic} - {selectedClinicAddress}
                  {"  "}
                </p>
                {selectedDate} {selectedYear}{" "}
                {selectedTime ? `at ${selectedTime} hrs` : null}
              </Col>
              <Col md={3} className={"custom-apptcardcol2"}>
                <Button
                  className={"custom-apptcardconfirmapptbtn"}
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
            <Row className={"custom-apptcardrow"}>
              <Col md={3} className={"d-md-none"}>
                {" "}
                <Button
                  className={"custom-apptcardchangeapptbtn"}
                  onClick={reverseAppointmentHandler}
                >
                  Change appointment
                </Button>
              </Col>
              <Col md={3} className={"custom-apptcardclinictitle"}>
                Appointment details:
              </Col>
              <Col md={6} className={"custom-apptcardclinicdetails1"}>
                <p>
                  {specialistTitle ? specialistTitle : "Dr"} {specialistName}
                </p>
                <p>
                  {selectedClinic} - {selectedClinicAddress}
                  {"  "}
                </p>
                {selectedDate} {selectedYear}{" "}
                {selectedTime ? `at ${selectedTime} hrs` : null}
              </Col>
              <Col md={3} className={"d-none d-md-block custom-apptcardcol6"}>
                {" "}
                <Button
                  className={"custom-apptcardchangeapptbtn"}
                  onClick={reverseAppointmentHandler}
                >
                  Change appointment
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={submitConfirmHandler}>
              <Row className={"custom-apptcardrow"}>
                <Col md={3} className={"custom-apptcardclinictitle"}>
                  Enter personal details:
                </Col>
                <Col md={9} className={"custom-apptcardclinicdetails1"}>
                  <Row>
                    <Col md={3} className={"custom-apptcardclinictitle"}>
                      {" "}
                      <Form.Label className={"custom-apptcardapptformlabel"}>
                        Your Name*:
                      </Form.Label>
                    </Col>
                    <Col md={9} className={"custom-apptcardclinicdetails2"}>
                      {" "}
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter your name"
                        className={"custom-apptcardapptformfield"}
                        required
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} className={"custom-apptcardclinictitle"}>
                      {" "}
                      <Form.Label className={"custom-apptcardapptformlabel"}>
                        Your Email*:
                      </Form.Label>
                    </Col>
                    <Col md={9} className={"custom-apptcardclinicdetails2"}>
                      {" "}
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={activateJoinHandler}
                        onBlur={activateJoinHandler}
                        value={email}
                        placeholder="Enter your email"
                        className={"custom-apptcardapptformfield"}
                        required
                      ></Form.Control>
                    </Col>
                    {!emailValid && <p className={"custom-apptcardvalidprompts"}>Please enter a valid email address.</p>}

                  </Row>
                  <Row>
                    <Col md={3} className={"custom-apptcardclinictitle"}>
                      <Form.Label className={"custom-apptcardapptformlabel"}>
                        Your Phone*:
                      </Form.Label>
                    </Col>
                    <Col md={9} className={"custom-apptcardclinicdetails2"}>
                      <Form.Control
                        type="text"
                        name="phone"
                        onChange={activatePhoneHandler}
                        onBlur={activatePhoneHandler}
                        value={phone}
                        placeholder="Enter your phone number"
                        className={"custom-apptcardapptformfield"}
                        required
                      ></Form.Control>
                    </Col>
                    {!phoneValid && <p className={"custom-apptcardvalidprompts"}>Please enter a valid phone number (8 digits only).</p>}

                  </Row>
                  <Row>
                    <Col md={3} className={"custom-apptcardclinictitle"}>
                      <Form.Label className={"custom-apptcardapptformlabel"}>
                        Message to Clinic (optional):
                      </Form.Label>
                    </Col>
                    <Col md={9} className={"custom-apptcardclinicdetails2"}>
                      <Form.Control
                        type="text"
                        name="message"
                        as="textarea"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder="Enter your message"
                        rows={4}
                        className={"custom-apptcardapptformfield"}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className={"custom-apptcardrow"}>
                <Col md={9}></Col>

                <Col md={3} className={"custom-apptcardcol7"}>
                  <Button
                    type="submit"
                    className={"custom-apptcardsubmitbtn2"}
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
