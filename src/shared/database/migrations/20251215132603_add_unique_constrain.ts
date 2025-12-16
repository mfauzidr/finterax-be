import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("bo_categories", function (t) {
    t.unique("name");
  });
  await knex.schema.alterTable("bo_sub_categories", function (t) {
    t.unique("name");
  });
  await knex.schema.alterTable("bo_units", function (t) {
    t.unique("name");
  });
  await knex.schema.alterTable("bo_products", function (t) {
    t.unique(["name", "code"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("bo_categories", function (t) {
    t.dropUnique(["name"]);
  });
  await knex.schema.alterTable("bo_sub_categories", function (t) {
    t.dropUnique(["name"]);
  });
  await knex.schema.alterTable("bo_units", function (t) {
    t.dropUnique(["name"]);
  });
  await knex.schema.alterTable("bo_products", function (t) {
    t.dropUnique(["name", "code"]);
  });
}
