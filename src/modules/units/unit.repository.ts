import { QueryResult } from "pg";
import { IUnit } from "./unit.model";
import db from "../../shared/config/pg";

export const findAllUnits = async (): Promise<IUnit[]> => {
  let query = `SELECT * FROM "bo_units"`;
  const result: QueryResult<IUnit> = await db.query(query);
  return result.rows;
};
