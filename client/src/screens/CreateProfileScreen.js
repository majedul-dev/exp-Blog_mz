import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  FaUser,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedinIn,
  FaGithubSquare,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  createProfileAction,
  getProfileAction,
} from "../actions/profileAction";
import Message from "../components/Message";

const CreateProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    bio: "",
    website: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    github: "http://github.com",
  });

  const {
    status,
    bio,
    website,
    twitter,
    facebook,
    linkedin,
    github,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { loading, error } = useSelector((state) => state.createProfile);
  const { profile } = useSelector((state) => state.getProfile);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProfileAction(formData, history));
  };

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  return (
    <div>
      {profile ? (
        <Redirect to='/edit-profile' />
      ) : (
        <Row>
          <Col md={10} className='mx-auto'>
            <h1 className='text-primary' style={{ fontWeight: "600" }}>
              Create Your Profile
            </h1>
            <div className='my-4' style={{ fontSize: "1.2rem" }}>
              <FaUser />{" "}
              <span className='ml-2'>
                Let's get some information to make your profile stand out
              </span>
            </div>
            {error && <Message message={error} variant='danger' />}
            <Form className='mt-5' onSubmit={onSubmitHandler}>
              <Form.Group>
                <Form.Control
                  as='select'
                  placeholder='Select Status'
                  value={status}
                  name='status'
                  onChange={(e) => onChange(e)}>
                  <option value='0'>* Select Professional Status</option>
                  <option value='Developer'>Developer</option>
                  <option value='Junior Developer'>Junior Developer</option>
                  <option value='Senior Developer'>Senior Developer</option>
                  <option value='Manager'>Manager</option>
                  <option value='Student or Learning'>
                    Student or Learning
                  </option>
                  <option value='Instructor'>Instructor or Teacher</option>
                  <option value='Intern'>Intern</option>
                  <option value='Other'>Other</option>
                </Form.Control>
                <small>
                  Give us an idea of where you are at in your career
                </small>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type='text'
                  placeholder='Website'
                  value={website}
                  name='website'
                  onChange={(e) => onChange(e)}
                />
                <small>Could be your own or a company website</small>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='A short bio of yourself'
                  value={bio}
                  name='bio'
                  onChange={(e) => onChange(e)}
                />
                <small>Tell us a little about yourself</small>
              </Form.Group>
              <div className='my-5'>
                <Button
                  type='button'
                  className='btn-light mr-4'
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                  Add Social Network Links
                </Button>
                <span>Optional</span>
              </div>

              {displaySocialInputs && (
                <div className='socialInputs mb-5'>
                  <Form.Group>
                    <FaTwitterSquare className='socialIcon' />
                    <Form.Control
                      type='text'
                      placeholder='Twitter URL'
                      value={twitter}
                      name='twitter'
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <FaFacebookSquare className='socialIcon' />
                    <Form.Control
                      type='text'
                      placeholder='Facebook URL'
                      value={facebook}
                      name='facebook'
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <FaLinkedinIn className='socialIcon' />
                    <Form.Control
                      type='text'
                      placeholder='Linkedin URL'
                      value={linkedin}
                      name='linkedin'
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <FaGithubSquare className='socialIcon' />
                    <Form.Control
                      type='text'
                      placeholder='Github URL'
                      value={github}
                      name='github'
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                </div>
              )}
              <Button className='mr-2' type='submit' disabled={loading}>
                Submit
              </Button>
              <Link to='/dashboard'>
                <Button className='btn-light'>Go Back</Button>
              </Link>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CreateProfileScreen;
