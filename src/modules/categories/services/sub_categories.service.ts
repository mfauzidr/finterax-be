import { AppError } from "@shared/helper/app_error";
import { findSubByCategoryId } from "../repositories/categories.repository";
import {
  insertSubCategory,
  insertSubCategoryRelations,
} from "../repositories/sub_categories.repository";
import db from "@shared/config/pg";

export const createSubCategoryWithRelation = async (
  name: string,
  categoryId: number
) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const subCategory = await insertSubCategory(client, name);
    const subId = subCategory[0].id;

    const data = {
      category_id: categoryId,
      sub_category_id: subId,
    };

    await insertSubCategoryRelations(client, data);

    await client.query("COMMIT");

    return await findSubByCategoryId(categoryId);
  } catch (error: any) {
    await client.query("ROLLBACK");

    if (error.code === "23505") {
      throw new AppError("CONFLICT", "Sub Category name already exists", 409);
    }

    throw error;
  } finally {
    client.release();
  }
};
