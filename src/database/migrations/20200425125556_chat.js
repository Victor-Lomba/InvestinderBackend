
exports.up = function(knex) {
    return knex.schema.createTable('chat', function(table){
        table.string('chat_id').primary();
        table.string('investidor_id').notNullable();
        table.foreign('investidor_id').references('id').inTable('investidores');
        table.string('empresa_id').notNullable();
        table.foreign('empresa_id').references('id').inTable('consultores');
        table.json('messages').nullable();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('chat');
};
