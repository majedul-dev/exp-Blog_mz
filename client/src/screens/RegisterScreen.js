import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userAction";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const RegisterScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { userInfo, loading, error } = useSelector(
    (state) => state.userRegister
  );

  const redirect = location.search ? location.search.split("=")[1] : "/login";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Password dose not match");
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <Row>
      <Col md={6} className='mx-auto'>
        <h1 className='text-center my-5'>Register an Account</h1>
        {message && <Alert variant='danger'>{message}</Alert>}
        {error && <Message message={error} variant='danger' />}
        <Form className='mt-4' onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' disabled={loading}>
            Register
          </Button>
        </Form>
        <p className='py-3'>
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
