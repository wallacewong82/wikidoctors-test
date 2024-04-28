import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
} from "../../slices/blogApiSlice";
import { PageContext } from "../../App";
import SortableHeader from "../../components/admin/SortableHeader";

const BlogListScreen = () => {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage("admin");
  }, [setCurrentPage]);
  const { data: blogs, refetch, isLoading, error } = useGetBlogsQuery();
  const [deleteBlog, { isLoading: loadingDelete }] = useDeleteBlogMutation();
  const [createBlog, { isLoading: loadingCreate }] = useCreateBlogMutation();
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
  const sortedBlogs = () => {
    if (sortConfig.key !== null) {
      const sorted = [...blogs].sort((a, b) => {
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
    return blogs;
  };
  const deleteHandler = async (id) => {
    if (window.confirm("Confirm deletion?")) {
      try {
        await deleteBlog(id);
        refetch();
        toast.success("Blogpost deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createHandler = async () => {
    if (window.confirm("Confirm create new blogpost?")) {
      try {
        await createBlog();
        refetch();
        toast.success("Blogpost created");
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
          <h4>Blog List</h4>
          <Col className="text-end">
            <Button
              className="btn-sm m-3"
              style={{ backgroundColor: "#40679E", borderColor: "#40679E" }}
              onClick={createHandler}
            >
              <FaEdit /> Create Blog Post
            </Button>
          </Col>
          {loadingCreate && <Loader />}
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
                    label="TITLE"
                    field="title"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="CATEGORY"
                    field="category"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="CONTENT DURATION"
                    field="contentduration"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <SortableHeader
                    label="AUTHOR"
                    field="authorname"
                    handleSort={handleSort}
                    sortConfig={sortConfig}
                  />
                  <th>PUBLISHED?</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedBlogs().map((blog) => (
                  <tr key={blog._id}>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {new Date(blog.createdAt).toLocaleDateString(
                        "en-US",
                        dateoptions
                      )}
                    </td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>{blog.title}</td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>{blog.category}</td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>{blog.contentduration}</td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>{blog.authorname}</td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      {blog.posteddate ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td style={{ fontSize: "13px", maxWidth: "300px" }}>
                      <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(blog._id)}
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

export default BlogListScreen;
