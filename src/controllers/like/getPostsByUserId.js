const getLikesByUserId = async (req, res) => {
  const {
    db: { Like },
    body: { user_id },
  } = req;

  const like = await Like.getLikesByUserId(user_id);
  res.send(like);
};

module.exports = getLikesByUserId;
