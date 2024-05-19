import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SpecialistSearchBar = ({
  selectvalueSpec,
  setSelectValueSpec,
  selectvalueHosp,
  setSelectValueHosp,
  selectvalueInsu,
  setSelectValueInsu,
  selectvalueLang,
  setSelectValueLang,
  selectvalueName,
  setSelectValueName,
  namekeyword,
  setNameKeyword,
  langkeyword,
  setLangKeyword,
  speckeyword,
  setSpecKeyword,
  hospkeyword,
  setHospKeyword,
  insurkeyword,
  setInsurKeyword,
  specialiststringword,
}) => {
  //const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const onSelectSpecHandler = (e) => {
    e.preventDefault();
    setSpecKeyword(e.target.value);
    setSelectValueSpec(e.target.value);
    navigate(
      `/${specialiststringword}/${e.target.value}&${hospkeyword}&${insurkeyword}&${langkeyword}&${namekeyword}`
    );
  };

  const onSelectHospHandler = (e) => {
    e.preventDefault();
    setHospKeyword(e.target.value);
    setSelectValueHosp(e.target.value);
    navigate(
      `/${specialiststringword}/${speckeyword}&${e.target.value}&${insurkeyword}&${langkeyword}&${namekeyword}`
    );
  };

  const onSelectInsurHandler = (e) => {
    e.preventDefault();
    setInsurKeyword(e.target.value);
    setSelectValueInsu(e.target.value);
    navigate(
      `/${specialiststringword}/${speckeyword}&${hospkeyword}&${e.target.value}&${langkeyword}&${namekeyword}`
    );
  };

  const onSelectLangHandler = (e) => {
    e.preventDefault();
    setLangKeyword(e.target.value);
    setSelectValueLang(e.target.value);
    navigate(
      `/${specialiststringword}/${speckeyword}&${hospkeyword}&${insurkeyword}&${e.target.value}&${namekeyword}`
    );
  };

  const onSearchNameHandler = (e) => {
    e.preventDefault();
    setNameKeyword(e.target.value);
    setSelectValueName(e.target.value);
    navigate(
      `/${specialiststringword}/${speckeyword}&${hospkeyword}&${insurkeyword}&${langkeyword}&${e.target.value}`
    );
  };
  return (
    <Container className={"custom-specialistsearchbarcontainer"} >
      <Row className={"custom-specialistsearchbarrow0"}
        //className="align-items-center"
      >
        <Row className={"custom-specialistsearchbarrow"}>
          <h5 className={"custom-hfive"}>Search filter</h5>
        </Row>
        <Row className={"custom-specialistsearchbarrow2"}>
          <Form className={"custom-specialistsearchbarform"}>
            <Col md={3}>
              <Form.Select
               // style={{ width: "300px" }}
                className={"custom-specialistsearchbarfield1"}
                onChange={onSelectSpecHandler}
                value={selectvalueSpec}
              >
                <option hidden>Specialty</option>
                <option disabled>Adult Surgery</option>
                <option value="cardiothoracic">Cardiothoracic Surgery</option>
                <option value="dental">Dental Surgery</option>
                <option value="general">General Surgery</option>
                <option value="hand">Hand Surgery</option>
                <option value="neurosurgery">Neurosurgery</option>
                <option value="orthopaedic">Orthopaedic Surgery</option>
                <option value="plastic">Plastic Surgery</option>
                <option disabled>──────────</option>
                <option disabled>Critical Care</option>
                <option value="anaesthesiology">Anaesthesiology</option>
                <option value="emergency">Emergency Medicine</option>
                <option disabled>──────────</option>
                <option disabled>Cancer Care and Diagnostic Imaging</option>
                <option value="medical oncology">Medical Oncology</option>
                <option value="diagnostic">Diagnostic Radiology</option>
                <option value="nuclear medicine">Nuclear Medicine</option>
                <option value="radiation oncology">Radiation Oncology</option>
                <option disabled>──────────</option>
                <option disabled>Internal Organ Care</option>
                <option value="cardiology">Cardiology</option>
                <option value="endocrinology">Endocrinology</option>
                <option value="gastroenterology">Gastroenterology</option>
                <option value="geriatric">Geriatric Medicine</option>
                <option value="haematology">Haematology</option>
                <option value="infectious">Infectious Diseases</option>
                <option value="internal">Internal Medicine</option>
                <option value="pathology">Pathology</option>
                <option value="rheumatology">Rheumatology</option>
                <option value="renal">Renal Medicine</option>
                <option disabled>──────────</option>
                <option disabled>Neural and Mental Wellness</option>
                <option value="neurology">Neurology</option>
                <option value="psychiatry">Psychiatry</option>
                <option disabled>──────────</option>
                <option disabled>Paediatric Care</option>
                <option value="paediatric medicine">Paediatric Medicine</option>
                <option value="paediatric surgery">Paediatric Surgery</option>
                <option disabled>──────────</option>
                <option disabled>Sensory Organ Care</option>
                <option value="dentistry">Dentristry</option>
                <option value="dermatology">Dermatology</option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="otorhino">Otorhinolaryngology / ENT</option>
                <option value="respiratory">Respiratory Medicine</option>
                <option disabled>──────────</option>
                <option disabled>Sexual Health and Reproductive Care</option>
                <option value="gynae">Obstetrics & Gynaecology</option>
                <option value="urology">Urology</option>
                <option disabled>──────────</option>
                <option disabled>
                  Occupational, Rehabilitative, and Public Health
                </option>
                <option value="occupational">Occupational Medicine</option>
                <option value="rehabilitative">Rehabilitative Medicine</option>
                <option value="public">Public Health</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                //style={{ width: "300px" }}
                className={"custom-specialistsearchbarfield2"}
                onChange={onSelectHospHandler}
                value={selectvalueHosp}
              >
                <option disabled>Private Hospital</option>
                <option value="farrer">Farrer Park Hospital</option>
                <option value="gleneagles">Gleneagles Hospital</option>
                <option value="alvernia">Mount Alvernia Hospital</option>
                <option value="elizabeth hospital">
                  Mount Elizabeth Hospital
                </option>
                <option value="elizabeth novena">
                  Mount Elizabeth Novena Hospital
                </option>
                <option value="parkway">Parkway East Hospital</option>
                <option value="raffles">Raffles Hospital</option>
                <option value="thomson">Thomson Medical Centre</option>
                <option disabled>──────────</option>
                <option disabled>Public Hospital</option>
                <option value="changi">Changi General Hospital</option>
                <option value="kerdang">
                  Kerdang Kerbau Women's and Children's Hospital
                </option>
                <option value="khoo">Khoo Teck Puat Hospital</option>
                <option value="national">
                  National University Hospital Singapore
                </option>
                <option value="feng">Ng Teng Feng Hospital</option>
                <option value="sengkang">Sengkang General Hospital</option>
                <option value="general">Singapore General Hospital</option>
                <option value="tock">Tan Tock Seng Hospital</option>
                <option disabled>──────────</option>
                <option disabled>Medical/Specialist Centres</option>
                <option value="camden">Camden Medical Centre</option>
                <option value="eagle eye">Eagle Eye Centre</option>
                <option value="novena medical">Novena Medical Centre</option>
                <option value="paragon">Paragon Medical Centre</option>
                <option value="medicentre">Parkway MediCentre</option>
                <option value="holland">Raffles Holland Village</option>
                <option value="royal">Royal Square Medical Centre</option>
                <option value="starmed">Starmed Specialist Centre</option>
                <option disabled>──────────</option>
                <option disabled>Other regions</option>
                <option value="clarke">Clarke Quay Area</option>
                <option value="downtown">Downtown Area</option>
                <option value="heart">Heartlands Area</option>
                <option value="orchard">Orchard Area</option>
                <option value="novena">Novena Area</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Select
          //      style={{ width: "195px" }}
                className={"custom-specialistsearchbarfield3"}
                onChange={onSelectInsurHandler}
                value={selectvalueInsu}
              >
                <option hidden>Insurer</option>
                <option value="aia">AIA</option>
                <option value="ge">Great Eastern</option>
                <option value="hsbc">HSBC Life</option>
                <option value="income">Income</option>
                <option value="prudential">Prudential</option>
                <option value="raffles">Raffles Health</option>
                <option value="singlife">Singlife</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Select
             //   style={{ width: "195px" }}
                className={"custom-specialistsearchbarfield4"}
                onChange={onSelectLangHandler}
                value={selectvalueLang}
              >
                <option hidden> Languages</option>
                <option value="english">English</option>
                <option value="mandarin">Mandarin</option>
                <option value="melayu">Bahasa Melayu</option>
                <option value="tamil">Tamil</option>
                <option value="indon">Bahasa Indonesian</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="thai">Thai</option>
                <option value="vietnamese">Vietnamese</option>
                <option value="arabic">Arabic</option>
                <option value="bengali">Bengali</option>
                <option value="burmese">Burmese</option>
                <option value="canton">Cantonese</option>
                <option value="czech">Czech</option>
                <option value="dutch">Dutch</option>
                <option value="foochow">Foochow</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="greek">Greek</option>
                <option value="gujarati">Gujarati</option>
                <option value="hainan">Hainanese</option>
                <option value="hakka">Hakka / Khek</option>
                <option value="hindi">Hindi</option>
                <option value="hockchew">Hockchew</option>
                <option value="hokkien">Hokkien</option>
                <option value="jawa">Jawa</option>
                <option value="kannada">Kannada</option>
                <option value="malayalam">Malayalam</option>
                <option value="marathi">Marathi</option>
                <option value="punjabi">Punjabi</option>
                <option value="russia">Russian</option>
                <option value="shanghai">Shanghainese</option>
                <option value="slovak">Slovak</option>
                <option value="spanish">Spanish</option>
                <option value="tagalog">Tagalog</option>
                <option value="telugu">Telugu</option>
                <option value="teochew">Teochew</option>
                <option value="urdu">Urdu</option>
              </Form.Select>
            </Col>

            <Col md={1}>
              <Form.Control
                type="text"
                name="q"
                placeholder="Find doctor name"
                className={"custom-specialistsearchbardoctorfield"}
              //  className="mr-sm-2 ml-sm-5"
                // style={{
                //   fontSize: "16px",
                //   width: "230px",
                //   borderColor: "black",
                // }}
                onChange={onSearchNameHandler}
                value={selectvalueName}
              ></Form.Control>
            </Col>
          </Form>
        </Row>
      </Row>
    </Container>
  );
};

export default SpecialistSearchBar;
