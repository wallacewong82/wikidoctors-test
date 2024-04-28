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
      navigate("/specialists/dermato|dentistry|ophthalmo|otorhino|respirato&&&&");
    }
    if (concerncount.name === "Sexual Health and Reproductive Care") {
      navigate("/specialists/gynae|urology&&&&");
    }
  };
  return (
    <Card
      className="my-5 p-1 rounded"
      style={{ width: "130px", borderStyle: "none", height: "80px" }}
      value={concerncount.name}
      onClick={onClickHandler}
    >
      {/* <Link to={`/specialists`} style={{ textDecoration:"none" }}> */}
      <Card.Body>
        <div
          style={{
            backgroundColor: "#40679E",
            width: "100px",
            height: "100px",
            borderRadius: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card.Img
            src={concerncount.image}
            variant="top"
            style={{
              maxHeight: "70%",
              maxWidth: "70%",
              marginLeft: "0%",
              marginTop: "15%",
              filter: "invert(100)",
            }}
          />
        </div>
        <Card.Title
          as="div"
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "black",
          }}
        >
          <h6>
            <b>{concerncount.name}</b>
          </h6>
        </Card.Title>
      </Card.Body>
      {/* </Link> */}
    </Card>
  );
};

export default HealthConcernCard;
