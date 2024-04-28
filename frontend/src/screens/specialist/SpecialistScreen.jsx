// this screen shows the pages from the search outcomes.
import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSpecialistsQuery } from "../../slices/specialistsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import SpecialistCard from "../../components/specialist/SpecialistCard";
import Paginate from "../../components/specialist/Paginate";
import SpecialistSearchBar from "../../components/specialist/SpecialistSearchBar";
import AppointmentScreen from "../appointment/AppointmentScreen";
import { PageContext } from "../../App";
import Meta from "../../components/Meta";

const SpecialistScreen = () => {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage("specialists");
  }, [setCurrentPage]);

  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetSpecialistsQuery({
    keyword,
    pageNumber,
  });
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [selectvalueSpec, setSelectValueSpec] = useState("Specialty");
  const [selectvalueHosp, setSelectValueHosp] = useState("Private Hospital");
  const [selectvalueInsu, setSelectValueInsu] = useState("Insurer");
  const [selectvalueLang, setSelectValueLang] = useState("Languages");
  const [selectvalueName, setSelectValueName] = useState("");
  const [namekeyword, setNameKeyword] = useState("");
  const [langkeyword, setLangKeyword] = useState("");
  const [speckeyword, setSpecKeyword] = useState("");
  const [hospkeyword, setHospKeyword] = useState("");
  const [insurkeyword, setInsurKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const specialiststringword = "specialists";
  const navigate = useNavigate();
  const resetHandler = () => {
    setSelectValueSpec("Specialty");
    setSelectValueHosp("Private Hospital");
    setSelectValueInsu("Insurer");
    setSelectValueLang("Languages");
    setSelectValueName("");
    setNameKeyword("");
    setLangKeyword("");
    setSpecKeyword("");
    setHospKeyword("");
    setInsurKeyword("");
    navigate("/specialists");
  };
  return (
    <>
    <Meta title="Specialist search"/>
      <Container style={{ height: 100 }}></Container>
      {showModal ? (
        <AppointmentScreen
          specialist={selectedSpecialist}
          setShowModal={setShowModal}
        />
      ) : null}
      <Row>
        <Col md={4}>
          <h1>Specialists Search</h1>
        </Col>
        <Col md={4}></Col>
        <Col md={4}>
          <Button
            className="btn btn-dark float-end"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
            onClick={resetHandler}
          >
            Restart Search
          </Button>
        </Col>
      </Row>
      <SpecialistSearchBar
        selectvalueSpec={selectvalueSpec}
        setSelectValueSpec={setSelectValueSpec}
        selectvalueHosp={selectvalueHosp}
        setSelectValueHosp={setSelectValueHosp}
        selectvalueInsu={selectvalueInsu}
        setSelectValueInsu={setSelectValueInsu}
        selectvalueLang={selectvalueLang}
        setSelectValueLang={setSelectValueLang}
        selectvalueName={selectvalueName}
        setSelectValueName={setSelectValueName}
        namekeyword={namekeyword}
        setNameKeyword={setNameKeyword}
        langkeyword={langkeyword}
        setLangKeyword={setLangKeyword}
        speckeyword={speckeyword}
        setSpecKeyword={setSpecKeyword}
        hospkeyword={hospkeyword}
        setHospKeyword={setHospKeyword}
        insurkeyword={insurkeyword}
        setInsurKeyword={setInsurKeyword}
        specialiststringword={specialiststringword}
      />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <span
              style={{
                fontWeight: "none",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              <strong>{data.count}</strong> specialists found based on your
              search criteria.
            </span>
            {data.specialists.map((specialist) => (
              <Col key={specialist._id} sm={12} md={6} lg={6} xl={4} xxl={3}>
                <SpecialistCard
                  specialist={specialist}
                  setSelectedSpecialist={setSelectedSpecialist}
                  setShowModal={setShowModal}
                ></SpecialistCard>
              </Col>
            ))}
          </Row>
          <Row style={{ alignContent: "center", justifyContent: "center" }}>
            <Col md={3}></Col>
            <Col md={6}>
              <Paginate
                pages={data.pages}
                page={data.page}
                link={"/specialists"}
                keyword={keyword ? keyword : ""}
              />
            </Col>
            <Col md={3}></Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SpecialistScreen;
