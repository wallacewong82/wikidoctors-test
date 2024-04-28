import React, { useState, useContext, useEffect } from "react";
import { PageContext } from "../App";
import {
  Row,
  Col,
  Container,
  Table,
  Button,
  OverlayTrigger,
  Popover,
  Form,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
  useGetAppointmentsByAccountQuery,
  useUpdateAppointmentByAccountByIdMutation,
} from "../slices/appointmentsApiSlice";
import SortableHeader from "../components/admin/SortableHeader";
import Meta from "../components/Meta";

const UserDashboard = () => {
  const { setCurrentPage } = useContext(PageContext);
  const [showPopover, setShowPopover] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const {
    data: appointments,
    refetch,
    isLoading,
    error,
  } = useGetAppointmentsByAccountQuery();
  const [updateAppointment, { isLoading: loadingUpdate }] =
    useUpdateAppointmentByAccountByIdMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage("dashboard");
    refetch();
  }, [setCurrentPage, refetch]);

  useEffect(() => {
    if (error?.status === 429) {
      // Redirect to the home page
      navigate("/");
    }
  }, [error, navigate]);
  if (error && error.status !== 429) {
    return <Message variant="danger">{error.message}</Message>;
  }

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

  const changeBookingStatus = async (appointmentId, bookingStatus) => {
    try {
      setShowPopover((prevShow) => ({
        ...prevShow,
        [appointmentId]: false,
      }));

      await updateAppointment({
        appointmentId,
        bookingStatus,
      });
      toast.success("Appointment updated successfully");
      refetch();
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  function capitalizeFirstLetter(str) {
    if (str && typeof str === "string" && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      // If str is not defined or empty, return an empty string
      return "";
    }
  }
  const dateoptions = { day: "2-digit", month: "short", year: "numeric" };

  return (
    <>
    <Meta title="Dashboard" />
      <Container style={{ height: 100 }}></Container>

      <Row>
        <Col>
          <h1>User Dashboard</h1>
          {loadingUpdate && <Loader />}
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
                  <th>UPDATE</th>
                </tr>
              </thead>
              <tbody>
                {sortedAppointments().map((appointment) => (
                  <tr key={appointment._id}>
                    <td>
                      {new Date(appointment.createdAt).toLocaleDateString(
                        "en-US",
                        dateoptions
                      )}
                    </td>
                    <td style={{ maxWidth: "180px" }}>
                      {appointment.clinicname}
                    </td>
                    <td>{appointment.doctorname}</td>
                    <td>{appointment.patientName}</td>
                    <td>
                      {appointment.date} {appointment.time}hrs
                    </td>
                    <td>{appointment.patientComments}</td>
                    <td>{capitalizeFirstLetter(appointment.bookingStatus)}</td>

                    <td>
                      <OverlayTrigger
                        trigger="click"
                        placement="right"
                        show={showPopover[appointment._id]}
                        onToggle={(isVisible) =>
                          setShowPopover((prevShow) => ({
                            ...prevShow,
                            [appointment._id]: isVisible,
                          }))
                        }
                        overlay={
                          <Popover
                            id={`popover-positioned-scrolling-right-${appointment._id}`}
                          >
                            <Form.Control
                              as="select"
                              value={appointment.bookingStatus}
                              onChange={(e) =>
                                changeBookingStatus(
                                  appointment._id,
                                  e.target.value
                                )
                              }
                              style={{ backgroundColor: "lightgrey" }}
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="canceled">Canceled</option>
                              <option value="rescheduled">Rescheduled</option>
                              <option value="completed">Completed</option>
                              <option value="no show">No Show</option>
                            </Form.Control>
                          </Popover>
                        }
                      >
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </OverlayTrigger>
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

export default UserDashboard;
