import { Knex } from "knex";
import ExcelJS from "exceljs";
import path from "path";

export async function seed(knex: Knex): Promise<void> {
  const filePath = path.join(
    __dirname,
    "../seeds/master/Migration_Data_SP7.xlsx"
  );
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(filePath);
  } catch (err) {
    console.error("File Excel tidak ditemukan:", filePath);
    throw err;
  }

  const sheet = workbook.getWorksheet("PRODUCT");
  if (!sheet) {
    throw new Error(
      "Sheet 'PRODUCT' tidak ditemukan di Migration_Data_SP7.xlsx"
    );
  }

  // =========================
  // 1. Categories
  // =========================
  const categories: { name: string }[] = [];
  sheet.eachRow((row, idx) => {
    if (idx === 1) return; // skip header
    const category = row.getCell(4).text.trim();
    if (
      category &&
      !categories.find(
        (c) => c.name.trim().toUpperCase() === category.toUpperCase()
      )
    ) {
      categories.push({ name: category });
    }
  });

  await knex("bo_categories").del();
  await knex("bo_categories").insert(categories);
  const dbCategories = await knex("bo_categories").select("*");

  // =========================
  // 2. Sub Categories
  // =========================
  const subCategories: { name: string; category_id: number }[] = [];
  sheet.eachRow((row, idx) => {
    if (idx === 1) return;
    const categoryName = row.getCell(4).text.trim();
    const subName = row.getCell(5).text.trim();
    const category = dbCategories.find(
      (c) => c.name.trim().toUpperCase() === categoryName.toUpperCase()
    );

    if (
      category &&
      subName &&
      !subCategories.find(
        (sc) =>
          sc.name.trim().toUpperCase() === subName.toUpperCase() &&
          sc.category_id === category.id
      )
    ) {
      subCategories.push({ name: subName, category_id: category.id });
    }
  });

  await knex("bo_sub_categories").del();
  await knex("bo_sub_categories").insert(subCategories);
  const dbSubCategories = await knex("bo_sub_categories").select("*");

  // =========================
  // 3. Units
  // =========================
  const units: { name: string }[] = [];
  sheet.eachRow((row, idx) => {
    if (idx === 1) return;
    const unit = row.getCell(6).text.trim();
    if (
      unit &&
      !units.find((u) => u.name.trim().toUpperCase() === unit.toUpperCase())
    ) {
      units.push({ name: unit });
    }
  });

  await knex("bo_units").del();
  await knex("bo_units").insert(units);
  const dbUnits = await knex("bo_units").select("*");

  // =========================
  // 4. Products
  // =========================
  const products: {
    name: string;
    code: string;
    category_id: number | null;
    sub_category_id: number | null;
  }[] = [];

  sheet.eachRow((row, idx) => {
    if (idx === 1) return;
    const name = row.getCell(2).text.trim();
    const code = row.getCell(3).text.trim();
    const categoryName = row.getCell(4).text.trim();
    const subName = row.getCell(5).text.trim();

    if (
      name &&
      code &&
      !products.find(
        (p) =>
          p.name.trim().toUpperCase() === name.toUpperCase() &&
          p.code.trim().toUpperCase() === code.toUpperCase()
      )
    ) {
      const category = dbCategories.find(
        (c) => c.name.trim().toUpperCase() === categoryName.toUpperCase()
      );
      const subCategory = dbSubCategories.find(
        (sc) =>
          sc.name.trim().toUpperCase() === subName.toUpperCase() &&
          sc.category_id === category?.id
      );
      products.push({
        name,
        code,
        category_id: category ? category.id : null,
        sub_category_id: subCategory ? subCategory.id : null,
      });
    }
  });

  await knex("bo_products").del();
  await knex("bo_products").insert(products);
  const dbProducts = await knex("bo_products").select("*");

  // =========================
  // 5. Product Units
  // =========================
  const productUnits: {
    product_id: number;
    unit_id: number;
    conversion_factor: number;
    is_stock_opname: boolean;
    is_default_purchase: boolean;
  }[] = [];

  sheet.eachRow((row, idx) => {
    if (idx === 1) return;
    const code = row.getCell(3).text.trim();
    const unitName = row.getCell(6).text.trim();
    const factor = Number(row.getCell(8).text.trim() || "1");
    const stockOpname = row.getCell(9).text.trim().toUpperCase() === "YES";
    const defaultPurchase = row.getCell(10).text.trim().toUpperCase() === "YES";

    const product = dbProducts.find(
      (p) => p.code.trim().toUpperCase() === code.toUpperCase()
    );
    const unit = dbUnits.find(
      (u) => u.name.trim().toUpperCase() === unitName.toUpperCase()
    );

    if (product && unit) {
      productUnits.push({
        product_id: product.id,
        unit_id: unit.id,
        conversion_factor: factor,
        is_stock_opname: stockOpname,
        is_default_purchase: defaultPurchase,
      });
    } else {
      console.warn("Skip product unit, lookup gagal:", {
        code,
        unitName,
        productId: product?.id,
        unitId: unit?.id,
      });
    }
  });

  await knex("bo_product_units").del();
  if (productUnits.length) {
    await knex("bo_product_units").insert(productUnits);
  }

  console.log(
    `✅ Seeding selesai. Categories: ${dbCategories.length}, SubCategories: ${dbSubCategories.length}, Units: ${dbUnits.length}, Products: ${dbProducts.length}, ProductUnits: ${productUnits.length}`
  );
}
