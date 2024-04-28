import React, { useState,useEffect, useContext } from "react";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";
import { PageContext } from "../../App";
import SortableHeader from "../../components/admin/SortableHeader";

const UserListScreen = () => {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage("admin");
  }, [setCurrentPage]);
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
  const sortedUsers = () => {
    if (sortConfig.key !== null) {
      const sorted = [...users].sort((a, b) => {
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
    return users;
  };

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const deleteHandler = async (id) => {
    if (window.confirm("Confirm deletion?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted");
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
          <h4>User List</h4>
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
                    label="JOINED"
                    field="createdAt"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="FIRST NAME"
                    field="firstName"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="LAST NAME"
                    field="lastName"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="EMAIL"
                    field="email"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="PHONE"
                    field="phoneNumber"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <th>ADMIN</th>
                  {userInfo.isSuperAdmin && <th>SUPERADMIN</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {sortedUsers().map((user) => 
                  userInfo.isSuperAdmin || !user.isSuperAdmin ? (
                    <tr key={user._id}>
                      <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                        {new Date(user.createdAt).toLocaleDateString(
                          "en-US",
                          dateoptions
                        )}
                      </td>
                      <td style={{ fontSize: "13px", maxWidth: "300px" }}>{user.firstName}</td>
                      <td style={{ fontSize: "13px", maxWidth: "300px" }}>{user.lastName}</td>
                      <td style={{ fontSize: "13px", maxWidth: "300px" }}>{user.email}</td>
                      <td style={{ fontSize: "13px", maxWidth: "300px" }}>{user.phoneNumber}</td>
                      <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                        {user.isAdmin ? (
                          <FaCheck style={{ color: "green" }} />
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      {userInfo.isSuperAdmin && (
                        <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                          {user.isSuperAdmin ? (
                            <FaCheck style={{ color: "green" }} />
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                      )}
                      <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <FaEdit />
                          </Button>
                        </LinkContainer>

                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(user._id)}
                          disabled={user.isAdmin}
                          style={{
                            backgroundColor: user.isAdmin ? "grey" : "red",
                            borderColor: user.isAdmin ? "grey" : "red",
                          }}
                        >
                          <FaTrash style={{ color: "white" }} />
                        </Button>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserListScreen;
