import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getUserProfileAction } from "../actions/profileAction";

const Posts = ({
  post,
  thumbnail,
  title,
  readTime,
  avatar,
  user,
  author,
  date,
}) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Row>
        <Col
          md={10}
          className="mx-auto"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <>
            {/* <div className="mb-3" style={{ width: "100%" }}>
              <input
                className="search"
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
                placeholder="Search for blogs..."
              />
            </div> */}
            {/* <div>{message && <h4>{message}</h4>}</div> */}

            <div>
              <Card key={post._id} className="mb-4 post_card">
                <Card.Img
                  variant="top"
                  className="post_img"
                  src={thumbnail && thumbnail}
                />
                <Card.Body>
                  <Link to={`/post/${post._id}`} style={{ color: "#373a3c" }}>
                    <h1 className="post_title">{title}</h1>
                  </Link>
                  <div className="pb-1">
                    <p className="text-muted post_readTime">
                      <small>{readTime}</small>
                    </p>
                  </div>
                  <div className="post_bottom">
                    <img className="avatar" src={avatar} alt="" />
                    <Link to={`/author/${user}`}>
                      <p
                        className="post_author"
                        onClick={() => dispatch(getUserProfileAction(user))}
                      >
                        {author}
                      </p>
                    </Link>
                    <div>{moment(date).fromNow()}</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </>
          {/* {!loading && <Button>Load More</Button>} */}
        </Col>
      </Row>
    </div>
  );
};

export default Posts;
