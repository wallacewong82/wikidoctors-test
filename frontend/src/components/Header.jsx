import React, { useState, useContext, useEffect } from "react";
import {
  Nav,
  Navbar,
  Container,
  Button,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { PageContext } from "../App";

const Header = () => {
  const { currentPage } = useContext(PageContext);
  const { userInfo } = useSelector((state) => state.auth);
  const [activeKey, setActiveKey] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = (key) => {
    setActiveSpecKey(null);
    setActiveKey(key);
    setActiveAdminKey(null);
  };

  const [activeSpecKey, setActiveSpecKey] = useState(null);
  const [activeAdminKey, setActiveAdminKey] = useState(null);
  const [activePrivateKey, setActivePrivateKey] = useState(null);
  const chooseSpecialistHandler = (value) => {
    setActiveSpecKey(value);
    setActiveKey(value);
    setActiveAdminKey(null);
    setActivePrivateKey(null);
    navigate(`/specialists/${value}&&&&`);
  };

  const chooseAdminHandler = () => {
    setActiveSpecKey(null);
    setActiveKey(null);
    setActiveAdminKey("admin");
    setActivePrivateKey(null);
  };
  const choosePrivateHandler = () => {
    setActiveSpecKey(null);
    setActiveKey(null);
    setActiveAdminKey(null);
    setActivePrivateKey("private");
  };

  useEffect(() => {
    if (currentPage === "specialists") {
      setActiveSpecKey("specs");
      setActiveKey("specialists");
      setActiveAdminKey(null);
      setActivePrivateKey(null);
    } else if (currentPage === "dashboard") {
      setActiveKey("dashboard");
      setActiveSpecKey(null);
      setActiveAdminKey(null);
      setActivePrivateKey(null);
    } else if (currentPage === "blog") {
      setActiveKey("blog");
      setActiveSpecKey(null);
      setActiveAdminKey(null);
    } else if (currentPage === "login") {
      setActiveKey("login");
      setActiveSpecKey(null);
      setActiveAdminKey(null);
      setActivePrivateKey(null);
    } else if (currentPage === "admin") {
      setActiveKey("admin");
      setActiveSpecKey(null);
      setActiveAdminKey("admin");
      setActivePrivateKey(null);
    } else if (currentPage === "private") {
      setActiveKey("private");
      setActiveSpecKey(null);
      setActiveAdminKey(null);
      setActivePrivateKey("private");
    } else {
      //may need to add another 2 more current pages for admin and profile login.
      setActiveSpecKey(null);
      setActiveKey("home");
      setActiveAdminKey(null);
      setActivePrivateKey(null);
    }
  }, [currentPage, setActiveSpecKey, setActiveAdminKey, setActivePrivateKey]);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const signInHandler = () => {
    navigate("/login");
  };
  const doctorSignupHandler = () => {
    navigate("/doctorsignup");
  };

  const dashboardHandler = () => {
    setActiveSpecKey(null);
    setActiveAdminKey(null);
    setActivePrivateKey(null);
    setActiveKey("dashboard");
    navigate("/dashboard");
  };

  const chooseBlogHandler = () => {
    setActiveAdminKey(null);
    setActiveSpecKey(null);
    setActivePrivateKey(null);
    navigate("/blogs");
  };

  const callHandler = () => {
    const phoneNumber = "6581234567"; // need to change this phone number later
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <header>
      <Navbar
        fixed="top"
        bg="light"
        variant="light"
        expand="md"
        collapseOnSelect
        style={{
          minHeight: 100,
          fontSize: "12px",
          marginLeft: "50px",
          marginRight: "30px",
          opacity: "90%",
        }}
      >
        <Container>
          <LinkContainer to="/" onClick={() => handleSelect("home")}>
            <Navbar.Brand>
              <Image
                src={`/api/webimage/662e0e1813b90687ef7706b3`}
                //  src="../favicon.ico"
                style={{
                  color: "#40679E",
                  height: "30px",
                  width: "30px",
                  marginBottom: "10px",
                }}
              />{" "}
              <span
                style={{
                  color: "#40679E",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                HealthChannel
              </span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto"
              activeKey={activeKey}
              onSelect={handleSelect}
            >
              {/* <LinkContainer to="/booking"> */}
              {/* <Nav.Link> */}
              {userInfo ? (
                <>
                  <Nav.Link
                    className="btn btn-light mr-auto"
                    type="button"
                    onClick={dashboardHandler}
                    style={{ margin: "10px" }}
                    eventKey="dashboard"
                  >
                    {"  "}
                    <span style={{ fontSize: "18px" }}>Dashboard</span>
                  </Nav.Link>
                </>
              ) : null}

              {!(userInfo && !userInfo.isAdmin) && (
                <NavDropdown
                  title={`Specialists`}
                  style={
                    activeSpecKey
                      ? {
                          margin: "10px",
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "none",
                          borderRadius: "0.5em .5em .5em .5em",
                          backgroundColor: "lightgrey",
                        }
                      : {
                          margin: "10px",
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "none",
                        }
                  }
                  active={!!activeSpecKey}
                >
                  <NavDropdown.Header
                    style={{
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "normal",
                    }}
                  >
                    Find doctor by specialty
                  </NavDropdown.Header>
                  <NavDropdown.Divider />
                  <NavDropdown
                    title={"Surgery"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                      position: "relative",
                      display: "flex",
                      marginTop: "0",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("cardiothoracic")}
                    >
                      Cardiothoracic Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("dental")}
                    >
                      Dental Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("general")}
                    >
                      General Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("hand")}
                    >
                      Hand Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("neurosurgery")}
                    >
                      Neurosurgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("orthopaedic")}
                    >
                      Orthopaedic Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("plastic")}
                    >
                      Plastic Surgery
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Critical Care"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("anaesthesiology")}
                    >
                      Anaesthesiology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("emergency")}
                    >
                      Emergency Medicine
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Cancer Care and Diagnostic Imaging"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("medical onco")}
                    >
                      Medical Oncology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("diagnostic rad")}
                    >
                      Diagnostic Radiology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("nuclear med")}
                    >
                      Nuclear Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("radiation onco")}
                    >
                      Radiation Oncology
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Internal Organ Care"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("cardiology")}
                    >
                      Cardiology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("endocrin")}
                    >
                      Endocrinology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("gastroenter")}
                    >
                      Gastroenterology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("geriatric")}
                    >
                      Geriatric Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("haemato")}
                    >
                      Haematology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("infectious")}
                    >
                      Infectious Diseases
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("internal")}
                    >
                      Internal Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("pathology")}
                    >
                      Pathology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("rheumato")}
                    >
                      Rheumatology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("renal")}
                    >
                      Renal Medicine
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={"Neural and Mental Health"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("neurology")}
                    >
                      Neurology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("psychiatry")}
                    >
                      Psychiatry
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Paediatric Care"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() =>
                        chooseSpecialistHandler("paediatric medicine")
                      }
                    >
                      Paediatric Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() =>
                        chooseSpecialistHandler("paediatric surgery")
                      }
                    >
                      Paediatric Surgery
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={"Sensory Organ Care"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("dentistry")}
                    >
                      Dentistry
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("dermatology")}
                    >
                      Dermatology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("ophthalmology")}
                    >
                      Ophthalmology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("otorhino")}
                    >
                      Otorhinolaryngology / ENT
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("respiratory")}
                    >
                      Respiratory Medicine
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Sexual Health and Reproductive Care"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("gynae")}
                    >
                      Obstetrics & Gynaecology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("urology")}
                    >
                      {" "}
                      Urology
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Occupational, Rehabilitative, and Public Health"}
                    style={{
                      margin: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("occupational")}
                    >
                      Occupational Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("public")}
                    >
                      Public Health
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => chooseSpecialistHandler("rehabilitative")}
                    >
                      Rehabilitive Medicine
                    </NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown>
              )}
              {!(userInfo && !userInfo.isAdmin) && (
                <Nav.Link
                  className="btn btn-light mr-auto"
                  type="button"
                  onClick={chooseBlogHandler}
                  style={{ margin: "10px" }}
                  eventKey="blog"
                >
                  <span style={{ fontSize: "18px", fontWeight: "none" }}>
                    Blog
                  </span>
                </Nav.Link>
              )}
              {userInfo ? (
                <>
                  <NavDropdown
                    title={`Welcome ${userInfo.firstName}`}
                    id="username"
                    style={
                      activePrivateKey
                        ? {
                            margin: "10px",
                            fontSize: "18px",
                            color: "black",
                            fontWeight: "none",
                            borderRadius: "0.5em .5em .5em .5em",
                            backgroundColor: "lightgrey",
                          }
                        : {
                            margin: "10px",
                            fontSize: "18px",
                            color: "black",
                            fontWeight: "none",
                          }
                    }
                    active={!!activePrivateKey}
                    onClick={choosePrivateHandler}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                // <LinkContainer to="/login">
                //   <Nav.Link>
                <>
                  <Button
                    className="btn btn-light mr-auto"
                    type="button"
                    onClick={signInHandler}
                    style={{
                      margin: "10px",
                      border: "solid",
                      borderWidth: "1px",
                    }}
                  >
                    <FaUser size={20} />{" "}
                    <span style={{ fontSize: "16px" }}>Sign in</span>
                  </Button>
                  <Button
                    className="btn btn-light mr-auto"
                    type="button"
                    onClick={doctorSignupHandler}
                    style={{
                      margin: "10px",
                      border: "solid",
                      borderWidth: "1px",
                      color: "#40679E",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={icon({ name: "user-doctor" })}
                      size="lg"
                    />{" "}
                    <span style={{ fontSize: "16px" }}>Join as Doctor</span>
                  </Button>
                </>
                //   </Nav.Link>
                // </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  style={
                    activeAdminKey
                      ? {
                          margin: "10px",
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "none",
                          borderRadius: "0.5em .5em .5em .5em",
                          backgroundColor: "lightgrey",
                        }
                      : {
                          margin: "10px",
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "none",
                        }
                  }
                  active={!!activeAdminKey}
                  onClick={chooseAdminHandler}
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/bloglist">
                    <NavDropdown.Item>Blogs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/appointmentlist">
                    <NavDropdown.Item>Appointments</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/specialistlist">
                    <NavDropdown.Item>Specialists</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <Nav.Link
                className="btn btn-dark mr-auto"
                type="button"
                onClick={callHandler}
                style={{
                  margin: "10px",
                  backgroundColor: "#40679E",
                  color: "white",
                }}
              >
                <FontAwesomeIcon
                  icon={icon({ name: "phone-volume" })}
                  size="xl"
                />{" "}
                <strong style={{ fontSize: "18px", fontWeight: "none" }}>
                  65 81234567
                </strong>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
