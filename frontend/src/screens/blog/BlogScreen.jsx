import React, { useContext, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useGetBlogsQuery } from "../../slices/blogApiSlice";
import BlogCard from "../../components/blog/BlogCard";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { PageContext } from "../../App";
import Meta from "../../components/Meta";

const BlogScreen = () => {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage("blog");
  }, [setCurrentPage]);

  const { data: blogs, isLoading, error } = useGetBlogsQuery();
  return (
    <>
        <Meta title="Blog"/>

      <Container className={"custom-blogscreencontainer"}></Container>
      <h1 className={"custom-blogscreenheader"}>Blog Articles</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {blogs.map((blogPost) =>
            blogPost.posteddate? (
              <Col key={blogPost._id} sm={12} md={12} lg={6} xl={6}>
                <BlogCard blogPost={blogPost}></BlogCard>
              </Col>
            ) : null
          )}
        </Row>
      )}
    </>
  );
};

export default BlogScreen;
