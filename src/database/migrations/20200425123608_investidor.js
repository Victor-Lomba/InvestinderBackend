
exports.up = function(knex) {
  return knex.schema.createTable('investidores', function(table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('telefone');
      table.string('bio');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('investidores');
};
