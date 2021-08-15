import React, { useEffect, useState } from "react";
import "../styles/DashboardScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getProfileAction } from "../actions/profileAction";
import Loader from "../components/Loader";
import noImg from "../images/avatar-dimention.png";
import {
  getUserDetails,
  updateUserAction,
  profilePicUpdateAction,
} from "../actions/userAction";
import {
  FaUser,
  FaGlobeAmericas,
  FaTwitterSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getMyOwnPosts } from "../actions/postsAction";

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");
  const [updateUser, setUpdateUser] = useState(false);

  const { profile, loading } = useSelector((state) => state.getProfile);
  const { successProfilePic } = useSelector(
    (state) => state.updateUserProfilePictur
  );
  const { success } = useSelector((state) => state.updateUser);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { posts } = useSelector((state) => state.myOwnPosts);
  const { userInfo: user, loading: userLoading } = useSelector(
    (state) => state.userDetails
  );

  const profilePicFormData = new FormData();
  profilePicFormData.append("avatar", avatar);

  const userUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAction({ name, email }));
  };

  const profilePicSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(profilePicUpdateAction(profilePicFormData));
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    dispatch(getProfileAction());
    dispatch(getMyOwnPosts());
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, userInfo, history, success, successProfilePic]);

  return (
    <>
      {loading ? (
        <div className="my-5">
          <Loader />
        </div>
      ) : (
        <>
          {profile ? (
            <div className="profilescreen">
              <div className="profilescreen__userInfo">
                <div className="profilescreen__userInfoContent">
                  <img src={profile.user.avatar.url} alt="" />
                  <h3>{profile.user.name}</h3>
                  <h4>{profile.status}</h4>
                  <p>{profile.bio}</p>
                  <div className="profilescreen__socialInfo">
                    <span>{posts && posts.length} posts</span>
                    <span className="mx-4">|</span>
                    <div className="socials">
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGlobeAmericas className="socialIcons" />
                      </a>
                      {profile.social.twitter && (
                        <a
                          href={profile.social.twitter}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaTwitterSquare className="socialIcons" />
                        </a>
                      )}
                      {profile.social.facebook && (
                        <a
                          href={profile.social.facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaFacebookSquare className="socialIcons" />
                        </a>
                      )}
                      {profile.social.linkedin && (
                        <a
                          href={profile.social.linkedin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaLinkedin className="socialIcons" />
                        </a>
                      )}
                      {profile.social.github && (
                        <a
                          href={profile.social.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaGithubSquare className="socialIcons" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Container className="py-3 my-3">
                <Row>
                  <Col md={6}>
                    <h1 className="mb-4 text-primary">Update User</h1>
                    <p className="lead">
                      Toggle the button for getting the form of user details
                      inorder to update your profile picture, name or email.
                    </p>
                    <div className="my-4">
                      {updateUser ? (
                        <Button
                          className="btn-info"
                          onClick={() => setUpdateUser(!updateUser)}
                        >
                          Hide Update Fields
                        </Button>
                      ) : (
                        <Button
                          className="btn-info"
                          onClick={() => setUpdateUser(!updateUser)}
                        >
                          Show update Fields
                        </Button>
                      )}
                    </div>

                    {updateUser && (
                      <>
                        <div className="mb-2">
                          {image ? (
                            <img
                              src={image}
                              alt="Choosen"
                              style={{ height: "150px", marginTop: "2rem" }}
                            />
                          ) : (
                            <img
                              src={noImg}
                              alt="no-img"
                              style={{
                                height: "150px",
                                width: "140px",
                                marginTop: "2rem",
                              }}
                            />
                          )}
                        </div>
                        <Form
                          className="mb-3"
                          onSubmit={profilePicSubmitHandler}
                        >
                          <Form.Group>
                            <Form.File
                              id="profilePic"
                              label="Choose image for the profile picture"
                              accept=".jpg, .png, .jpeg"
                              name="avatar"
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Button type="submit">Upload</Button>
                        </Form>
                        <Form className="mb-5" onSubmit={userUpdateHandler}>
                          <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter new name"
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter new email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                          <Button type="submit" className="">
                            Update
                          </Button>
                        </Form>
                      </>
                    )}
                    <hr />
                  </Col>
                  <Col md={6}>
                    <h1 className="mb-4 text-primary">Update Profile</h1>
                    <p className="lead">
                      Update profile that you had created after register your
                      account. You are able to customize your information that
                      you have enterd once.
                    </p>
                    <Link to="/edit-profile">
                      <Button onClick={() => dispatch(getProfileAction())}>
                        Edit Profile
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <p className="lead">
                      Navigate to your posts page and manage with create, update
                      or delete.
                    </p>
                  </Col>
                </Row>
                <Link to="/posts">
                  <Button>My Posts</Button>
                </Link>
              </Container>
            </div>
          ) : (
            <Container className="py-2 my-5">
              <h1 className="text-primary" style={{ fontWeight: "800" }}>
                Dashboard
              </h1>
              {userLoading ? (
                <p>Loading...</p>
              ) : (
                <h4 className="my-4">
                  <FaUser />
                  <strong className="ml-2">
                    Welcome, {userInfo && userInfo.name}!
                  </strong>
                </h4>
              )}
              <p>You have not yet setup a profile, please add some info!</p>
              <Link to="/create-profile">
                <Button>Create Profile</Button>
              </Link>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default DashboardScreen;
