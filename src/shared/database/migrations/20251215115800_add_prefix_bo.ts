import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.renameTable("products", "bo_products");
  await knex.schema.renameTable("categories", "bo_categories");
  await knex.schema.renameTable("sub_categories", "bo_sub_categories");
  await knex.schema.renameTable("units", "bo_units");
  await knex.schema.renameTable("product_units", "bo_product_units");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.renameTable("bo_products", "products");
  await knex.schema.renameTable("bo_categories", "categories");
  await knex.schema.renameTable("bo_sub_categories", "sub_categories");
  await knex.schema.renameTable("bo_units", "units");
  await knex.schema.renameTable("bo_product_units", "product_units");
}
