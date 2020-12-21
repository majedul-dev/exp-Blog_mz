import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { updatePostAction } from "../actions/postsAction";
import Message from "../components/Message";

const EditPostScreen = ({ match }) => {
  const postId = match.params.id;
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { error, loading } = useSelector((state) => state.updatePost);
  const { loading: singlePostLoading, post } = useSelector(
    (state) => state.getSinglePost
  );

  const handleEditorChange = (content) => {
    setBody(content);
  };

  const handleChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  useEffect(() => {
    // setThumbnail(singlePostLoading || !post.thumbnail ? "" : post.thumbnail); dose not working fix it latter!
    setTitle(singlePostLoading || !post.title ? "" : post.title);
    setBody(singlePostLoading || !post.body ? "" : post.body);
  }, [dispatch, post, singlePostLoading]);

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("body", body);

    dispatch(updatePostAction(postId, formData));
  };

  return (
    <div>
      <h1 className='text-primary'>Update the post</h1>
      <Link to='/posts'>
        <Button className='my-3'>Back to Posts</Button>
      </Link>
      <Row>
        <Col md={10} className='mx-auto mt-3'>
          {error && <Message message={error} variant='danger' />}
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.File
                id='exampleFormControlFile1'
                label='Choose thumbnail for the post'
                accept='.jpg, .png, .jpeg'
                name='post-thumbnail'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your post title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Text className='text-muted'>
                Post title shuld be among 100 characters
              </Form.Text>
            </Form.Group>

            <Editor
              apiKey='27ojk93awh6rux5nifxwolmvlswa3w4m05ikqwqlk14lqhvh'
              //   initialValue='<p>This is the initial content of the editor</p>'
              value={body}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | code preview |  alignleft aligncenter alignright  alignjustify |  bullist numlist outdent indent | link image media | removeformat | help",
                relative_urls: false,
                automatic_uploads: true,
              }}
              onEditorChange={handleEditorChange}
            />
            <Button type='submit' className='my-5' disabled={loading}>
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditPostScreen;
