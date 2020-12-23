import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../actions/postsAction";
import Message from "../components/Message";

const CreatePostScreen = () => {
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { error, loading, createPostSuccess } = useSelector(
    (state) => state.createPost
  );

  const handleEditorChange = (content) => {
    setBody(content);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("body", body);

    dispatch(createPostAction(formData));
  };

  useEffect(() => {}, [createPostSuccess]);

  return (
    <div>
      <h1>Create a New Post</h1>
      <Link to='/posts'>
        <Button className='my-3'>Back to Posts</Button>
      </Link>
      <Row>
        <Col md={9} className='mx-auto mt-3'>
          {error && <Message message={error} variant='danger' />}
          {createPostSuccess && (
            <Alert variant='success'>Post Created Successfully</Alert>
          )}
          <div className='mb-2'>
            {image && (
              <img
                src={image}
                alt='Choosen'
                style={{ height: "150px", marginTop: "2rem" }}
              />
            )}
          </div>
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
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CreatePostScreen;
