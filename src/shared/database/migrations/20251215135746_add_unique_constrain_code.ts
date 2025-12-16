import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("bo_products", function (t) {
    t.unique("name");
  });
  await knex.schema.alterTable("bo_products", function (t) {
    t.unique("code");
  });
}

export async function down(knex: Knex): Promise<void> {}
