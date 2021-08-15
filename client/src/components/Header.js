import React, { useEffect } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, logoutUser } from "../actions/userAction";

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <div className="container">
        <LinkContainer to="/">
          <Navbar.Brand>exp-BLOG</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto search-form">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2 searchbar"
              aria-label="Search"
            />
            <Button variant="light" className="search-btn">
              <BsSearch />
            </Button>
          </Form>
          <Nav className="ml-auto">
            <LinkContainer to="/">
              <Nav.Link>Blogs</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <>
                <img
                  src={userInfo.avatar.url}
                  alt="avatar"
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: "100%",
                    marginLeft: "1rem",
                  }}
                />
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/posts">
                    <NavDropdown.Item>My Posts</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => dispatch(logoutUser())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
