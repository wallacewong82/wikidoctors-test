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
      <Container className="custom-blogdetailcontainer" ></Container>
      <Link className="btn btn-dark my-3 custom-blogdetailbackbtn" to={`/blogs`}>
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
          <Row className="custom-blogdetailrow1">
            <Button className="btn-light float-start custom-blogdetailbtn" disabled>{blogPost.category.toUpperCase()}</Button>
            <h1 className="custom-blogdetailh1">
              {blogPost.title}
              {"  "}
            </h1>
            <p className="custom-blogdetailp1" >Written by <b>{blogPost.authorname}</b></p> 
            <p className="custom-blogdetailp2">Posted on: {(/^[0-9]+$/.test(blogPost.posteddate))?(formatteddate):((blogPost.posteddate)) }{"  "}<i>({blogPost.contentduration} read)</i></p>
             
            
            <Col className="d-flex custom-blogdetailcol1" >
              <Image
              //  src={blogPost.blogimage}
              src={`/api/webimage/663f68aaa3db0d582d1d4cdc`}
              alt={"WikiDoctors.com logo"}
                className="custom-blogdetailimg"
              ></Image>
            </Col>
          </Row>
          <Row className="custom-blogdetailrow2">
            <p className="custom-blogdetailp3">{blogPost.content}</p>
          </Row>
          <Row className="custom-blogdetailrow3">
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
