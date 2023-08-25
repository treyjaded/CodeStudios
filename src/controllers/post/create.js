const createPost = async (req, res) => {
  //create a a request object that contians the data within our database
  const {
    session, // this req.session property is put here by the handleCookieSessions middleware
    db: { Post }, // this req.db.User property is put here by the addModelsToRequest middleware
    body: { user_id, content, media_url }, // this req.body property is put here by the client
  } = req;

  const post = await Post.create(user_id, content, media_url);
  res.send(post);
};

module.exports = createPost;
