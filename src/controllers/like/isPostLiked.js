const knex = require('/Users/jaded/Development/codeStudios/src/db/knex.js'); // Import your Knex instance


const isPostLiked = async (req, res) => {
  const { user_id, post_id } = req.params;
  const { id } = req.body;

  try {
    const like = await knex('likes')
      .where({ user_id, post_id })
      .first();

    const isLiked = !!like; // If like is found, it's liked

    if (isLiked) {
      const { user_id, post_id, id } = like;
      return res.json({ isLiked, user_id, post_id, id }); // Return User Id, Like Id and Post Id
    } else {
      return res.json({ isLiked }); //Otherwise just return status
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = isPostLiked;
