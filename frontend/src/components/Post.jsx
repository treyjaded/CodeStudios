import React, { useState, useContext, useEffect } from 'react';
import CurrentUserContext from "../contexts/current-user-context";
import LikeButton from './LikeButton.jsx';
import { createLike } from "../adapters/like-adapter";

const Post = ({ post, caption, media, likes }) => {
  const { currentUser, postData, likesData, setLikesData, likesByPost, setLikesByPost, isActive, setIsActive } = useContext(CurrentUserContext);
  const [postStates, setPostStates] = useState({});

  //What happens When a User Clicks Like? -----------
  const handleLike = async () => {
    const [like, error] = await createLike({ user_id: currentUser.id, post_id: post.id })
    if (!error) {
      setLikesByPost(prevLikesByPost => {
        const newLikesByPost = { ...prevLikesByPost[0] };
        // Increase the like count for the specific post
        newLikesByPost[post.id] = newLikesByPost[post.id] ? newLikesByPost[post.id] + 1 : 1;
        return [newLikesByPost];
      });
      setPostStates(prevStates => ({
        ...prevStates,
        [post.id]: !prevStates[post.id]
      }));

    }

  };

  return (
    <div className="post">
      <img src={media} alt="Post" />
      <p className="caption">{caption}</p>
      <LikeButton   isActive={postStates[post.id] || false} likes={likes} handleLike={handleLike} />
    </div>
  );
};

export default Post;

/*
Get ALlLikesByPost in Home
Create a hash map of post id : # of likes 
Pass Likes to each post 
Is it checked?


likesByPost.map(likeData => {
        const postId = Object.keys(likeData); // Extract the post ID
        const likeCount = Object.values(likeData); // Extract the like count
*/
