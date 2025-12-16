import { QueryResult } from "pg";
import db from "../../../shared/config/pg";
import { ICategory } from "../models/categories.model";

export const findAllCategories = async (): Promise<ICategory[]> => {
  let query = `SELECT * FROM "bo_categories" WHERE "is_active" = true`;
  const result: QueryResult<ICategory> = await db.query(query);
  return result.rows;
};

export const insertCategory = async (name: string): Promise<ICategory[]> => {
  const value = [name];
  const query = `INSERT INTO "bo_categories" ("name") VALUES ($1) RETURNING *`;
  const result: QueryResult<ICategory> = await db.query(query, value);
  return result.rows;
};

export const updateCategory = async (
  id: number,
  name: string
): Promise<ICategory[]> => {
  const values = [id, name];

  const query = `
        UPDATE "bo_categories" 
        SET "name" = $2,
        updated_at = now()
        WHERE "id" = $1 
        RETURNING *`;
  const result: QueryResult<ICategory> = await db.query(query, values);
  return result.rows;
};

export const setActiveCategoryById = async (
  id: number,
  is_active: boolean
): Promise<ICategory[]> => {
  const values = [id, is_active];
  let deletedAtClause = "";

  if (is_active === true) {
    deletedAtClause = "null";
  } else if (is_active === false) {
    deletedAtClause = "now()";
  }

  const query = `
        UPDATE "bo_categories" 
        SET "is_active" = $2,
        deleted_at = ${deletedAtClause}
        WHERE "id" = $1 
        RETURNING *`;

  console.log(query);
  const result: QueryResult<ICategory> = await db.query(query, values);
  return result.rows;
};
