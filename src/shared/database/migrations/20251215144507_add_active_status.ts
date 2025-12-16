import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .hasColumn("bo_categories", "is_active")
    .then(function (exist) {
      if (!exist) {
        return knex.schema.table("bo_categories", function (t) {
          t.boolean("is_active").defaultTo(true);
          t.timestamp("deleted_at");
        });
      }
    });
  await knex.schema
    .hasColumn("bo_sub_categories", "is_active")
    .then(function (exist) {
      if (!exist) {
        return knex.schema.table("bo_sub_categories", function (t) {
          t.boolean("is_active").defaultTo(true);
          t.timestamp("deleted_at");
        });
      }
    });
  await knex.schema
    .hasColumn("bo_category_sub_category", "is_active")
    .then(function (exist) {
      if (!exist) {
        return knex.schema.table("bo_category_sub_category", function (t) {
          t.boolean("is_active").defaultTo(true);
          t.timestamp("deleted_at");
        });
      }
    });
  await knex.schema.hasColumn("bo_units", "is_active").then(function (exist) {
    if (!exist) {
      return knex.schema.table("bo_units", function (t) {
        t.boolean("is_active").defaultTo(true);
        t.timestamp("deleted_at");
      });
    }
  });
  await knex.schema
    .hasColumn("bo_products", "is_active")
    .then(function (exist) {
      if (!exist) {
        return knex.schema.table("bo_products", function (t) {
          t.boolean("is_active").defaultTo(true);
          t.timestamp("deleted_at");
        });
      }
    });
  await knex.schema
    .hasColumn("bo_product_units", "is_active")
    .then(function (exist) {
      if (!exist) {
        return knex.schema.table("bo_product_units", function (t) {
          t.boolean("is_active").defaultTo(true);
          t.timestamp("deleted_at");
        });
      }
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .hasColumn("bo_categories", "is_active")
    .then(function (exist) {
      if (exist) {
        return knex.schema.table("bo_categories", function (t) {
          t.dropColumns("is_active", "deleted_at");
        });
      }
    });
  await knex.schema
    .hasColumn("bo_sub_categories", "is_active")
    .then(function (exist) {
      if (exist) {
        return knex.schema.table("bo_sub_categories", function (t) {
          t.dropColumns("is_active", "deleted_at");
        });
      }
    });
  await knex.schema
    .hasColumn("bo_category_sub_category", "is_active")
    .then(function (exist) {
      if (exist) {
        return knex.schema.table("bo_category_sub_category", function (t) {
          t.dropColumns("is_active", "deleted_at");
        });
      }
    });
  await knex.schema.hasColumn("bo_units", "is_active").then(function (exist) {
    if (exist) {
      return knex.schema.table("bo_units", function (t) {
        t.boolean("is_active").defaultTo(true);
        t.timestamp("deleted_at");
      });
    }
  });
  await knex.schema
    .hasColumn("bo_products", "is_active")
    .then(function (exist) {
      if (exist) {
        return knex.schema.table("bo_products", function (t) {
          t.dropColumns("is_active", "deleted_at");
        });
      }
    });
  await knex.schema
    .hasColumn("bo_product_units", "is_active")
    .then(function (exist) {
      if (exist) {
        return knex.schema.table("bo_product_units", function (t) {
          t.dropColumns("is_active", "deleted_at");
        });
      }
    });
}
