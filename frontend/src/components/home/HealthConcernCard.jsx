import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HealthConcernCard = ({ concerncount }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (concerncount.name === "Paediatric Care") {
      navigate("/specialists/neonato|paediatric med|paediatric surg&&&&");
    }
    if (concerncount.name === "Surgery") {
      navigate(
        "/specialists/cardiothoracic|dental|general|hand|neurosurgery|orthopaedic|plastic&&&&"
      );
    }
    if (concerncount.name === "Critical Care") {
      navigate("/specialists/anaesthesiology|emergency&&&&");
    }
    if (concerncount.name === "Cancer Care and Diagnostic Imaging") {
      navigate("/specialists/oncology|diagnostic|nuclear&&&&");
    }
    if (concerncount.name === "Internal Organ Care") {
      navigate(
        "/specialists/cardiology|endocrin|gastroentero|geriatric|haemato|infectious|internal|pathology|rheumato|renal&&&&"
      );
    }
    if (concerncount.name === "Neural and Mental Wellness") {
      navigate("/specialists/neurology|psychiatry&&&&");
    }
    if (concerncount.name === "Sensory Organ Care") {
      navigate(
        "/specialists/dermato|dentistry|ophthalmo|otorhino|respirato&&&&"
      );
    }
    if (concerncount.name === "Sexual Health and Reproductive Care") {
      navigate("/specialists/gynae|urology&&&&");
    }
  };
  return (
    <Card
      className={"custom-healthinterestcard"}
      // "my-5 p-1 rounded"
      value={concerncount.name}
      onClick={onClickHandler}
    >
      {/* <Link to={`/specialists`} style={{ textDecoration:"none" }}> */}
      <Card.Body>
        <div className={"custom-healthinterestbody"}>
          <Card.Img
            src={concerncount.image}
            variant="top"
            className={"custom-healthinterestimage"}
            alt={`image for ${concerncount.name}`}
          />
        </div>
        <Card.Title as="div" className={"custom-healthinteresttitle"}>
          <p style={{"padding":"0px","margin":"0px" }}>
            <b>{concerncount.name}</b>
          </p>
        </Card.Title>
      </Card.Body>
      {/* </Link> */}
    </Card>
  );
};

export default HealthConcernCard;
