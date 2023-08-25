import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createPost } from "../adapters/post-adapter";

export default function NewPostForm() {
  const { currentUser, postData, setPostData } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [content, setContent] = useState('');

  // if (!currentUser) return <> </>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!content) return setErrorText('Upload a picture');

    // Used to actually  create the post. Sends data back to sever.
    const [post, error] = await createPost({ user_id: currentUser.id, content, media_url: '' });
    if (error) return setErrorText(error.statusText);
    const data = [...postData, post];
    setPostData(data);
    // Re renders the new data that is coming in and adds to the home page.
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'content') setContent(value);
  };
  // console.log("current user:", currentUser);
  return (
    <>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label htmlFor="content">content</label>
        <input
          autoComplete="off"
          type="text"
          id="content"
          name="content"
          onChange={handleChange}
          value={content}
        />
        <button>Post</button>
      </form>
      {!!errorText && <p>{errorText}</p>}
    </>
  );
}
