import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Nav,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import "react-day-picker/dist/style.css";

const ProfileScreen = () => {
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [chineseName, setChineseName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [dob, setDob] = useState("");
  //   const [idType, setIdType] = useState(false);
  //   const [idNumber, setIdNumber] = useState("");
  //   const [gender, setGender] = useState(-1);
  //   const [nationality, setNationality] = useState("");
  //   const [countryCode, setCountryCode] = useState("");
  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [homeAddress, setHomeAddress] = useState("");
  //   const [homePostalCode, setHomePostalCode] = useState("");
  //   const [isCorporate, setIsCorporate] = useState(false);
  //   const [corporateDetails, setCorporateDetails] = useState(false);
  //   const [displayPersonal, setDisplayPersonal] = useState(false);
  const [displayAccount, setDisplayAccount] = useState(true);
  //   const [displayCorporate, setDisplayCorporate] = useState(false);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
    }
    // if(userInfo.middleName){
    //     setMiddleName(userInfo.middleName);
    // }
  }, [userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submitHnadler");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          firstName,
         // middleName,
          lastName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const showAccountHandler = (e) => {
    e.preventDefault();
    setDisplayAccount(true);
    // setDisplayPersonal(false);
    // setDisplayCorporate(false);
  };
  //   const showPersonalHandler = (e) => {
  //     e.preventDefault();
  //     setDisplayAccount(false);
  //     setDisplayPersonal(true);
  //     // setDisplayCorporate(false);
  //   };
  //   const showCorporateHandler = (e) => {
  //     e.preventDefault();
  //     setDisplayAccount(false);
  //     setDisplayPersonal(false);
  //     setDisplayCorporate(true);
  //   };
  return (
    <>
      <Container style={{ height: 100 }}></Container>
      <h1>User Profile</h1>
      <Row>
        <Nav activeKey="/Account">
          <Nav.Item>
            <Nav.Link onClick={showAccountHandler}>Account</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link onClick={showPersonalHandler}>Personal</Nav.Link>
          </Nav.Item> */}
          {/* <Nav.Item>
            <Nav.Link onClick={showCorporateHandler}>Corporate</Nav.Link>
          </Nav.Item> */}
        </Nav>
      </Row>
      <Form onSubmit={submitHandler}>
        {displayAccount && (
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h3>Your Account</h3>

                  <Form.Group controlId="firstName" className="my-2">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  {/* <Form.Group controlId="middleName" className="my-2">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter middle name"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    ></Form.Control>
                  </Form.Group> */}
                  <Form.Group controlId="lastName" className="my-2">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email" className="my-2">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="password" className="my-2">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>{" "}
                  </Form.Group>
                  <Form.Group controlId="confirmPassword" className="my-2">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={8}>Column</Col>
              </Row>
            </Card.Body>
          </Card>
        )}
        {/* {displayPersonal && (
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h3>Your Personal Details</h3>
                  <Form.Group controlId="dob" className="my-2">
                    <Form.Label>Date of Birth</Form.Label>
                    <DayPicker
                      mode="single"
                      fromDate={addYears(new Date(), -80)}
                      toDate={addYears(new Date(), -10)}
                      required
                      captionLayout="dropdown-buttons"
                      max={1}
                      selected={dob}
                      onSelect={setDob}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>ID Type</Form.Label>
                    {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-3" >
                        <Form.Check
                          inline
                          label="NRIC"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          defaultChecked={true}
                          onChange={()=>setIdType('nric')}
                        />
                        <Form.Check
                          inline
                          label="Passport"
                          name="group1"
                          type={type}
                          id={`inline-${type}-2`}
                          onChange={()=>setIdType('passport')}
                        />
                      </div>
                    ))}
                  </Form.Group>
                  <Form.Group controlId="idNumber" className="my-2">
                    <Form.Label>Identification Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter identification number"
                      value={setIdNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="nationality" className="my-2">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter nationality"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="countryCode" className="my-2">
                    <Form.Label>Country Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter country code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    ></Form.Control>{" "}
                  </Form.Group>
                  <Form.Group controlId="phoneNumber" className="my-2">
                    <Form.Label>Contact number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="homeAddress" className="my-2">
                    <Form.Label>Home Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter home address"
                      value={homeAddress}
                      onChange={(e) => setHomeAddress(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="homePostalCode" className="my-2">
                    <Form.Label>Home Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter postal code"
                      value={homePostalCode}
                      onChange={(e) => setHomePostalCode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={8}>Column</Col>
              </Row>
            </Card.Body>
          </Card>
        )} */}
        {/* {displayCorporate && (
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h3>Your Corporate Details</h3>

                  <Form.Group controlId="firstName" className="my-2">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="middleName" className="my-2">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter middle name"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="lastName" className="my-2">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email" className="my-2">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="password" className="my-2">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>{" "}
                  </Form.Group>
                  <Form.Group controlId="confirmPassword" className="my-2">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={8}>Column</Col>
              </Row>
            </Card.Body>
          </Card>
        )} */}
        <Row
          style={{ marginTop: "10px", marginRight: "10px" }}
          className="justify-content-end"
        >
          <Button variant="dark" type="submit" className="my-2">
            Save changes
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Row>
      </Form>
    </>
  );
};

export default ProfileScreen;
