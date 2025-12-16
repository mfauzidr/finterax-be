import { QueryResult } from "pg";
import db from "../../../shared/config/pg";
import {
  ISubCategory,
  ISubCategoryRelations,
} from "../models/sub_categories.model";

export const findAllBOSubCategories = async (): Promise<ISubCategory[]> => {
  let query = `SELECT * FROM "bo_sub_categories"`;
  const result: QueryResult<ISubCategory> = await db.query(query);
  return result.rows;
};

export const findRelationsSubCategories = async (): Promise<
  ISubCategoryRelations[]
> => {
  const query = `
  SELECT 
    "c"."name" as "Kategori",
    json_agg(sc.name) AS "Sub Kategori"
  FROM "bo_sub_categories" "sc"
  JOIN "bo_categories" "c" ON "sc"."category_id" = "c"."id"
  GROUP BY "c"."name"`;
  const result: QueryResult<ISubCategoryRelations> = await db.query(query);
  return result.rows;
};
