import { QueryResult } from "pg";
import db from "../../../shared/config/pg";
import {
  ISubCategory,
  ICategorySubLinkBody,
  ISubCategoryRelations,
} from "../models/sub_categories.model";

export const findAllSubCategories = async (): Promise<ISubCategory[]> => {
  const query = `SELECT * FROM "bo_sub_categories" WHERE "is_active" = true`;
  const result: QueryResult<ISubCategory> = await db.query(query);
  return result.rows;
};

export const findSubById = async (id: number): Promise<ISubCategory[]> => {
  const values = [id];
  const query = `SELECT * FROM "bo_sub_categories" WHERE "id" = $1`;

  const result: QueryResult<ISubCategory> = await db.query(query, values);
  return result.rows;
};

export const findRelationsSubCategories = async (): Promise<
  ISubCategoryRelations[]
> => {
  const query = `
  SELECT 
    "c"."name" as "Kategori",
    json_agg(sc.name) AS "Sub Kategori"
  FROM "bo_category_sub_category" "bcs"
  LEFT JOIN "bo_sub_categories" "sc" ON "bcs"."sub_category_id" = "sc"."id"
  LEFT JOIN "bo_categories" "c" ON "bcs"."category_id" = "c"."id"
  WHERE "sc"."is_active" = true
  GROUP BY "c"."name"`;
  const result: QueryResult<ISubCategoryRelations> = await db.query(query);
  return result.rows;
};

export const insertSubCategory = async (
  name: string
): Promise<ISubCategory[]> => {
  const value = [name];
  const query = `
  INSERT INTO "bo_sub_categories" ("name")
  VALUES ($1)
  RETURNING *
  
  `;
  const result: QueryResult<ISubCategory> = await db.query(query, value);
  return result.rows;
};

export const insertSubCategoryRelations = async (
  data: ICategorySubLinkBody
): Promise<ISubCategoryRelations[]> => {
  const columns: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    values.push(value);
    columns.push(`"${key}"`);
  }

  const insertedValues = values.map((_, index) => `$${index + 1}`).join(", ");

  const query = `
  WITH inserted AS (
    INSERT INTO "bo_category_sub_category"
    (${columns.join(", ")})
    VALUES
    (${insertedValues})
    RETURNING "category_id"
  )
  SELECT 
    "c"."name" as "Kategori",
    json_agg(sc.name) AS "Sub Kategori"
  FROM "bo_category_sub_category" "bcs"
  LEFT JOIN "bo_sub_categories" "sc" ON "bcs"."sub_category_id" = "sc"."id"
  LEFT JOIN "bo_categories" "c" ON "bcs"."category_id" = "c"."id"
  WHERE "bcs"."category_id" = (SELECT category_id FROM inserted)
  GROUP BY "c"."name"`;

  const result: QueryResult<ISubCategoryRelations> = await db.query(
    query,
    values
  );
  return result.rows;
};

export const updateSubCategory = async (
  id: number,
  name: string
): Promise<ISubCategory[]> => {
  const values = [id, name];

  const query = `
        UPDATE "bo_sub_categories" 
        SET "name" = $2,
        updated_at = now()
        WHERE "id" = $1 
        RETURNING *`;
  const result: QueryResult<ISubCategory> = await db.query(query, values);
  return result.rows;
};

export const setActiveSubById = async (
  id: number,
  is_active: boolean
): Promise<ISubCategory[]> => {
  const values = [id, is_active];
  let deletedAtClause = "";

  if (is_active === true) {
    deletedAtClause = "null";
  } else if (is_active === false) {
    deletedAtClause = "now()";
  }

  const query = `
        UPDATE "bo_sub_categories" 
        SET "is_active" = $2,
        deleted_at = ${deletedAtClause}
        WHERE "id" = $1 
        RETURNING *`;

  console.log(query);
  const result: QueryResult<ISubCategory> = await db.query(query, values);
  return result.rows;
};
