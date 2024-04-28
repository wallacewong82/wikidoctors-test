import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PageContext } from "../../App";
import SortableHeader from "../../components/admin/SortableHeader";
import {
  useGetSpecialistsAsAdminQuery,
  useCreateSpecialistAsAdminMutation,
  useDeleteSpecialistAsAdminMutation,
} from "../../slices/specialistsApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import Paginate from "../../components/specialist/Paginate";
import SpecialistSearchBar from "../../components/specialist/SpecialistSearchBar";

const SpecialistListScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { pageNumber, keyword } = useParams();
  const { setCurrentPage } = useContext(PageContext);
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
  const specialiststringword = "admin/specialistlist";
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
    navigate("/admin/specialistlist");
  };
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const { data, isLoading, error, refetch } = useGetSpecialistsAsAdminQuery({
    keyword,
    pageNumber,
  });
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const [deleteSpecialist, { isLoading: loadingDelete }] =
    useDeleteSpecialistAsAdminMutation();
  const [createSpecialist, { isLoading: loadingCreate }] =
    useCreateSpecialistAsAdminMutation();

  const sortedSpecialists = () => {
    if (data && data.specialists && sortConfig.key !== null) {
      const sorted = [...data.specialists].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return data ? data.specialists : [];
  };

  useEffect(() => {
    setCurrentPage("admin");
  }, [setCurrentPage]);

  const deleteHandler = async (id) => {
    if (window.confirm("Confirm deletion?")) {
      try {
        await deleteSpecialist(id);
        refetch();
        toast.success("Specialist deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const createHandler = async () => {
    if (window.confirm("Confirm create new specialist?")) {
      try {
        await createSpecialist();
        refetch();
        toast.success("Specialist created");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <Container style={{ height: 100 }}></Container>

      <Row>
        <Col>
          <h4>Specialists List</h4>
          <Row>
            <Col className="text-end">
              <Button
                className="btn-sm m-3 btn-dark float-end"
                style={{
                  backgroundColor: "black",
                  borderColor: "black",
                  fontWeight: "bold",
                }}
                onClick={resetHandler}
              >
                Restart Search
              </Button>

              {userInfo.isSuperAdmin && (
                <Button
                  className="btn-sm m-3 float-end"
                  style={{ backgroundColor: "#40679E", borderColor: "#40679E" }}
                  onClick={createHandler}
                >
                  <FaEdit /> Create Specialist
                </Button>
              )}
            </Col>
          </Row>
          {loadingCreate && <Loader />}
          {loadingDelete && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
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
              <Row>
                <Table striped hover responsive className="table-sm">
                  <thead>
                    <tr style={{ fontSize: "13px" }}>
                      <SortableHeader
                        label="DOCTOR"
                        field="name"
                        handleSort={handleSort}
                        sortConfig={sortConfig}
                      />
                      <SortableHeader
                        label="SPECIALTY"
                        field="specialty"
                        handleSort={handleSort}
                        sortConfig={sortConfig}
                      />
                      <SortableHeader
                        label="CLINIC"
                        field="clinic"
                        handleSort={handleSort}
                        sortConfig={sortConfig}
                      />
                      <SortableHeader
                        label="INSURER"
                        field="insurerPanel"
                        handleSort={handleSort}
                        sortConfig={sortConfig}
                      />
                      <SortableHeader
                        label="VERIFIED"
                        field="verified"
                        handleSort={handleSort}
                        sortConfig={sortConfig}
                      />
                      <SortableHeader
                        label="PROMOTED"
                        field="promoted"
                        handleSort={handleSort}
                        sortConfig={sortConfig}
                      />
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedSpecialists().map((specialist) => (
                      <tr key={specialist._id}>
                        <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                          {specialist.name}
                        </td>
                        <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                          {specialist.specialty
                            ? specialist.specialty.length > 0
                              ? specialist.specialty.map((specialty, index) =>
                                  specialty.specialty
                                    ? `${specialty.specialty}` +
                                      (index !== specialist.specialty.length - 1
                                        ? ", "
                                        : "")
                                    : `${specialty.subspecialty}` +
                                      (index !== specialist.specialty.length - 1
                                        ? ", "
                                        : "")
                                )
                              : null
                            : null}
                        </td>
                        <td style={{ fontSize: "12px", maxWidth: "300px" }}>
                          {specialist.clinic
                            ? specialist.clinic.length > 0
                              ? specialist.clinic.map(
                                  (indivclinic, index) =>
                                    `${indivclinic.clinicName.replace(
                                      "&amp;",
                                      "&"
                                    )}` +
                                    (index !== specialist.clinic.length - 1
                                      ? ", "
                                      : "")
                                )
                              : null
                            : null}
                        </td>
                        <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                          {specialist.insurerPanel
                            ? specialist.insurerPanel.length > 0
                              ? specialist.insurerPanel.map(
                                  (insurer, index) =>
                                    `${insurer.insurerName} ${insurer.panelType}` +
                                    (index !==
                                    specialist.insurerPanel.length - 1
                                      ? ", "
                                      : "")
                                )
                              : null
                            : null}
                        </td>
                        <td style={{ fontSize: "13px", maxWidth: "200px" }}>
                          {specialist.verified ? (
                            <FaCheck style={{ color: "green" }} />
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td style={{ fontSize: "13px", maxWidth: "200px" }}>
                          {specialist.promoted}
                        </td>
                        <td>
                          <LinkContainer
                            to={`/admin/specialists/${specialist._id}/edit`}
                          >
                            <Button variant="light" className="btn-sm">
                              <FaEdit />
                            </Button>
                          </LinkContainer>
                          {userInfo.isSuperAdmin && (
                            <Button
                              variant="danger"
                              className="btn-sm"
                              onClick={() => deleteHandler(specialist._id)}
                              style={{
                                backgroundColor: "red",
                                borderColor: "red",
                              }}
                            >
                              <FaTrash style={{ color: "white" }} />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
              <Row style={{ alignContent: "center", justifyContent: "center" }}>
                <Col md={3}></Col>
                <Col md={6}>
                  <Paginate
                    pages={data.pages}
                    page={data.page}
                    link={`/${specialiststringword}`}
                    keyword={keyword ? keyword : ""}
                  />
                </Col>
                <Col md={3}></Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SpecialistListScreen;
