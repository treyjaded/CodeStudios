const knex = require('../knex');

class Post {
  static async getLikesByUserId(user_id) {
    const query = 'SELECT * FROM likes WHERE user_id = ?';
    const results = await knex.raw(query, [user_id]);
    return results.rows;
  }

  static async getAllPosts() {
    const query = 'SELECT * FROM posts';
    const results = await knex.raw(query);
    return results.rows;
  }

  static async getPostsByPostId(id) {
    const query = 'SELECT * FROM posts WHERE id = ?';
    const results = await knex.raw(query, [id]);
    return results.rows[0];
  }

  static async create(user_id, content, media_url) {
    try {
      const query = `INSERT INTO posts (user_id, content, media_url)
      VALUES (?, ?, ?) RETURNING *`;
      const results = await knex.raw(query, [user_id, content, media_url]);
      return results.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    return knex.raw('TRUNCATE users;');
  }
}
// const testModel = async () => {
//   const postObj = await Post.getLikesByUserId(2);
//   console.log(postObj);
// };
// testModel();

module.exports = Post;
