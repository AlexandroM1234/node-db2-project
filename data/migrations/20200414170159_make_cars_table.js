exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("id");
    tbl.string("Make").notNullable();
    tbl.string("Model").notNullable();
    tbl.float("VIN").notNullable().unique();
    tbl.string("Transmission Type");
    tbl.string("Title");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
