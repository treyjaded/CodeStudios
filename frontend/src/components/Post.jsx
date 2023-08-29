import React, { useState, useContext, useEffect } from 'react';
import CurrentUserContext from "../contexts/current-user-context";
import LikeButton from './LikeButton.jsx';
import { createLike, deleteLike, getLikesByUserId } from "../adapters/like-adapter";

const Post = ({ post, caption, media, likes }) => {
  const { currentUser, setLikesByPost } = useContext(CurrentUserContext);
  const [postStates, setPostStates] = useState({});

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const likesData = await getLikesByUserId(currentUser.id);
        const userLikedPosts = likesData[0].map(like => like.post_id);

        const newPostStates = {};
        userLikedPosts.forEach(postId => {
          newPostStates[postId] = true;
        });

        setPostStates(newPostStates);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedStatus();
  }, [currentUser?.id]);

  const handleLike = async () => {
    try {
      if (!postStates[post.id]) {
        // Create a new like
        const [like, error] = await createLike({ user_id: currentUser.id, post_id: post.id });

        if (!error) {
          // Update the state to indicate the post is liked
          setPostStates(prevStates => ({
            ...prevStates,
            [post.id]: true
          }));

          // Increment the likes count
          setLikesByPost(prevLikesByPost => {
            const newLikesByPost = { ...prevLikesByPost[0] };
            newLikesByPost[post.id] = newLikesByPost[post.id] ? newLikesByPost[post.id] + 1 : 1;
            return [newLikesByPost];
          });
        }
      } else {
        // Unlike the post
        const likesData = await getLikesByUserId(currentUser.id);
        const likeData = likesData[0].find(like => like.post_id === post.id);

        if (likeData) {
          await deleteLike(likeData.id);

          // Update the state to indicate the post is unliked
          setPostStates(prevStates => ({
            ...prevStates,
            [post.id]: false
          }));

          // Decrement the likes count
          setLikesByPost(prevLikesByPost => {
            const newLikesByPost = { ...prevLikesByPost[0] };
            newLikesByPost[post.id] = newLikesByPost[post.id] > 0 ? newLikesByPost[post.id] - 1 : 0;
            return [newLikesByPost];
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post">
      <img src={media} alt="Post" />
      <p className="caption">{caption}</p>
      <LikeButton isActive={postStates[post.id] || false} likes={likes} handleLike={handleLike} />
    </div>
  );
};

export default Post;
