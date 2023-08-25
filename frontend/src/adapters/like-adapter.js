import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/likes';
// base Url that we will fetch from.

export const createLike = async ({ user_id, post_id }) => (
  fetchHandler(baseUrl, getPostOptions({ user_id, post_id }))
);

export const getAllLikes = async (post_id) => fetchHandler(`${baseUrl}/${post_id}`);

export const getLike = async (id) => fetchHandler(`${baseUrl}/${id}`);
