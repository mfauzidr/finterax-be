import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable("bo_category_sub_category").then(function (exist) {
    if (!exist) {
      return knex.schema.createTable("bo_category_sub_category", function (t) {
        t.increments("id").primary();
        t.integer("sub_category_id").unsigned();
        t.integer("category_id");
      });
    }
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable("bo_category_sub_category").then(function (exist) {
    if (exist) {
      return knex.schema.dropTable("bo_category_sub_category");
    }
  });
}
