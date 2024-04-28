import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetSpecialistDetailsAsAdminQuery,
  useUpdateSpecialistAsAdminMutation,
  useUploadSpecImageMutation,
} from "../../slices/specialistsApiSlice";
import { toast } from "react-toastify";
import ClinicBoxCard from "../../components/admin/ClinicBoxCard";
import { v4 as uuidv4 } from "uuid";

const SpecialistEditScreen = () => {
  const { id: specialistId } = useParams();
  const navigate = useNavigate();
  const {
    data: specialist,
    isLoading,
    refetch,
    error,
  } = useGetSpecialistDetailsAsAdminQuery(specialistId);
  const [updateSpecialist, { isLoading: loadingUpdate }] =
    useUpdateSpecialistAsAdminMutation();
  const [uploadSpecImage, { isLoading: loadingUpload }] =
    useUploadSpecImageMutation();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [designation, setDesignation] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [writeup, setWriteup] = useState("");
  const [mcr, setMCR] = useState("");
  const [gender, setGender] = useState("");
  const [isVerified, setVerified] = useState("");
  const [isPromoted, setPromoted] = useState("");
  const [verifyDate, setVerifyDate] = useState("");
  const [promoteDate, setPromoteDate] = useState("");
  const [hospkeyword, setHospKeyword] = useState([]);
  const [langkeyword, setLangKeyword] = useState([]);
  const [insurerkeyword, setInsurerKeyword] = useState([]);
  const [specialtykeyword, setSpecialtyKeyword] = useState([]);
  const [subspecialtykeyword, setSubSpecialtyKeyword] = useState([]);
  const [clinicSet, setClinicSet] = useState([]);

  useEffect(() => {
    if (specialist) {
      setName(specialist.name);
      setImage(specialist.image);
      if (specialist.designation) {
        setDesignation(specialist.designation);
      }
      setQualifications(specialist.qualifications);
      setWriteup(specialist.writeup);
      if (specialist.MCR) {
        setMCR(specialist.MCR);
      }
      const extractedSpecialties = specialist.specialty.map((spec) =>
        spec.specialty ? spec.specialty.toLowerCase() : null
      );
      const extractedSpecialties2 = extractedSpecialties.filter(
        (value) => value !== null
      );
      setSpecialtyKeyword(extractedSpecialties2);
      const extractedSubSpecialties = specialist.specialty.map((spec) =>
        spec.specialty ? null : spec.subspecialty
      );
      const extractedSubSpecialties2 = extractedSubSpecialties.filter(
        (value) => value !== null
      );
      setSubSpecialtyKeyword(extractedSubSpecialties2);

      const extractedLanguages = specialist.languages.map((lang) =>
        lang.language.toLowerCase()
      );
      setLangKeyword(extractedLanguages);
      if (specialist.gender) {
        setGender(specialist.gender);
      }
      if (specialist.location) {
        const extractedLocation = specialist.location.map((location) =>
          location.locationName.toLowerCase()
        );
        setHospKeyword(extractedLocation);
      }
      if (specialist.clinic) {
        const extractedClinicSet = specialist.clinic;
        setClinicSet(extractedClinicSet);
      }

      const extractedInsurers = specialist.insurerPanel.map(
        (insurer) =>
          insurer.insurerName.toLowerCase() +
          " " +
          insurer.panelType.toLowerCase()
      );
      setInsurerKeyword(extractedInsurers);
      if (specialist.verified) {
        setVerified(specialist.verified === "true" ? true : false);
      }
      if (specialist.promoted) {
        setPromoted(specialist.promoted);
      }
      if (specialist.verifieddate) {
        setVerified(true);
        setVerifyDate(specialist.verifieddate);
      }
      if (specialist.promoteddate) {
        setPromoted(specialist.promoteddate);
        setPromoteDate(specialist.promoteddate);
      }
    }
  }, [specialist]);
  const uploadFileHandlerForSpec = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadSpecImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const verifyHandler = () => {
    if (isVerified) {
      setVerified(false);
      setVerifyDate("");
    } else {
      setVerified(true);
    }
    const verifyNow = new Date();
    setVerifyDate(verifyNow.setHours(0, 0, 0, 0));
  };
  const promoteHandler = (e) => {
    setPromoted(e);
    const promoteNow = new Date();
    setPromoteDate(promoteNow.setHours(0, 0, 0, 0));
  };
  const genderHandler = (e) => {
    setGender(e);
  };

  const onSelectHospHandler = (e) => {
    e.preventDefault();
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setHospKeyword(selectedOptions);
  };
  const onSelectLangHandler = (e) => {
    e.preventDefault();
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setLangKeyword(selectedOptions);
  };
  const onSelectInsurHandler = (e) => {
    e.preventDefault();
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setInsurerKeyword(selectedOptions);
  };
  const onSelectSpecHandler = (e) => {
    e.preventDefault();
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSpecialtyKeyword(selectedOptions);
  };
  const onSelectSubSpecHandler = (e) => {
    e.preventDefault();
    setSubSpecialtyKeyword(e.target.value);
  };

  const addClinicHandler = () => {
    setClinicSet([
      {
        _id: uuidv4(),
        newClinic:"1",
        clinicName: "",
        clinicAddress: "",
        clinicHours:
          "Mon : 08:00 - 17:00, Tue : 08:00 - 17:00, Wed : 08:00 - 17:00, Thu : 08:00 - 17:00, Fri : 08:00 - 17:00, Sat : 08:00 - 12:00, Sun : Closed, Public Holiday : Closed",
        clinicLatitude: "",
        clinicLongitude: "",
      },
      ...clinicSet,
    ]);
  };

  const removeClinicHandler = (id) => {
    const newArray = clinicSet.filter((item) => item._id !== id);
    setClinicSet(newArray);
  };
  const onSelectClinicNameHandler = (id, e) => {
    const updatedClinics = clinicSet.map((clinicItem) =>
      clinicItem._id === id
        ? { ...clinicItem, clinicName: e.target.value }
        : clinicItem
    );
    setClinicSet(updatedClinics);
  };

  const onSelectClinicAddressHandler = (id, e) => {
    const updatedClinics = clinicSet.map((clinicItem) =>
      clinicItem._id === id
        ? { ...clinicItem, clinicAddress: e.target.value }
        : clinicItem
    );
    setClinicSet(updatedClinics);
  };
  const onSelectClinicLatitudeHandler = (id, e) => {
    const updatedClinics = clinicSet.map((clinicItem) =>
      clinicItem._id === id
        ? { ...clinicItem, clinicLatitude: e.target.value }
        : clinicItem
    );
    setClinicSet(updatedClinics);
  };
  const onSelectClinicLongitudeHandler = (id, e) => {
    const updatedClinics = clinicSet.map((clinicItem) =>
      clinicItem._id === id
        ? { ...clinicItem, clinicLongitude: e.target.value }
        : clinicItem
    );
    setClinicSet(updatedClinics);
  };
  const onSelectClinicHoursHandler = (id, day, e) => {
    const newHours = e.target.value;
    const clinicToUpdate = clinicSet.find(
      (clinicItem) => clinicItem._id === id
    );
    if (!clinicToUpdate) {
      return; // Exit function if clinic is not found
    }
    const { clinicHours } = clinicToUpdate;
    const dayHoursPairs = clinicHours.split(/,\s(?=[A-Za-z])/);
    const updatedDayHoursPairs = dayHoursPairs.map((pair) => {
      const [currentDay] = pair.split(" : ");
      if (currentDay === day) {
        return `${day} : ${newHours}`;
      } else {
        return pair;
      }
    });
    const updatedHoursString = updatedDayHoursPairs.join(", ");
    const updatedClinic = {
      ...clinicToUpdate,
      clinicHours: updatedHoursString,
    };
    // Update the clinic array with the updated clinic object
    const updatedClinics = clinicSet.map((clinicItem) =>
      clinicItem._id === id ? updatedClinic : clinicItem
    );
    // Update the state with the new clinic array
    setClinicSet(updatedClinics);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const transformedLangArray = langkeyword.map((language) => ({
      language: language.charAt(0).toUpperCase() + language.slice(1),
    }));
    const transformedLocationArray = hospkeyword.map((location) => ({
      locationName: location
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));
    const transformedInsurerArray = insurerkeyword.map((item) => {
      const [insurerName, panelType] = item.split(" ");
      return {
        insurerName: insurerName,
        panelType: panelType,
      };
    });

    const transformedSpecialtyArray = [
      ...specialtykeyword.map((specialty) => ({
        specialty: specialty.charAt(0).toUpperCase() + specialty.slice(1),
      })),
    ];

    if (
      typeof subspecialtykeyword === "string" &&
      subspecialtykeyword.trim() !== ""
    ) {
      const subspecialties = subspecialtykeyword
        .split(", ")
        .map((subspecialty) => ({
          subspecialty:
            subspecialty.charAt(0).toUpperCase() + subspecialty.slice(1),
        }));
      transformedSpecialtyArray.push(...subspecialties);
    } else if (Array.isArray(subspecialtykeyword)) {
      subspecialtykeyword.forEach((subspecialty) => {
        transformedSpecialtyArray.push({
          subspecialty:
            subspecialty.charAt(0).toUpperCase() + subspecialty.slice(1),
        });
      });
    }
    const cleanedClinicSet = clinicSet.map(({ newClinic, _id, ...clinic }) => clinic);
    try {
      await updateSpecialist({
        specialistId,
        name, //ok
        image, //ok
        designation, //ok
        qualifications, //ok
        writeup, //ok
        mcr, //ok
        transformedSpecialtyArray, //ok
        transformedLangArray, //ok
        gender, //ok
        transformedLocationArray,
        clinicSet: cleanedClinicSet, //ok
        transformedInsurerArray, //ok
        isVerified, //ok
        isPromoted, //ok
        verifyDate,//ok
        promoteDate,//ok
      });
      toast.success("Specialist updated successfully");
      refetch();
      navigate("/admin/specialistlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <FormContainer>
        <Container style={{ height: 100 }}></Container>
        <Link to={-1} className="btn btn-dark my-3">
          Back
        </Link>
        <h2>Edit Specialist</h2>
        {loadingUpload && <Loader />}
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <hr />
            <h6>SPECIALIST PERSONAL PROFILE</h6>
            <Form.Group controlId="name" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Name</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter author name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Image</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  {image && typeof image === "string" ? (
                    <>
                      <Image
                        src={image}
                        style={{
                          maxHeight: "200px",
                          maxWidth: "250px",
                          minWidth: "150px",
                        }}
                      />
                      <small className="text-muted">
                        Currently uploaded image
                      </small>
                    </>
                  ) : null}
                  <Form.Control
                    type="text"
                    placeholder="Enter blog image URL"
                    value={image}
                    onChange={(e) => setImage}
                  ></Form.Control>
                  <Form.Control
                    type="file"
                    label="Choose image for blog post"
                    onChange={uploadFileHandlerForSpec}
                  />{" "}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="gender">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Gender</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Check
                    type="radio"
                    id="option1"
                    name="options2"
                    label="Nil"
                    checked={gender === "Nil" || gender === ""} // Use state to manage selected option
                    onChange={() => genderHandler("Nil")} // Update state when option is selected
                  />
                  <Form.Check
                    type="radio"
                    id="option2"
                    name="options2"
                    label="Male"
                    checked={gender === "Male"}
                    onChange={() => genderHandler("Male")}
                  />
                  <Form.Check
                    type="radio"
                    id="option3"
                    name="options2"
                    label="Female"
                    checked={gender === "Female"}
                    onChange={() => genderHandler("Female")}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="languages" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Languages</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Select
                    multiple
                    onChange={onSelectLangHandler}
                    value={langkeyword}
                  >
                    <option hidden> Languages</option>
                    <option value="english">English</option>
                    <option value="mandarin">Mandarin</option>
                    <option value="malay">Malay</option>
                    <option value="tamil">Tamil</option>
                    <option value="indon">Bahasa Indonesia</option>
                    <option value="japanese">Japanese</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="tagolog">Tagalog</option>
                    <option value="korean">Korean</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="mcr" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>MCR</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter MCR"
                    value={mcr}
                    onChange={(e) => setMCR(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <hr />
            <h6>SPECIALIST PROFESSIONAL PROFILE</h6>
            <Form.Group controlId="specialty" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Specialty</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Select
                    multiple
                    onChange={onSelectSpecHandler}
                    value={specialtykeyword}
                  >
                    <option hidden>Specialty</option>
                    <option disabled>Adult Surgery</option>
                    <option value="cardiothoracic surgery">
                      Cardiothoracic Surgery
                    </option>
                    <option value="general surgery">General Surgery</option>
                    <option value="hand surgery">Hand Surgery</option>
                    <option value="neurosurgery">Neurosurgery</option>
                    <option value="orthopaedic surgery">
                      Orthopaedic Surgery
                    </option>
                    <option value="plastic surgery">Plastic Surgery</option>
                    <option disabled>──────────</option>
                    <option disabled>Critical Care</option>
                    <option value="anaesthesiology">Anaesthesiology</option>
                    <option value="intensive care medicine">
                      Intensive Care Medicine
                    </option>
                    <option disabled>──────────</option>
                    <option disabled>Cancer Care</option>
                    <option value="medical oncology">Medical Oncology</option>
                    <option value="radiation oncology">
                      Radiation Oncology
                    </option>
                    <option disabled>──────────</option>
                    <option disabled>Internal Organ Care</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="endocrinology">Endocrinology</option>
                    <option value="gastroenterology">Gastroenterology</option>
                    <option value="haematology">Haematology</option>
                    <option value="infectious diseases">
                      Infectious Diseases
                    </option>
                    <option value="internal medicine">Internal Medicine</option>
                    <option value="palliative">Palliative Medicine</option>
                    <option value="rheumatology">Rheumatology</option>
                    <option value="renal medicine">Renal Medicine</option>
                    <option disabled>──────────</option>
                    <option disabled>Neural and Mental Wellness</option>
                    <option value="neurology">Neurology</option>
                    <option value="psychiatry">Psychiatry</option>
                    <option disabled>──────────</option>
                    <option disabled>Paediatric Care</option>
                    <option value="neonatology">Neonatology</option>
                    <option value="paediatric medicine">
                      Paediatric Medicine
                    </option>
                    <option value="paediatric surgery">
                      Paediatric Surgery
                    </option>
                    <option disabled>──────────</option>
                    <option disabled>Sensory Organ Care</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="ophthalmology">Ophthalmology</option>
                    <option value="otorhinolaryngology">
                      Otorhinolaryngology / ENT
                    </option>
                    <option value="respiratory medicine">
                      Respiratory Medicine
                    </option>
                    <option disabled>──────────</option>
                    <option disabled>
                      Sexual Health and Reproductive Care
                    </option>
                    <option value="obstetrics & gynaecology">
                      Obstetrics & Gynaecology
                    </option>
                    <option value="urology">Urology</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Subspecialty</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    value={subspecialtykeyword}
                    onChange={(e) => onSelectSubSpecHandler(e)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="designation" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Designation</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="qualifications" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Qualifications</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter qualifications"
                    name="message"
                    as="textarea"
                    rows={6}
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="writeup" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Writeup</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter writeup"
                    value={writeup}
                    name="message"
                    as="textarea"
                    rows={20}
                    onChange={(e) => setWriteup(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <hr />
            <h6>SPECIALIST CLINIC PROFILE</h6>
            <Form.Group controlId="hospkeyword" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Location</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Select
                    multiple
                    onChange={onSelectHospHandler}
                    value={hospkeyword}
                  >
                    <option hidden>Private Hospital</option>
                    <option value="farrer park hospital">
                      Farrer Park Hospital
                    </option>
                    <option value="gleneagles hospital">
                      Gleneagles Hospital
                    </option>
                    <option value="mount alvernia hospital">
                      Mount Alvernia Hospital
                    </option>
                    <option value="mount elizabeth hospital">
                      Mount Elizabeth Hospital
                    </option>
                    <option value="mount elizabeth novena hospital">
                      Mount Elizabeth Novena Hospital
                    </option>
                    <option value="parkway east hospital">
                      Parkway East Hospital
                    </option>
                    <option value="raffles hospital">Raffles Hospital</option>
                    <option value="thomson medical centre">
                      Thomson Medical Centre
                    </option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="clinickeyword" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Clinic(s)</Form.Label>
                  <Button
                    style={{
                      backgroundColor: "#40679E",
                      borderColor: "#40679E",
                    }}
                    onClick={addClinicHandler}
                  >
                    Add clinic
                  </Button>
                </Col>
                <Col md={9}>
                  {clinicSet.map((clinic) => (
                    <ClinicBoxCard
                      key={clinic._id}
                      clinic={clinic}
                      onSelectClinicNameHandler={onSelectClinicNameHandler}
                      onSelectClinicAddressHandler={
                        onSelectClinicAddressHandler
                      }
                      onSelectClinicHoursHandler={onSelectClinicHoursHandler}
                      onSelectClinicLatitudeHandler={onSelectClinicLatitudeHandler}
                      onSelectClinicLongitudeHandler={onSelectClinicLongitudeHandler}
                      removeClinicHandler={removeClinicHandler}
                    />
                  ))}
                </Col>
              </Row>
            </Form.Group>

            <hr />
            <h6>SPECIALIST INSURER / CORPORATE PROFILE</h6>
            <Form.Group controlId="insurer" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Insurers</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Select
                    multiple
                    onChange={onSelectInsurHandler}
                    value={insurerkeyword}
                  >
                    <option hidden>Insurer</option>
                    <option value="aia main">AIA Main</option>
                    <option value="aia extended">AIA Extended</option>
                    <option value="ge main">Great Eastern Main</option>
                    <option value="ge extended">Great Eastern Extended</option>
                    <option value="hsbc main">HSBC Life Main</option>
                    <option value="hsbc extended">HSBC Life Extended</option>
                    <option value="income main">Income Main</option>
                    <option value="income extended">Income Extended</option>
                    <option value="prudential main">Prudential Main</option>
                    <option value="prudential extended">
                      Prudential Extended
                    </option>
                    <option value="raffles main">Raffles Health Main</option>
                    <option value="raffles extended">
                      Raffles Health Extended
                    </option>
                    <option value="singlife main">Singlife Main</option>
                    <option value="singlife extended">Singlife Extended</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <hr />
            <h6>SPECIALIST MEMBERSHIP PROFILE</h6>
            <Form.Group controlId="isVerified" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Verification</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Check
                    type="checkbox"
                    label="Verify this specialist?"
                    checked={isVerified}
                    onChange={verifyHandler}
                  ></Form.Check>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="isPromoted">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Promotion</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Check
                    type="radio"
                    id="option1"
                    name="options"
                    label="Nil"
                    checked={isPromoted === "Nil" || isPromoted === ""} // Use state to manage selected option
                    onChange={() => promoteHandler("Nil")} // Update state when option is selected
                  />
                  <Form.Check
                    type="radio"
                    id="option2"
                    name="options"
                    label="Silver"
                    checked={isPromoted === "Silver" || isPromoted === "silver"}
                    onChange={() => promoteHandler("Silver")}
                  />
                  <Form.Check
                    type="radio"
                    id="option3"
                    name="options"
                    label="Gold"
                    checked={isPromoted === "Gold" || isPromoted === "gold"}
                    onChange={() => promoteHandler("Gold")}
                  />
                </Col>
              </Row>
            </Form.Group>
            <hr />
            <Row>
              <Col
                md={10}
                className="text-end"
                style={{ marginTop: "8px" }}
              ></Col>
              <Col md={2}>
                <Button
                  type="submit"
                  className="btn my-2"
                  style={{ backgroundColor: "#40679E", borderColor: "#40679E" }}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default SpecialistEditScreen;
