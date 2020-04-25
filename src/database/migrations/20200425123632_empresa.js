
exports.up = function(knex) {
  return knex.schema.createTable('consultor', function(table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('telefone');
      table.string('bio');
      table.string('pic');
      table.json('matches');
  });
}

exports.down = function(knex) {
  return knex.schema.dropTable('consultor');
};
