
exports.up = function(knex) {
  return knex.schema.createTable('techs',(table)=>{
      table.string('tech_id').primary();
      table.string('name').notNullable();
      table.string('cpf').notNullable();
      table.string('rg').notNullable();
      table.string('phone').notNullable();
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('account').notNullable();
      table.boolean('hasDifferentValues').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('techs');
};
