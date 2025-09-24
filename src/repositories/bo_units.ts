import { QueryResult } from "pg";
import { IUnit } from "../models/bo_units";
import db from "../config/pg";

export const findAllBOUnits = async (): Promise<IUnit[]> => {
  let query = `SELECT * FROM "bo_units"`;
  const result: QueryResult<IUnit> = await db.query(query);
  return result.rows;
};
