import React from "react";
import "../styles/DashboardScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../actions/profileAction";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import moment from "moment";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaGlobeAmericas,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";

const AuthorProfileScreen = ({ match }) => {
  const userId = match.params.id;
  console.log(userId);
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.getUserProfile);

  return loading ? (
    <div className='my-5'>
      <Loader />
    </div>
  ) : (
    <>
      {profile && (
        <>
          <div className='profilescreen'>
            <div className='profilescreen__userInfo'>
              <div className='profilescreen__userInfoContent'>
                <img src={profile.user.avatar} alt='' />
                <h3>{profile.user.name}</h3>
                <h4>{profile.status}</h4>
                <p>{profile.bio}</p>
                <div className='profilescreen__socialInfo'>
                  <span>{profile.posts && profile.posts.length} posts</span>
                  <span className='mx-4'>|</span>
                  <div className='socials'>
                    <a href={profile.website} target='_blank' rel='noreferrer'>
                      <FaGlobeAmericas className='socialIcons' />
                    </a>
                    {profile.social.twitter && (
                      <a
                        href={profile.social.twitter}
                        target='_blank'
                        rel='noreferrer'>
                        <FaTwitterSquare className='socialIcons' />
                      </a>
                    )}
                    {profile.social.facebook && (
                      <a
                        href={profile.social.facebook}
                        target='_blank'
                        rel='noreferrer'>
                        <FaFacebookSquare className='socialIcons' />
                      </a>
                    )}
                    {profile.social.linkedin && (
                      <a
                        href={profile.social.linkedin}
                        target='_blank'
                        rel='noreferrer'>
                        <FaLinkedin className='socialIcons' />
                      </a>
                    )}
                    {profile.social.github && (
                      <a
                        href={profile.social.github}
                        target='_blank'
                        rel='noreferrer'>
                        <FaGithubSquare className='socialIcons' />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Container className='my-5'>
            <Row>
              <Col md={10} className='mx-auto'>
                {profile.posts.map((post) => (
                  <Card key={post._id} className='mb-4 post_card'>
                    <Card.Img
                      variant='top'
                      className='post_img'
                      src={post.thumbnail}
                    />
                    <Card.Body>
                      <Link
                        to={`/post/${post._id}`}
                        style={{ color: "#373a3c" }}>
                        <h1 className='post_title'>{post.title}</h1>
                      </Link>
                      <div className='pb-2'>
                        <p className='text-muted post_readTime'>
                          <small>{post.readTime}</small>
                        </p>
                      </div>
                      <div className='post_bottom'>
                        <img className='avatar' src={post.avatar} alt='' />
                        <Link to={`/author/${post.user}`}>
                          <p
                            className='post_author'
                            onClick={() =>
                              dispatch(getUserProfileAction(post.user))
                            }>
                            {post.author}
                          </p>
                        </Link>
                        <div>{moment(post.createdAt).fromNow()}</div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default AuthorProfileScreen;
