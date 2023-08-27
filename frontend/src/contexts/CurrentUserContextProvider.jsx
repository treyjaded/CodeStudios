import { useState } from 'react';
import CurrentUserContext from './current-user-context';

//Using the context to define our data and the provider. The provider gives that data to its children. 

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [postData, setPostData] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [likesByPost, setLikesByPost] = useState([])
  const [likeValue, setLikeValue] = useState(false);
  //Control a class dynamically using React state
  const [isActive, setIsActive] = useState([]);

  const context = { currentUser, setCurrentUser, postData, setPostData, likesData, setLikesData, likesByPost, setLikesByPost, isActive, setIsActive,likeValue, setLikeValue };
  console.log();
  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
/*
      {
    image: 'https://via.placeholder.com/300',
    caption: 'Enjoying the beach! 🏖️',
    likes: 12,
  },
  {
    image: 'https://via.placeholder.com/300',
    caption: 'Enjoying the beach! 🏖️',
    likes: 15,
  },
  {
    image: 'https://via.placeholder.com/300',
    caption: 'Woah the beach! 🏖️',
    likes: 5,
  },
  // Add more posts as needed
    */
