import React, { useState, useEffect } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentAction,
  replyCommentAction,
  updateCommentAction,
} from "../actions/commentAction";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Comments = ({ comment }) => {
  const dispatch = useDispatch();

  const [body, setBody] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [message, setMessage] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);
  const { deleteSuccess } = useSelector((state) => state.deleteComment);
  const { updatedSuccess } = useSelector((state) => state.updateComment);
  const { replyCommentSuccess } = useSelector((state) => state.replyComment);

  const editCommentSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCommentAction({ body }, comment._id));
  };

  const replyCommentSubmitHandler = (e) => {
    e.preventDefault();
    if (replyBody === "") return setMessage("Reply field should not be empty");
    dispatch(replyCommentAction({ replyBody }, comment._id));
    setReplyBody("");
    setOpenReply(false);
    setShowReplies(true);
  };

  useEffect(() => {
    if (openEdit) {
      setBody(!comment.body ? "" : comment.body);
    }

    if (updatedSuccess) {
      setOpenEdit(false);
    }
  }, [
    dispatch,
    comment,
    openEdit,
    deleteSuccess,
    updatedSuccess,
    replyCommentSuccess,
  ]);

  return (
    <div>
      <Row>
        <Col>
          <Card className='mb-2 commentCard'>
            <Card.Body>
              <div className='commentUserAndActions'>
                <div className='user'>
                  <img
                    src={comment.avatar}
                    alt='avatar'
                    className='avatar mr-1'
                  />
                  <strong>{comment.name}</strong>
                </div>
                <div className='actions'>
                  {userInfo && userInfo.id === comment.user && (
                    <>
                      <Button
                        variant='info'
                        className='btn-sm'
                        onClick={() => setOpenEdit(!openEdit)}>
                        <FaEdit />
                      </Button>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() =>
                          dispatch(deleteCommentAction(comment._id))
                        }>
                        <FaTrashAlt />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className='mt-2'>
                {openEdit ? (
                  <Form onSubmit={editCommentSubmitHandler} className='mb-3'>
                    <Form.Group>
                      <Form.Control
                        size='sm'
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                      />
                    </Form.Group>
                    <Button type='submit' className='btn-sm'>
                      Update
                    </Button>
                    <Button
                      className='btn-light btn-sm'
                      onClick={() => setOpenEdit(!openEdit)}>
                      Cancle
                    </Button>
                  </Form>
                ) : (
                  <p>{comment.body}</p>
                )}
              </div>

              <Button
                className='btn-light btn-sm mb-2'
                disabled={!userInfo}
                onClick={() => setOpenReply(!openReply)}>
                Reply to{" "}
              </Button>
              <Button
                className='btn-info btn-sm mb-2'
                onClick={() => setShowReplies(!showReplies)}>
                {comment.replies.length} Replies
              </Button>

              {openReply && (
                <Form onSubmit={replyCommentSubmitHandler} className='mb-2'>
                  {message && <Alert variant='danger'>{message}</Alert>}
                  <Form.Group>
                    <Form.Control
                      size='sm'
                      onChange={(e) => setReplyBody(e.target.value)}
                      value={replyBody}
                      placeholder='write some comments'
                    />
                  </Form.Group>
                  <Button type='submit' className='btn-sm'>
                    Submit
                  </Button>
                  <Button
                    className='btn-light btn-sm'
                    onClick={() => setOpenReply(!openReply)}>
                    Cancle
                  </Button>
                </Form>
              )}
              <Row>
                <Col md={11} className='m-auto'>
                  {showReplies &&
                    comment.replies &&
                    comment.replies.map((repCom) => (
                      <Card key={repCom._id} className='mb-3'>
                        <Card.Body>
                          <div className='commentUserAndActions'>
                            <div className='user'>
                              <img
                                src={repCom.avatar}
                                alt='avatar'
                                className='avatar mr-1'
                              />
                              <strong>{repCom.name}</strong>
                            </div>
                            {/* <div className='actions'>
                              // {userInfo && userInfo.id === repCom.user && (
                                <Button variant='danger' className='btn-sm'>
                                  <FaTrashAlt />
                                </Button>
                              )}
                            </div> */}
                          </div>

                          <p className='mt-3'>{repCom.replyBody}</p>
                        </Card.Body>
                      </Card>
                    ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Comments;
