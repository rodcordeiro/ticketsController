
exports.up = function(knex) {
  return knex.schema.createTable('companies',(table)=>{
      table.increments('company_id').primary();
      table.string('name').notNullable();
      table.string('currency').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.droptTable('companies');
};
