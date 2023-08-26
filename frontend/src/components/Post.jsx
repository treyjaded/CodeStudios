import React, { useState, useContext, useEffect } from 'react';
import CurrentUserContext from "../contexts/current-user-context";
import LikeButton from './LikeButton.jsx';
import { createLike, deleteLike } from "../adapters/like-adapter";

const Post = ({ post, caption, media, likes }) => {
  const { currentUser, likesValue,  likesByPost, setLikesByPost, likeValue, setLikeValue } = useContext(CurrentUserContext);
  const [postStates, setPostStates] = useState({});
  
 // ------------- WHEN A USER CLICKS ON THE LIKE BUTTON ---------------
 const handleLike = async () => {
  const likedStatus = JSON.parse(localStorage.getItem(`likedStatus_${post.id}`)) || false;

  if (!likedStatus) {
    const [like, error] = await createLike({ user_id: currentUser.id, post_id: post.id });

    if (!error) {
      setLikeValue(like);

      // Update local storage to mark post as liked
      localStorage.setItem(`likedStatus_${post.id}`, JSON.stringify(true));

      // Increase the like count for the specific post
      setLikesByPost(prevLikesByPost => {
        const newLikesByPost = { ...prevLikesByPost[0] };
        newLikesByPost[post.id] = newLikesByPost[post.id] ? newLikesByPost[post.id] + 1 : 1;
        return [newLikesByPost];
      });
    }
  } else {
    if (likeValue && likeValue.id) {
      await deleteLike(likeValue.id);

      // Update local storage to mark post as unliked
      localStorage.setItem(`likedStatus_${post.id}`, JSON.stringify(false));

      // Update likeValue state to indicate unliked
      setLikeValue(null);

      // Decrease the like count for the specific post
      setLikesByPost(prevLikesByPost => {
        const newLikesByPost = { ...prevLikesByPost[0] };
        newLikesByPost[post.id] = newLikesByPost[post.id] > 0 ? newLikesByPost[post.id] - 1 : 0;
        return [newLikesByPost];
      });
    }
  }
};


  
  return (
    <div className="post">
      <img src={media} alt="Post" />
      <p className="caption">{caption}</p>
      <LikeButton isActive={postStates[post.id] ? true : false} likes={likes} handleLike={handleLike} post ={post} />
    </div>
  );
};

export default Post;

/*


*/
