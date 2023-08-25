const knex = require('../knex');
const { hashPassword, isValidPassword } = require('../../utils/auth-utils');

class User {
  #passwordHash = null; // a private property

  constructor({ id, username, password_hash, profile_image_url }) {
    this.id = id;
    this.username = username;
    this.profile_image_url = profile_image_url;
    this.#passwordHash = password_hash;
  }

  static async list() {
    const query = 'SELECT * FROM users';
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const { rows: [user] } = await knex.raw(query, [id]);
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const { rows: [user] } = await knex.raw(query, [username]);
    return user ? new User(user) : null;
  }

  static async create(username, password, profile_image_url) {
    const passwordHash = await hashPassword(password);

    const query = `INSERT INTO users (username, password_hash, profile_image_url)
      VALUES (?, ?, ?) RETURNING *`;
    const { rows: [user] } = await knex.raw(query, [username, passwordHash, "profile_image_url"]);

    // const result = await knex.raw(query, [username, passwordHash, profile_image_url]);
    // const rows = result.rows
    // const user = rows[0];
    return new User(user);
  }

  static async deleteAll() {
    return knex.raw('TRUNCATE users;');
  }

  update = async (username) => { // dynamic queries are easier if you add more properties
    const [updatedUser] = await knex('users')
      .where({ id: this.id })
      .update({ username })
      .returning('*');
    return updatedUser ? new User(updatedUser) : null;
  };

  isValidPassword = async (password) => (
    isValidPassword(password, this.#passwordHash)
  );
}
// const testModel = async () => {
//   const userObj = await User.create('Test User 9', '123', 'profile_image_url 2');
//   console.log(userObj);
//   console.log(userObj.isValidPassword('123'))
// };
// testModel();
module.exports = User;
