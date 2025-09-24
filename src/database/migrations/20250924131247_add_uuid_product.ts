import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  await knex.schema.alterTable("bo_products", (t) => {
    t.uuid("uuid")
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .notNullable()
      .unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("bo_products", (t) => {
    t.dropColumn("uuid");
  });
}
