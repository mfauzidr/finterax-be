import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("bo_category_sub_category", function (t) {
    t.foreign("category_id").references("id").inTable("bo_categories");
    t.foreign("sub_category_id").references("id").inTable("bo_sub_categories");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("bo_category_sub_category", function (t) {
    t.dropForeign("category_id");
    t.dropForeign("sub_category_id");
  });
}
