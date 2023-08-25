const getAllPosts = async (req, res) => {
  const {
    db: { Post },
  } = req;

  const post = await Post.getAllPosts();
  res.send(post);
};

module.exports = getAllPosts;
