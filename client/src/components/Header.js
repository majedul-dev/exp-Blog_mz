import React, { useEffect } from "react";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, logoutUser } from "../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <div className='container'>
        <LinkContainer to='/'>
          <Navbar.Brand>exp-BLOG</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mx-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {!userInfo ? (
              <LinkContainer to='/login'>
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            ) : (
              <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                <LinkContainer to='/dashboard'>
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/posts'>
                  <NavDropdown.Item>My Posts</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(logoutUser())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-light'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
