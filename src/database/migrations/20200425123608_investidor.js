
exports.up = function(knex) {
  return knex.schema.createTable('investidores', function(table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('telefone').nullable();
      table.string('bio').nullable();
      table.string('interesses').nullable();
      table.string('pic').nullable();
      table.json('likes').nullable();
      table.json('dislikes').nullable();
      table.json('matches').nullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('investidores');
};
