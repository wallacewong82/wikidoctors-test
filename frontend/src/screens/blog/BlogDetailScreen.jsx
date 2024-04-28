import React from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { useGetBlogDetailsQuery } from "../../slices/blogApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BlogAuthor from "../../components/blog/BlogAuthor";
const BlogDetailScreen = () => {
  const { id: blogId } = useParams();
  const { data: blogPost, isLoading, error } = useGetBlogDetailsQuery(blogId);

  const blogtime = blogPost?.posteddate;
  const blogdate = blogtime? new Date(parseInt(blogtime)) : null;

  const options = {
    day: '2-digit',
    month:"short",
    year:"numeric"
  }
  const formatteddate = blogdate ?  blogdate.toLocaleDateString('en-US', options): null;
  return (
    <>
      <Container style={{ height: 100 }}></Container>
      <Link className="btn btn-dark my-3" to={`/blogs`}>
        Back to Blog
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Container>
          <Row>
            <Button style={{ fontSize: "20px", maxWidth:"250px", borderColor:"#40679E", color:"#40679E", backgroundColor:"white" }} className="btn-light float-start" disabled>{blogPost.category.toUpperCase()}</Button>
            <h1>
              {blogPost.title}
              {"  "}
            </h1>
            <p style={{ fontSize: "24px" }}>Written by <b>{blogPost.authorname}</b></p>
            <p style={{ fontSize: "20px" }}>Posted on: {(/^[0-9]+$/.test(blogPost.posteddate))?(formatteddate):((blogPost.posteddate)) }</p>
              <i>({blogPost.contentduration} read)</i>
            
            <Col className="d-flex" style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                src={blogPost.blogimage}
                style={{ width: "500px" }}
              ></Image>
            </Col>
          </Row>
          <Row>
            <p style={{ fontSize: "24px" }}>{blogPost.content}</p>
          </Row>
          <Row>
            <BlogAuthor
              authorname={blogPost.authorname}
              authorpic={blogPost.authorimage}
              authorprofile={blogPost.authorwriteup}
            />
          </Row>
        </Container>
      )}
    </>
  );
};

export default BlogDetailScreen;
