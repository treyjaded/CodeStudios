import React, { useState, useContext, useEffect } from 'react';
import CurrentUserContext from "../contexts/current-user-context";
import LikeButton from './LikeButton.jsx';
import { createLike, deleteLike, isPostLiked, getLikesByUserId } from "../adapters/like-adapter";

const Post = ({ post, caption, media, likes }) => {
  const { currentUser, setLikesByPost, likeValue, setLikeValue } = useContext(CurrentUserContext);
  const [postStates, setPostStates] = useState({});
  const [active, setActiveState] = useState([])
//  console.log(currentUser.id)
 // ------------- WHEN A USER CLICKS ON THE LIKE BUTTON ---------------
 const handleLike = async () => {
  try {
    // Get the user's likes data
    const likesData = await getLikesByUserId(currentUser.id);

    // Find the like data for the current post (if exists)
    const likeData = likesData[0].find(like => like.post_id === post.id);
    console.log("likeData:", likeData)

    if (!likeData) {
      // User hasn't liked the post yet, so create a new like
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
      // User has already liked the post, so unlike it
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
  } catch (error) {
    console.error(error);
  }
};



// console.log(usersThatLikedPost)
  return (
    <div className="post">
      <img src={media} alt="Post" />
      <p className="caption">{caption}</p>
      {/* {currentUser && currentUser.id in usersThatLikedPost ? (<h2>Already Liked</h2>) : (<h2>Not Liked</h2>)}  */}
      <LikeButton likes={likes} handleLike={handleLike} post ={post}  isActive={postStates[post.id] || false}
 />
    </div>
  );
};

export default Post;

/*
      Checks if the user exist already then check their id in
      {currentUser && currentUser.id in usersThatLikedPost ? (<h2>Already Liked</h2>) : (<h2>Not Liked</h2>)} 
      

*/
