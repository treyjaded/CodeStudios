const getPostsByUserId = async (req, res) => {
  const {
    db: { Post },
    body: { user_id },
  } = req;

  const post = await Post.getPostsByUserId(user_id);
  res.send(post);
};

module.exports = getPostsByUserId;

//in my posts, should have data about all users that have liked this post. 