import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaLinkedinIn,
  FaTwitterSquare,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProfileAction } from "../actions/profileAction";
import Message from "../components/Message";

const EditProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [show, setShow] = useState(true);

  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const { loading: updateLoading, error, success } = useSelector(
    (state) => state.createProfile
  );
  const { profile, loading } = useSelector((state) => state.getProfile);

  useEffect(() => {
    setStatus(loading || !profile.status ? "" : profile.status);
    setBio(loading || !profile.bio ? "" : profile.bio);
    setWebsite(loading || !profile.website ? "" : profile.website);
    setTwitter(
      loading || !profile.social.twitter ? "" : profile.social.twitter
    );
    setFacebook(
      loading || !profile.social.facebook ? "" : profile.social.facebook
    );
    setLinkedin(
      loading || !profile.social.linkedin ? "" : profile.social.linkedin
    );
    setGithub(loading || !profile.social.github ? "" : profile.social.github);
  }, [dispatch, success, profile, loading]);

  const formData = {
    status,
    bio,
    website,
    twitter,
    facebook,
    linkedin,
    github,
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProfileAction(formData, history, true));
  };
  return (
    <div>
      <Row>
        <Col md={10} className='mx-auto'>
          <h1 className='text-primary'>Update Your Profile</h1>
          <div className='my-4' style={{ fontSize: "1.2rem" }}>
            <FaUser />{" "}
            <span className='ml-2'>
              Let's get some information to make your profile stand out
            </span>
          </div>
          {error && <Message message={error} variant='danger' />}
          {success && show && (
            <Alert variant='success' onClose={() => setShow(!show)} dismissible>
              Profile updated successfully
            </Alert>
          )}
          <Form className='mt-5' onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Control
                as='select'
                placeholder='Select Status'
                value={status}
                name='status'
                onChange={(e) => setStatus(e.target.value)}>
                <option value='0'>* Select Professional Status</option>
                <option value='Developer'>Developer</option>
                <option value='Junior Developer'>Junior Developer</option>
                <option value='Senior Developer'>Senior Developer</option>
                <option value='Manager'>Manager</option>
                <option value='Student or Learning'>Student or Learning</option>
                <option value='Instructor'>Instructor or Teacher</option>
                <option value='Intern'>Intern</option>
                <option value='Other'>Other</option>
              </Form.Control>
              <small>Give us an idea of where you are at in your career</small>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Website'
                value={website}
                name='website'
                onChange={(e) => setWebsite(e.target.value)}
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
                onChange={(e) => setBio(e.target.value)}
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
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <FaFacebookSquare className='socialIcon' />
                  <Form.Control
                    type='text'
                    placeholder='Facebook URL'
                    value={facebook}
                    name='facebook'
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <FaLinkedinIn className='socialIcon' />
                  <Form.Control
                    type='text'
                    placeholder='Linkedin URL'
                    value={linkedin}
                    name='linkedin'
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <FaGithubSquare className='socialIcon' />
                  <Form.Control
                    type='text'
                    placeholder='Github URL'
                    value={github}
                    name='github'
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </Form.Group>
              </div>
            )}
            <Button className='mr-2' type='submit' disabled={updateLoading}>
              Update
            </Button>
            <Link to='/dashboard'>
              <Button className='btn-light'>Go Back</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditProfileScreen;
