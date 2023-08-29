import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils";

const baseUrl = '/api/likes';
// base Url that we will fetch from.

//Creates a Like for a post--------------------------------
export const createLike = async ({ user_id, post_id }) => (
  fetchHandler(baseUrl, getPostOptions({ user_id, post_id }))
);

//Gets a Like from a specfic post --------------------------------
export const getAllLikes = async (post_id) => fetchHandler(`${baseUrl}/${post_id}`);

//Deletes a Like from a specfic post --------------------------------{
export const deleteLike = async (like_id) => {
  fetchHandler(`${baseUrl}/${like_id}`, deleteOptions);
  return true;
}
export const isPostLiked = async (user_id, post_id) => fetchHandler(`api/users/${user_id}/posts/${post_id}/liked`)

export const getLikesByUserId = async (user_id) => fetchHandler(`/api/posts/likedBy/${user_id}`);
// /api/posts/likedBy/2
