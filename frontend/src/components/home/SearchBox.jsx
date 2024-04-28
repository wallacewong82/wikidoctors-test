import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const specialties = [
    "cardio",
    "cardiology",
    "cardiothoracic",
    "general",
    "hand",
    "neurosurgery",
    "orthopaedic",
    "plastic",
    "anaesthe",
    "anaesthesiology",
    "emergency",
    "onco",
    "oncology",
    "endocrinology",
    "gastro",
    "haematology",
    "nuclear",
    "diagnostic",
    "radiation",
    "radiology",
    "infectious",
    "internal",
    "palliative",
    "rheumatology",
    "renal",
    "neurology",
    "psych",
    "psychiatry",
    "paed",
    "paediatric",
    "derm",
    "dermatology",
    "ophthalmology",
    "otorhino",
    "otorhinolaryngology",
    "ent",
    "respiratory",
    "gynae",
    "gynaecology",
    "obstetric",
    "uro",
    "urology",
    "occupational",
    "rehab",
    "rehabilitative",
    "public"
  ];
  const insurers = [
    "aia",
    "great eastern",
    "hsbc",
    "income",
    "prudential",
    "raffles",
    "singlife",
  ];

  const typeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.length > 3) {
      setButtonEnabled(true);
    }
    if (e.target.value.length <= 3) {
      setButtonEnabled(false);
    }
    setKeyword(e.target.value);
  };
  var specialtystr = "";
  var insurerstr = "";
  var doctorstr = "";
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      const keywordarr = keyword.split(" ");
      for (let i = 0; i < keywordarr.length; i++) {
        if (specialties.includes(keywordarr[i])) {
          specialtystr = keywordarr[i] + "|" + specialtystr;
        } else if (insurers.includes(keywordarr[i])) {
          insurerstr = keywordarr[i] + "|" + insurerstr;
        } else {
          doctorstr = keywordarr[i] + "|" + doctorstr;
        }
      }
      if (specialtystr.charAt(0) === "|") {
        specialtystr = specialtystr.substring(1);
      }
      if (specialtystr.charAt(specialtystr.length - 1) === "|") {
        specialtystr = specialtystr.substring(0, specialtystr.length - 1);
      }
      if (insurerstr.charAt(0) === "|") {
        insurerstr = insurerstr.substring(1);
      }
      if (insurerstr.charAt(insurerstr.length - 1) === "|") {
        insurerstr = insurerstr.substring(0, insurerstr.length - 1);
      }
      if (doctorstr.charAt(0) === "|") {
        doctorstr = doctorstr.substring(1);
      }
      if (doctorstr.charAt(doctorstr.length - 1) === "|") {
        doctorstr = doctorstr.substring(0, doctorstr.length - 1);
      }
      const newkeyword = specialtystr + "&&" + insurerstr + "&&" + doctorstr;
      navigate(`/specialists/${newkeyword}`);
    } else {
      navigate("/specialists");
    }
  };
  return (
    <Form
      onSubmit={submitHandler}
      className="d-flex"
      style={{ marginTop: "30px" }}
    >
      <Form.Control
        type="text"
        name="q"
        onChange={typeHandler}
        value={keyword}
        placeholder="Search doctor, insurer, or specialty"
        className="mr-sm-2 ml-sm-5"
        style={{ fontSize: "24px", height: "80px" }}
      ></Form.Control>
      <Button
        type="submit"
        variant="btn"
        className="p-2 mx-2"
        style={{ fontSize: "24px", fontWeight: "bold",color: "#40679E",borderColor:"#40679E"}}
        disabled={!buttonEnabled}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
