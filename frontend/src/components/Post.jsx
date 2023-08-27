import React, { useState, useContext, useEffect } from 'react';
import CurrentUserContext from "../contexts/current-user-context";
import LikeButton from './LikeButton.jsx';
import { createLike, deleteLike, isPostLiked } from "../adapters/like-adapter";

const Post = ({ post, caption, media, likes }) => {
  const { currentUser, setLikesByPost, likeValue, setLikeValue } = useContext(CurrentUserContext);
  const [postStates, setPostStates] = useState({});
  const [active, setActiveState] = useState([])
 
 // ------------- WHEN A USER CLICKS ON THE LIKE BUTTON ---------------
 const handleLike = async () => {
  const user_id = currentUser.id;
  const post_id = post.id;
  let isLikedResponse = await isPostLiked(currentUser.id, post.id )
  setActiveState(isLikedResponse[0])
  // const isLiked = isLikedResponse[0].isLiked;
  // const like_id = isLikedResponse[0].like_id;
  console.log(active);
  try {
   

    if ( active === null) {
      // If the post is not liked, create a like
      setActiveState(false)
      console.log(active);
      console.log("LIKE")
      const [like, error] = await createLike({ user_id, post_id });
      if (!error) {
        setLikeValue(like);
        setLikesByPost(prevLikesByPost => {
          const newLikesByPost = { ...prevLikesByPost[0] };
          newLikesByPost[post.id] = newLikesByPost[post.id] ? newLikesByPost[post.id] + 1 : 1;
          return [newLikesByPost];
        });
      }
    } else if (active === false){

      console.log("DELETE")
      console.log(active);
      // If the post is liked, delete the like
      setLikeValue(null);
      setLikesByPost(prevLikesByPost => {
        const newLikesByPost = { ...prevLikesByPost[0] };
        newLikesByPost[post.id] = newLikesByPost[post.id] > 0 ? newLikesByPost[post.id] - 1 : 0;
        return [newLikesByPost];
      });
      // await deleteLike(active.like_id);
    }
  } catch (error) {
    console.error(error);
  }
};




  
  return (
    <div className="post">
      <img src={media} alt="Post" />
      <p className="caption">{caption}</p>
      <LikeButton likes={likes} handleLike={handleLike} post ={post} />
    </div>
  );
};

export default Post;

/*


*/
