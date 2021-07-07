
exports.up = function(knex) {
  return knex.schema.createTable('locations',(table)=>{
      table.string('loc_id').primary();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('client_id').notNullable();
      table.foreign('client_id').references('clients.client_id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations');
};
