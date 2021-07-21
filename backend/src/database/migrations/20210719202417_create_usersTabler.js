
exports.up = function(knex) {
  return knex.schema.createTable("users",(table)=>{
      table.string("user_id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.boolean("isAmdmin").defaultTo(false);      
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
