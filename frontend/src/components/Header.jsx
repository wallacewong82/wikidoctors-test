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
  const [expanded, setExpanded] = useState(false);
  // const [isFixed, setIsFixed] = useState(true);
  const handleSelect = (key) => {
    setActiveSpecKey(null);
    setActiveKey(key);
    setActiveAdminKey(null);
    setExpanded(false);
  };

  const [activeSpecKey, setActiveSpecKey] = useState(null);
  const [activeAdminKey, setActiveAdminKey] = useState(null);
  const [activePrivateKey, setActivePrivateKey] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    if ((isMobile) && expanded) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('no-scroll');
    };
  }, [isMobile, expanded]);

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
    } else if (currentPage === "doctorsignup") {
      setActiveKey("doctorsignup");
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
    handleSelect();
    navigate("/login");
  };
  const doctorSignupHandler = () => {
    handleSelect();
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
        className={"custom-navbar"}
        expanded={expanded}
        //  fixed={isFixed ? "top" : ""}
      >
        <Container>
          <LinkContainer to="/" onClick={() => handleSelect("home")}>
            <Navbar.Brand>
              <Image
                src={`/api/webimage/663f68aaa3db0d582d1d4cdc`}
                alt={"WikiDoctors.com logo"}
                className={"custom-navbarlogo"}
              />{" "}
              {/* <span className={"custom-navbarspan"}>WikiDoctors</span> */}
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
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
                  onSelect={handleSelect}
                  className={
                    activeSpecKey
                      ? "custom-navdropdown1a"
                      : "custom-navdropdown1b"
                  }
                  active={!!activeSpecKey}
                >
                  <NavDropdown.Header className="custom-navdropdownheader">
                    Find doctor by specialty
                  </NavDropdown.Header>
                  <NavDropdown.Divider />
                  <NavDropdown
                    title={"Surgery"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("cardiothoracic")}
                    >
                      Cardiothoracic Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("dental")}
                    >
                      Dental Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("general")}
                    >
                      General Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("hand")}
                    >
                      Hand Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("neurosurgery")}
                    >
                      Neurosurgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("orthopaedic")}
                    >
                      Orthopaedic Surgery
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("plastic")}
                    >
                      Plastic Surgery
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Critical Care"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("anaesthesiology")}
                    >
                      Anaesthesiology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("emergency")}
                    >
                      Emergency Medicine
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Cancer Care and Diagnostic Imaging"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("medical onco")}
                    >
                      Medical Oncology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("diagnostic rad")}
                    >
                      Diagnostic Radiology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("nuclear med")}
                    >
                      Nuclear Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("radiation onco")}
                    >
                      Radiation Oncology
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Internal Organ Care"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("cardiology")}
                    >
                      Cardiology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("endocrin")}
                    >
                      Endocrinology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("gastroenter")}
                    >
                      Gastroenterology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("geriatric")}
                    >
                      Geriatric Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("haemato")}
                    >
                      Haematology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("infectious")}
                    >
                      Infectious Diseases
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("internal")}
                    >
                      Internal Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("pathology")}
                    >
                      Pathology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("rheumato")}
                    >
                      Rheumatology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("renal")}
                    >
                      Renal Medicine
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={"Neural and Mental Health"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("neurology")}
                    >
                      Neurology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("psychiatry")}
                    >
                      Psychiatry
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Paediatric Care"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() =>
                        chooseSpecialistHandler("paediatric medicine")
                      }
                    >
                      Paediatric Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() =>
                        chooseSpecialistHandler("paediatric surgery")
                      }
                    >
                      Paediatric Surgery
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={"Sensory Organ Care"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("dentistry")}
                    >
                      Dentistry
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("dermatology")}
                    >
                      Dermatology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("ophthalmology")}
                    >
                      Ophthalmology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("otorhino")}
                    >
                      Otorhinolaryngology / ENT
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("respiratory")}
                    >
                      Respiratory Medicine
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Sexual Health and Reproductive Care"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("gynae")}
                    >
                      Obstetrics & Gynaecology
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("urology")}
                    >
                      {" "}
                      Urology
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={"Occupational, Rehabilitative, and Public Health"}
                    className={"custom-navdropdown2"}
                  >
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("occupational")}
                    >
                      Occupational Medicine
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
                      onClick={() => chooseSpecialistHandler("public")}
                    >
                      Public Health
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="custom-navdropdownitem"
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
                  <span className={"custom-navbartitle"}>Blog</span>
                </Nav.Link>
              )}
              {userInfo ? (
                <>
                  <NavDropdown
                    title={`Welcome ${userInfo.firstName}`}
                    id="username"
                    className={
                      activePrivateKey
                        ? "custom-navdropdown1a"
                        : "custom-navdropdown1b"
                    }
                    active={!!activePrivateKey}
                    onClick={choosePrivateHandler}
                    onSelect={handleSelect}
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
                  <div className="custom-navbarcontainer">
                    <Button
                      className="custom-navbarbtn"
                      type="button"
                      onClick={signInHandler}
                    >
                      <FaUser className={"custom-navbariconsize"} />{" "}
                      <span className="custom-navbarspan">Sign in</span>
                    </Button>
                  </div>{" "}
                  <div className="custom-navbarcontainer">
                    <Button
                      className="custom-navbarbtn2"
                      onClick={doctorSignupHandler}
                    >
                      <FontAwesomeIcon
                        icon={icon({ name: "user-doctor" })}
                        className={"custom-navbariconsize"}
                      />{" "}
                      <span className="custom-navbarspan2">Join as Doctor</span>
                    </Button>
                  </div>
                </>
                //   </Nav.Link>
                // </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  className={
                    activeAdminKey
                      ? "custom-navdropdown1a"
                      : "custom-navdropdown1b"
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
              <div className="custom-navbarcontainer">
                <Nav.Link className="custom-navbarbtn3" onClick={callHandler}>
                  <FontAwesomeIcon
                    icon={icon({ name: "phone-volume" })}
                    className={"custom-navbariconsize"}
                  />{" "}
                  <strong className="custom-navbarspan3">65 81234567</strong>
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
