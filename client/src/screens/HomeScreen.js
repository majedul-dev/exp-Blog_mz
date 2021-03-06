import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../actions/postsAction";
import Loader from "../components/Loader";
import moment from "moment";
import { getUserProfileAction } from "../actions/profileAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  const { loading, posts } = useSelector((state) => state.getAllPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  return (
    <>
      <Row>
        <Col
          md={10}
          className='mx-auto'
          style={{ display: "flex", flexDirection: "column" }}>
          <>
            <h2 className='text-center mb-3' style={{ fontWeight: "500" }}>
              All Posts
            </h2>
            <div className='mb-3' style={{ width: "100%" }}>
              <input
                className='search'
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
                placeholder='Search for blogs...'
              />
            </div>
            {/* <div>{message && <h4>{message}</h4>}</div> */}
            {loading ? (
              <Loader />
            ) : (
              <div>
                {allPosts &&
                  allPosts
                    // eslint-disable-next-line
                    .filter((val) => {
                      if (searchStr === "") {
                        return val;
                      } else if (
                        val.title
                          .toLowerCase()
                          .includes(searchStr.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((post) => (
                      <Card key={post._id} className='mb-4 post_card'>
                        <Card.Img
                          variant='top'
                          className='post_img'
                          src={post.thumbnail}
                        />
                        <Card.Body>
                          <Link
                            to={`/post/${post._id}`}
                            style={{ color: "#373a3c" }}>
                            <h1 className='post_title'>{post.title}</h1>
                          </Link>
                          <div className='pb-2'>
                            <p className='text-muted post_readTime'>
                              <small>{post.readTime}</small>
                            </p>
                          </div>
                          <div className='post_bottom'>
                            <img className='avatar' src={post.avatar} alt='' />
                            <Link to={`/author/${post.user}`}>
                              <p
                                className='post_author'
                                onClick={() =>
                                  dispatch(getUserProfileAction(post.user))
                                }>
                                {post.author}
                              </p>
                            </Link>
                            <div>{moment(post.createdAt).fromNow()}</div>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
              </div>
            )}
          </>
          {/* {!loading && <Button>Load More</Button>} */}
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
