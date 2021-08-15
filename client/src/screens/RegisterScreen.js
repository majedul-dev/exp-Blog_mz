import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userAction";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const RegisterScreen = ({ history, location }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const { name, email, password, confirmPassword } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/no-image.jpg");

  const dispatch = useDispatch();

  const { userInfo, loading, error } = useSelector(
    (state) => state.userRegister
  );

  const redirect = location.search ? location.search.split("=")[1] : "/login";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    formData.set("avatar", avatar);

    if (password !== confirmPassword) {
      return setMessage("Password dose not match");
    }
    dispatch(registerUser(formData));
  };

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <h1 className="text-center my-5">Register an Account</h1>
        {message && <Alert variant="danger">{message}</Alert>}
        {error && <Message message={error} variant="danger" />}
        <Form className="mt-4" onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={avatarPreview}
                alt="avatar-preview"
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "999px",
                  marginRight: "1rem",
                }}
              />
              <Form.Control
                type="file"
                size="lg"
                name="avatar"
                accept="images/*"
                onChange={onChange}
              />
            </div>
          </Form.Group>

          <Button type="submit" className="btn-dark" disabled={loading}>
            Register
          </Button>
        </Form>
        <p className="py-3">
          Already have an account,{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </p>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
