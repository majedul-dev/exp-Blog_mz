import React, { useEffect } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addDisLikeAction,
  addLikeAction,
  getLikeDislikeAction,
} from "../actions/postsAction";

const LileDislike = ({ postId }) => {
  const dispatch = useDispatch();

  const { success, likes } = useSelector((state) => state.addLike);
  const { dislikeSuccess, dislikes } = useSelector((state) => state.addDisLike);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likesDislikes } = useSelector((state) => state.getLikesDislikes);

  useEffect(() => {
    dispatch(getLikeDislikeAction(postId));
  }, [dispatch, success, likes, postId, dislikeSuccess, dislikes]);

  const disLikeHandler = () => {
    dispatch(addDisLikeAction(postId));
  };

  return (
    <>
      <h4>Do you like the post or dislike!</h4>
      <div>
        {!userInfo && (
          <small style={{ color: "red" }}>
            Please login for like or dislike
          </small>
        )}
      </div>
      <div className='likeDislike_section'>
        <div className='like mr-3'>
          {likesDislikes &&
          likesDislikes.likes.find(
            (like) => userInfo && like === userInfo.id
          ) ? (
            <div className='like_LikeFill'>
              <span>{likesDislikes ? likesDislikes.totalLikes : 0}</span>
              <AiFillLike
                className='reactions mr-3 likeBtn'
                onClick={() => dispatch(addLikeAction(postId))}
              />
            </div>
          ) : (
            <div className='like_LikeOutlined'>
              <span>{likesDislikes ? likesDislikes.totalLikes : 0}</span>
              <AiOutlineLike
                className='reactions mr-3 likeBtn'
                onClick={() => dispatch(addLikeAction(postId))}
              />
            </div>
          )}
        </div>

        <div className='dislike'>
          {likesDislikes &&
          likesDislikes.disLikes.find(
            (dislike) => userInfo && dislike === userInfo.id
          ) ? (
            <div className='dislike_dislikeFill'>
              <span>{likesDislikes ? likesDislikes.totalDisLikes : 0}</span>
              <AiFillDislike
                className='reactions mr-3'
                onClick={disLikeHandler}
              />
            </div>
          ) : (
            <div className='dislike_dislikeOutlined'>
              <span>{likesDislikes ? likesDislikes.totalDisLikes : 0}</span>
              <AiOutlineDislike
                className='reactions mr-3'
                onClick={disLikeHandler}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LileDislike;
