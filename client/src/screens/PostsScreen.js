import React, { useEffect } from "react";
import moment from "moment";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAction,
  getMyOwnPosts,
  getSinglePost,
} from "../actions/postsAction";
import Loader from "../components/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUserProfileAction } from "../actions/profileAction";

const PostsScreen = () => {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector((state) => state.myOwnPosts);
  const { success, loading: deleteLoading } = useSelector(
    (state) => state.deletePost
  );

  useEffect(() => {
    dispatch(getMyOwnPosts());
  }, [dispatch, success]);
  return (
    <>
      <Link to='/posts/create-post'>
        <Button className='my-3'>Create Post</Button>
      </Link>
      <Row>
        <Col md={11} className='mx-auto'>
          <h1
            className='text-center text-primary mb-5'
            style={{ fontWeight: "500" }}>
            {posts && posts.length > 0
              ? "Your Posts"
              : "Your Posts List is Empty"}
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert variant='danger'>{error}</Alert>
          ) : (
            <div>
              {success && (
                <Alert variant='success'>Post deleted successfully</Alert>
              )}
              {posts &&
                posts.map((post) => (
                  <Card key={post._id} className='mb-4 post_card'>
                    <Card.Img
                      variant='top'
                      className='post_img'
                      src={post.thumbnail}
                    />
                    <Card.Body className='post_cardBody'>
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
                      <div className='post_bottom post_bottomForPostControl'>
                        <div className='post_authorInfo'>
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
                        <div>
                          <Link to={`/posts/${post._id}/edit`}>
                            <Button
                              variant='info'
                              className='mr-2'
                              onClick={() => dispatch(getSinglePost(post._id))}>
                              <FaEdit />
                            </Button>
                          </Link>
                          <Button
                            variant='danger'
                            className='ml-auto'
                            disabled={deleteLoading}
                            onClick={() =>
                              dispatch(deletePostAction(post._id))
                            }>
                            <FaTrashAlt />
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default PostsScreen;
