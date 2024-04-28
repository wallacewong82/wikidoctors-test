import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetAppointmentsQuery,
  useDeleteAppointmentMutation,
} from "../../slices/appointmentsApiSlice";
import { PageContext } from "../../App";
import SortableHeader from "../../components/admin/SortableHeader";

const AppointmentListScreen = () => {
  const { setCurrentPage } = useContext(PageContext);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedAppointments = () => {
    if (sortConfig.key !== null) {
      const sorted = [...appointments].sort((a, b) => {
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
    return appointments;
  };
  useEffect(() => {
    setCurrentPage("admin");
  }, [setCurrentPage]);

  const {
    data: appointments,
    refetch,
    isLoading,
    error,
  } = useGetAppointmentsQuery();
  const [deleteAppointment, { isLoading: loadingDelete }] =
    useDeleteAppointmentMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Confirm deletion?")) {
      try {
        await deleteAppointment(id);
        refetch();
        toast.success("Appointment deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const dateoptions = { day: "2-digit", month: "short", year: "numeric" };

  return (
    <>
      <Container style={{ height: 100 }}></Container>
      <Row>
        <Col>
          <h4>Appointment List</h4>
          {loadingDelete && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <SortableHeader
                    label="CREATED"
                    field="createdAt"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="CLINIC"
                    field="clinicname"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="DOCTOR"
                    field="doctorname"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="PATIENT"
                    field="patientName"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="DATE/TIME"
                    field="date"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="COMMENTS"
                    field="patientComments"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="STATUS"
                    field="bookingStatus"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="TAGGING"
                    field="taggedaccount"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedAppointments().map((appointment) => (
                  <tr key={appointment._id}>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {new Date(appointment.createdAt).toLocaleDateString(
                        "en-US",
                        dateoptions
                      )}
                    </td>

                    <td style={{ maxWidth: "180px", fontSize: "13px" }}>
                      {appointment.clinicname}
                    </td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {appointment.doctorname}
                    </td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {appointment.patientName}
                    </td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {appointment.date}
                      {"  "}
                      {appointment.time}hrs
                    </td>

                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {appointment.patientComments}
                    </td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {appointment.bookingStatus}
                    </td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {appointment.taggedaccount ? (
                        appointment.taggedaccount
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>

                    <td>
                      <LinkContainer
                        to={`/admin/appointment/${appointment._id}/edit`}
                      >
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(appointment._id)}
                        style={{
                          backgroundColor: "red",
                          borderColor: "red",
                        }}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AppointmentListScreen;
