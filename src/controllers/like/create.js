const createLike = async (req, res) => {
  //create a a request object that contians the data within our database
  const {
    session,
    db: { Like },
    body: { user_id, post_id }, // this req.body property is put here by the client
  } = req;

  const like = await Like.create(user_id, post_id);

  res.send(like);
};

module.exports = createLike;
