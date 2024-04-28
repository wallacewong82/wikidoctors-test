import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetBlogDetailsQuery,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from "../../slices/blogApiSlice";

const BlogEditScreen = () => {
  const { id: blogId } = useParams();
  const [authorName, setAuthorName] = useState("");
  const [authorWriteup, setAuthorWriteup] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [contentDuration, setContentDuration] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [publishDate, setPublishDate] = useState("");

  const changeCategory = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const {
    data: blog,
    isLoading,
    refetch,
    error,
  } = useGetBlogDetailsQuery(blogId);
  const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();

  const [uploadBlogImage, { isLoading: loadingUpload }] =
    useUploadBlogImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setAuthorName(blog.authorname);
      setAuthorWriteup(blog.authorwriteup);
      setTitle(blog.title);
      setCategory(blog.category);
      setContent(blog.content);
      setAuthorImage(blog.authorimage);
      setBlogImage(blog.blogimage);
      setContentDuration(blog.contentduration.replace(" min", ""));
      if (blog.posteddate) {
        setIsPublished(true);
        setPublishDate(blog.posteddate);
      }
    }
  }, [blog]);

  const publishHandler = () => {
    if (isPublished) {
      setIsPublished(false);
      setPublishDate("");
    } else {
      setIsPublished(true);
      const publishNow = new Date();
      setPublishDate(publishNow.setHours(0, 0, 0, 0));
    }
  };

  const uploadFileHandlerForAuthor = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res.message);
      setAuthorImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const uploadFileHandlerForBlog = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res.message);
      setBlogImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateBlog({
        blogId,
        authorName,
        authorWriteup,
        authorImage,
        blogImage,
        title,
        category,
        content,
        contentDuration: contentDuration + " min",
        publishDate,
      });
      toast.success("Blog updated successfully");
      refetch();
      navigate("/admin/bloglist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <FormContainer>
        <Container style={{ height: 100 }}></Container>
        <Link to={-1} className="btn btn-dark my-3">
          Back
        </Link>
        <h2>Edit Blog Post</h2>
        {loadingUpload && <Loader />}
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="authorName" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Author Name</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter author name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="authorWriteup" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Author Writeup</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter author writeup"
                    name="message"
                    as="textarea"
                    rows={4}
                    value={authorWriteup}
                    onChange={(e) => setAuthorWriteup(e.target.value)}
                  ></Form.Control>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="authorImage" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Author Image</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  {authorImage && typeof authorImage === "string" ? (
                    <>
                      <Image
                        src={authorImage}
                        style={{
                          maxHeight: "200px",
                          maxWidth: "250px",
                          minWidth: "150px",
                        }}
                      />
                      <small className="text-muted">
                        Currently uploaded image
                      </small>
                    </>
                  ) : null}
                  <Form.Control
                    type="text"
                    placeholder="Enter author image URL"
                    value={authorImage}
                    onChange={(e) => setAuthorImage}
                  ></Form.Control>
                  <Form.Control
                    type="file"
                    label="Choose image file for author"
                    onChange={uploadFileHandlerForAuthor}
                  />{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="title" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Title</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter blogpost title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Category</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  <Form.Control
                    as="select" // Set the 'as' prop to 'select' to create a dropdown
                    value={category}
                    onChange={changeCategory}
                    style={{ backgroundColor: "lightgrey" }}
                  >
                    <option value="" hidden>
                      Choose category
                    </option>
                    <option value="Specialists">Specialists</option>
                    <option value="Health Screening">Health Screening</option>
                    <option value="Beauty & Wellness">Beauty & Wellness</option>
                    <option value="Health & Wealth">Health & Wealth</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="blogImage" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Blog Image</Form.Label>{" "}
                </Col>
                <Col md={9}>
                  {blogImage && typeof blogImage === "string" ? (
                    <>
                      <Image
                        src={blogImage}
                        style={{
                          maxHeight: "200px",
                          maxWidth: "250px",
                          minWidth: "150px",
                        }}
                      />
                      <small className="text-muted">
                        Currently uploaded image
                      </small>
                    </>
                  ) : null}
                  <Form.Control
                    type="text"
                    placeholder="Enter blog image URL"
                    value={blogImage}
                    onChange={(e) => setBlogImage}
                  ></Form.Control>
                  <Form.Control
                    type="file"
                    label="Choose image for blog post"
                    onChange={uploadFileHandlerForBlog}
                  />{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="content" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Content</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter content"
                    name="message"
                    as="textarea"
                    rows={20}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></Form.Control>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="contentDuration" className="my-2">
              <Row>
                <Col md={3} className="text-end" style={{ marginTop: "8px" }}>
                  <Form.Label>Content Duration (min)</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="number"
                    placeholder="Enter content duration (in min)"
                    value={contentDuration.replace(" min", "")}
                    max={120}
                    onChange={(e) => setContentDuration(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="isPublished" className="my-2">
              <Row>
                <Col
                  md={3}
                  className="text-end"
                  style={{ marginTop: "8px" }}
                ></Col>
                <Col md={9}>
                  <Form.Check
                    type="checkbox"
                    label="Publish this post?"
                    checked={isPublished}
                    onChange={publishHandler}
                  ></Form.Check>{" "}
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Col
                md={10}
                className="text-end"
                style={{ marginTop: "8px" }}
              ></Col>
              <Col md={2}>
                <Button
                  type="submit"
                  className="btn my-2"
                  style={{ backgroundColor: "#40679E", borderColor: "#40679E" }}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BlogEditScreen;
