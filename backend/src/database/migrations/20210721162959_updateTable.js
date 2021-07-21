
exports.up = function(knex) {
    return knex.schema.table("users",(table)=>{
        table.renameColumn('isAmdmin', 'isAdmin')
    })
};

exports.down = function(knex) {
    return knex.schema.table("users",(table)=>{
        table.renameColumn('isAdmin', 'isAmdmin')
    })
};
