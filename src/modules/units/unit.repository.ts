import { QueryResult } from "pg";
import { IUnit } from "./unit.model";
import db from "@shared/config/pg";

export const findAllUnits = async (): Promise<IUnit[]> => {
  let query = `SELECT * FROM "bo_units" WHERE "is_active" = true`;
  const result: QueryResult<IUnit> = await db.query(query);
  return result.rows;
};

export const findUnitById = async (id: number): Promise<IUnit[]> => {
  const values = [id];
  const query = `SELECT * FROM "bo_units" WHERE "id" = $1`;
  const results: QueryResult<IUnit> = await db.query(query, values);
  return results.rows;
};

export const insertUnit = async (name: string): Promise<IUnit[]> => {
  const value = [name];
  const query = `INSERT INTO "bo_units" ("name") VALUES ($1) RETURNING *`;
  const results: QueryResult<IUnit> = await db.query(query, value);
  return results.rows;
};

export const editUnit = async (id: number, name: string): Promise<IUnit[]> => {
  const value = [id, name];
  const query = `
        UPDATE "bo_units"
        SET "name" = $2,
        updated_at = now()
        WHERE "id" = $1 
        RETURNING *`;
  const results: QueryResult<IUnit> = await db.query(query, value);
  return results.rows;
};

export const setActiveUnitById = async (
  id: number,
  is_active: boolean,
): Promise<IUnit[]> => {
  const values = [id, is_active];
  let deletedAtClause = "";

  if (is_active === true) {
    deletedAtClause = "null";
  } else if (is_active === false) {
    deletedAtClause = "now()";
  }

  const query = `
        UPDATE "bo_units" 
        SET "is_active" = $2,
        deleted_at = ${deletedAtClause}
        WHERE "id" = $1 
        RETURNING *`;
  const result: QueryResult<IUnit> = await db.query(query, values);
  return result.rows;
};
