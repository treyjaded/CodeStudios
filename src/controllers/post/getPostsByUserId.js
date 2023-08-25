const getPostsByUserId = async (req, res) => {
  const {
    db: { Post },
    body: { user_id },
  } = req;

  const post = await Post.getPostsByUserId(user_id);
  res.send(post);
};

module.exports = getPostsByUserId;
