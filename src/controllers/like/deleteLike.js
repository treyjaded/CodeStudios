const deleteLike = async (req, res) => {
  const {
    db: { Like },
    params: { like_id },
  } = req;

  await Like.deleteLike(like_id);
  console.log(`Like has been deleted successfully`)
  res.sendStatus(204);
};

module.exports = deleteLike;
