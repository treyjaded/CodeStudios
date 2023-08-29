const getLikesByUserId = async (req, res) => {
  const {
    db: { Like },
    // body: { user_id },
    params: { user_id }
  } = req;

  // const like = await Like.getLikesByUserId(id);
  // res.send(like);
  try {

    const likes = await Like.getLikesByUserId(user_id);

    // console.log('Likes:', likes); // Log the retrieved likes for debugging

    if (!likes) {
      return res.sendStatus(404);
    }
    res.send(likes);
  } catch (err) {
    console.error('Error:', err);
    res.sendStatus(500);
  }
};

module.exports = getLikesByUserId;
