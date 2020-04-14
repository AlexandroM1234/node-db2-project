exports.up = function (knex) {
  return knex.schema.table("cars", (tbl) => {
    tbl.float("VIN");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
