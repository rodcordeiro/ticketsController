
exports.up = function(knex) {
  return knex.schema.createTable('contacts',(table)=>{
      table.string('contact_id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('phone').notNullable();
      table.string('loc_id').notNullable();
      table.foreign('loc_id').references('locations.loc_id');
  })
};

exports.down = function(knex) {
  return knex.schema.droptTable('contacts');
};
