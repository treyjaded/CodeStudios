const knex = require('../knex');

class Like {
  static async getLikesByUserId(user_id) {
    const query = 'SELECT * FROM likes WHERE user_id = ?';
    const results = await knex.raw(query, [user_id]);
    return results.rows;
  }

  static async getAllLikes(post_id) {
    const query = 'SELECT * FROM likes WHERE post_id = ?';
    const results = await knex.raw(query, [post_id]);
    // console.log("RRESULT:", results.rows);
    return results.rows;
  }

  static async create(user_id, post_id) {
    try {
      const query = `INSERT INTO likes (user_id, post_id )
      VALUES (?, ?) RETURNING *`;
      const results = await knex.raw(query, [user_id, post_id]);
      return results.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteLike(id) {
    const query = 'DELETE FROM likes WHERE id = ?';
    const results = await knex.raw(query, [id]);
    console.log(` Like number: ${id} has been deleted! `, results.rows[0]);
    return results.rows[0];
  }
}
// const testModel = async () => {
//   const postObj = await Like.deleteLike(331);
//   console.log(postObj);
// };
// testModel();

module.exports = Like;
