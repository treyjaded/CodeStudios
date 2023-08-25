/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('posts', (table) => {
  table.increments('id').primary();
  table.integer('user_id').notNullable();
  table.foreign('user_id').references('id').inTable('users');
  table.string('content').notNullable();
  table.string('media_url').notNullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('posts');
