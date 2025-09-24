import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("bo_categories", (t) => {
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").nullable();
  });
  await knex.schema.alterTable("bo_sub_categories", (t) => {
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").nullable();
  });
  await knex.schema.alterTable("bo_units", (t) => {
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").nullable();
  });
  await knex.schema.alterTable("bo_products", (t) => {
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").nullable();
  });
  await knex.schema.alterTable("bo_product_units", (t) => {
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  for (const table of [
    "bo_categories",
    "bo_sub_categories",
    "bo_units",
    "bo_products",
    "bo_product_units",
  ]) {
    await knex.schema.alterTable(table, (t) => {
      t.dropColumn("created_at");
      t.dropColumn("updated_at");
    });
  }
}
