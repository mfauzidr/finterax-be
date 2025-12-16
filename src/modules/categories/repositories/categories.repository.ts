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
  data: Partial<ICategory>
): Promise<ICategory[]> => {
  const columns: string[] = [];
  const values: any[] = [id];
  for (const [key, value] of Object.entries(data)) {
    values.push(value);
    columns.push(`"${key}" = $${values.length}`);
  }
  const query = `
        UPDATE "bo_categories" 
        SET ${columns.join(", ")},
        updated_at = now()
        WHERE "id" = $1 
        RETURNING *`;
  console.log(query);
  console.log(values);
  const result: QueryResult<ICategory> = await db.query(query, values);
  return result.rows;
};
