const getAllLikes = async (req, res) => {
  const {
    db: { Like },
    params: { post_id },
  } = req;

  try {
    // console.log('Calling getAllLikes method with post_id:', post_id);

    const likes = await Like.getAllLikes(post_id);

    console.log('Likes:', likes); // Log the retrieved likes for debugging

    if (!likes) {
      return res.sendStatus(404);
    }
    res.send(likes);
  } catch (err) {
    console.error('Error:', err);
    res.sendStatus(500);
  }
};

module.exports = getAllLikes;

// Get all likes by a particualar post id
