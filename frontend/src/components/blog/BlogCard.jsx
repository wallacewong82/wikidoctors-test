import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ blogPost }) => {
  const mycategory = blogPost.category.toUpperCase();
  const blogtime = blogPost.posteddate;
  const blogdate = new Date(parseInt(blogtime));

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formatteddate = blogdate.toLocaleDateString("en-US", options);
  return (
    <Card
      className="my-1 p-1 rounded custom-blogcard"
      key={blogPost._id}
      // style={{ borderStyle: "solid", height: "200px" }}
    >
      <Link
        to={`/blogs/${blogPost._id}`}
        className="custom-blogcardlink"
        // style={{ textDecoration: "none", color: "black" }}
      >
        <Row className="custom-blogcardrow">
          <Col md={4} className="custom-blogcardcol1">
            {/* <Card.Img src={blogPost.blogimage} className="custom-blogcardimg" ></Card.Img> */}
            <Card.Img
              src={`/api/webimage/663f68aaa3db0d582d1d4cdc`}
              alt={"WikiDoctors.com logo"}
              className="custom-blogcardimg"
            ></Card.Img>
          </Col>
          <Col md={8} className="custom-blogcardcol2">
            <Card.Body>
              <Button className="custom-blogcardbtn" disabled>
                {mycategory}
              </Button>
              <Card.Text className="custom-blogcardtext">
                <span className="custom-blogcardspan1">{blogPost.title}</span>
              </Card.Text>
              <span className="custom-blogcardspan2">
                <b>{blogPost.authorname}</b>
                {"  "}(<i>{blogPost.contentduration} read</i> )
              </span>
              <p className="custom-blogcardp1">
                Posted on:{" "}
                {/^[0-9]+$/.test(blogPost.posteddate)
                  ? formatteddate
                  : blogPost.posteddate}
              </p>
            </Card.Body>
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default BlogCard;
