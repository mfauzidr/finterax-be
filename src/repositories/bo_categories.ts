import { QueryResult } from "pg";
import db from "../config/pg";
import { ICategory } from "../models/bo_categories";

export const findAllBOCategories = async (): Promise<ICategory[]> => {
  console.time("QueryCategories");
  let query = `SELECT * FROM "bo_categories"`;
  const result: QueryResult<ICategory> = await db.query(query);
  return result.rows;
};
