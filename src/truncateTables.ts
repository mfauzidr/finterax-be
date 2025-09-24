import db from "./config/pg";

async function truncateAll() {
  await db.query(`
    TRUNCATE TABLE
      bo_product_units,
      bo_products,
      bo_sub_categories,
      bo_categories
    RESTART IDENTITY CASCADE;
  `);
  console.log("Semua table sudah dibersihkan!");
}

truncateAll()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
