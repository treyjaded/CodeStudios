const knex = require('/Users/jaded/Development/codeStudios/src/db/knex.js'); // Import your Knex instance

async function updateLike(req, res) {
  const { id } = req.params;
  const { is_liked } = req.body;

  try {
    const updatedLike = await knex('likes')
      .where('id', id)
      .update({ is_liked: is_liked }, ['id', 'is_liked']);

    return updatedLike[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}