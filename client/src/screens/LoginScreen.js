import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin } from "../actions/userAction";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const LoginScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo, loading, error } = useSelector((state) => state.userLogin);

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getUserLogin({ email, password }));
  };

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <h1 className="text-center my-5">Login Your Account</h1>
        {error && <Message message={error} variant="danger" />}
        <Form className="mt-4" onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="btn-dark" disabled={loading}>
            Login
          </Button>
        </Form>
        <p className="py-3">
          Don't have an account,{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </p>
      </Col>
    </Row>
  );
};

export default LoginScreen;
