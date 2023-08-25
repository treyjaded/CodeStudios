import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/posts';
// base Url that we will fetch from

// Create Post takes in this body and sends a request
export const createPost = async ({ user_id, content, media_url }) => (
  fetchHandler(baseUrl, getPostOptions({ user_id, content, media_url }))
);

export const getAllPosts = async () => {
  const [posts] = await fetchHandler(baseUrl);
  return posts || [];
};

export const getPost = async (id) => fetchHandler(`${baseUrl}/${id}`);
