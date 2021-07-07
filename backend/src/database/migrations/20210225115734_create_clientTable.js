
exports.up = function(knex) {
  return knex.schema.createTable('clients',(table)=>{
      table.string('client_id').primary();
      table.string('name').notNullable();
      table.string('company_id').notNullable();
      table.foreign('company_id').references('companies.company_id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('clients');
};
