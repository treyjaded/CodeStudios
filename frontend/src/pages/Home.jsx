import React from 'react';
import { useContext, useState, useEffect } from "react";
import Post from '/Users/jaded/Development/codeStudios/frontend/src/components/Post.jsx';
import CurrentUserContext from "../contexts/current-user-context";
import { getAllPosts } from "../adapters/post-adapter";
import { createLike, getAllLikes } from "../adapters/like-adapter";

import NewPostForm from '../components/NewPostForm';

export default function HomePage() {
  const { currentUser,likesByPost, setLikesByPost, postData, setPostData, likesData, setLikesData } = useContext(CurrentUserContext);
  const username = currentUser?.username

  // Create a hash map to store the counts
  const likesCountArray = []
  const likesCountMap = {};
  

  useEffect(() => {
    getAllPosts().then(setPostData);
  }, []);
  // console.log("POST DATA", postData)

  // --------------------- Shows ALL of the Likes on each separate Post. ------------------------------
  useEffect(() => {
    postData.map((p) => {
      getAllLikes(p.id).then((data) => {
        setLikesData(data);
        // Initialize the likes count for the current post to 0
        likesCountMap[p.id] = 0;
        // Iterate through each object in the likesData array
        for (const like of data[0]) {
          const { post_id } = like;
          // Check if the post_id is not already a key in the map
          if (!likesCountMap.hasOwnProperty(post_id)) {
            // Initialize the value based on whether the post_id value is an empty array

            likesCountMap[post_id] = Array.isArray(like.value) && like.value.length === 0 ? 0 : 1;
            //(condition) ? (if true, do this) : (otherwise, do this)

          } else {
            // If the post_id is already a key, increment the count
            likesCountMap[post_id]++;
          }
        }
        //Update the counts of the likes
        setLikesByPost(likesCountArray)
      })
    })
    //Push it into an array
    likesCountArray.push(likesCountMap)

  }, [postData]);

  for (const key in likesByPost[0]) {
    if (likesByPost[0].hasOwnProperty(key)) {
      let value = likesByPost[0][key];
      // console.log(`Post Id: ${key}, Number of Likes: ${value}`);
    }
  }

  return (
    <div className="app">
      <h1>{username}'s feed</h1>
      <NewPostForm />
      <div className="posts">
        {likesData !== undefined && (
          postData.map((post) => {
            const likeCount = likesByPost[0] ? likesByPost[0][post.id] : 0;
            return (
              <Post
                key={post.id}
                post={post}
                caption={post.content}
                media={post.media_url}
                likes={likeCount}
              />
            );
          })
        )}
      </div>
    </div>
  );
  
}

