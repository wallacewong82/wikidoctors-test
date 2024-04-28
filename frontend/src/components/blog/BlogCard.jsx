import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ blogPost }) => {
  const mycategory = blogPost.category.toUpperCase();
  const blogtime = blogPost.posteddate;
  const blogdate = new Date(parseInt(blogtime));

  const options = {
    day: '2-digit',
    month:"short",
    year:"numeric"
  }
  const formatteddate = blogdate.toLocaleDateString('en-US', options);
  return (
    <Card
      className="my-1 p-1 rounded"
      key={blogPost._id}
      style={{ borderStyle: "solid", height: "200px" }}
    >
      <Link
        to={`/blogs/${blogPost._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Row style={{ height: "50px", marginLeft: "3px", marginTop: "5px" }}>
          <Col md={4}>
            <Card.Img src={blogPost.blogimage}style={{ maxHeight: "180px", maxWidth:"200px"}}></Card.Img>
          </Col>
          <Col md={8}>
            <Card.Body>
              <Button style={{ marginTop: "-10px", borderColor:"#40679E", color:"#40679E", backgroundColor:"white" }}  disabled>{mycategory}</Button>
              <Card.Text>
                <span
                  style={{
                    fontSize: "22px",
                    color: "black",
                    fontWeight: "bold",
                    marginTop:"-10px"
                  }}
                >
                  {blogPost.title}
                </span>
              </Card.Text>
              <span>
                <b>{blogPost.authorname}</b>
                {"  "}(<i>{blogPost.contentduration} read</i> )
              </span>
              <p>Posted on: {(/^[0-9]+$/.test(blogPost.posteddate))?(formatteddate):(blogPost.posteddate) }</p>
            </Card.Body>
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default BlogCard;
