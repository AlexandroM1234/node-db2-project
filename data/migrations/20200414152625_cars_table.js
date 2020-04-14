exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("VIN");
    tbl.string("Make", 255).notNullable().unique().index();
    tbl.string("Model", 255).notNullable().unique().index();
    tbl.string("Transmission Type");
    tbl.string("Title");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
