import React, { useState, useContext,useEffect } from 'react';
import CurrentUserContext from "../contexts/current-user-context";

const LikeButton = ({ likes, handleLike, isActive }) => {
  const [localIsActive, setLocalIsActive] = useState(false);

  // Load liked status from local storage on component mount
  // useEffect(() => {
  //   const likedStatus = JSON.parse(localStorage.getItem(`likedStatus_${post.id}`)) || false;
  //   setLocalIsActive(likedStatus);
  // }, [post.id]);

  const toggleLike = () => {
    handleLike();

    // // Update local storage and localIsActive
    // const newLikedStatus = !localIsActive;
    // localStorage.setItem(`likedStatus_${post.id}`, JSON.stringify(newLikedStatus));
    // setLocalIsActive(newLikedStatus);
  };

  return (
    <div className='like-button' >
      <button onClick={toggleLike}>
        <svg className={`heart-icon ${isActive ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 16.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 7.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
