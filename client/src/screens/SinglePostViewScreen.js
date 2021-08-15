import React, { useEffect, useState, useRef } from "react";
import ReactHtmlParser from "react-html-parser"; // htmlparser2, // convertNodeToElement, // processNodes,
import { Alert, Button, Form, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Comments from "../components/Comments";
import LikeDislike from "../components/LileDislike";
import Loader from "../components/Loader";
import { getAllPosts, getSinglePost } from "../actions/postsAction";
import { commentOnPostAction, getComments } from "../actions/commentAction";

const SinglePostViewScreen = ({ match }) => {
  const container = useRef(null);

  const postId = match.params.id;
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, post } = useSelector((state) => state.getSinglePost);
  const { success } = useSelector((state) => state.commentOnPost);
  const { deleteSuccess } = useSelector((state) => state.deleteComment);
  const { updatedSuccess } = useSelector((state) => state.updateComment);
  const { replyCommentSuccess } = useSelector((state) => state.replyComment);
  const { comments, loading: getCommentsLoading } = useSelector(
    (state) => state.getComments
  );

  const postComments =
    comments && comments.filter((comment) => comment.post === postId);

  const createCommentSubmitHandle = (e) => {
    e.preventDefault();
    if (body === "") return setMessage("Comment field shuld not be empty");
    dispatch(commentOnPostAction({ body }, postId));
    setBody("");
  };

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getSinglePost(postId));
    dispatch(getComments());
  }, [
    dispatch,
    postId,
    success,
    deleteSuccess,
    updatedSuccess,
    replyCommentSuccess,
  ]);

  return (
    <div className="col-lg-8 mx-auto" ref={container}>
      <Link to="/">
        <Button variant="dark">All Posts</Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <div className="py-4 my-2">
            <h1 className="pb-3">{post.title}</h1>
            <Image
              src={post.thumbnail && post.thumbnail.url}
              className="mb-5"
            />
            <div>{post && ReactHtmlParser(post.body)}</div>
          </div>
        </>
      )}
      <hr />

      <div className="my-5">
        <LikeDislike postId={postId} post={post} />
      </div>

      <>
        <h2>Please leave with a comment!</h2>
        <div>
          {!userInfo && (
            <small style={{ color: "red" }}>
              Please login for place your comment or reply
            </small>
          )}
        </div>
        {message && (
          <Alert
            variant="danger"
            onClose={() => setShow(!show)}
            dismissible={true}
          >
            {message}
          </Alert>
        )}
        <Form onSubmit={createCommentSubmitHandle} className="mb-4">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your comment"
              value={body}
              onChange={(e) => setBody(e.currentTarget.value)}
            />
          </Form.Group>
          <Button type="submit" variant="dark" disabled={!userInfo}>
            Submit
          </Button>
        </Form>

        {postComments && (
          <div className="mb-2">
            {" "}
            <strong>{postComments.length}</strong>{" "}
            {postComments.length > 1 ? "Comments" : "Comment"} total
          </div>
        )}
        {getCommentsLoading ? (
          <Loader />
        ) : (
          postComments &&
          postComments.map(
            (comment) =>
              comment && (
                <div key={comment._id}>
                  <Comments comment={comment} postId={postId} />
                </div>
              )
          )
        )}
      </>
    </div>
  );
};

export default SinglePostViewScreen;
