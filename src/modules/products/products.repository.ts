import { QueryResult } from "pg";
import { IProducts } from "./products.model";
import db from "@shared/config/pg";

export const findAllProducts = async (): Promise<IProducts[]> => {
  const query = `
    SELECT
      p.id,
      p.uuid,
      p.name,
      p.code,
      c.name AS category_name,
      sc.name AS sub_category_name,
      json_agg(
        json_build_object(
          'unit_name', u.name,
          'conversion_factor', pu.conversion_factor,
          'is_stock_opname', pu.is_stock_opname,
          'is_default_purchase', pu.is_default_purchase
        )
      ) AS units,
      p.created_at,
      p.updated_at,
      p.is_active,
      p.deleted_at
    FROM bo_products p
    JOIN bo_categories c ON p.category_id = c.id
    JOIN bo_sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN bo_product_units pu ON p.id = pu.product_id
    LEFT JOIN bo_units u ON pu.unit_id = u.id
    WHERE p.is_active = true
    GROUP BY p.id, p.uuid, p.name, p.code, c.name, sc.name, p.created_at, p.updated_at, p.is_active, p.deleted_at
    ORDER BY p.id ASC
    `;

  const result: QueryResult<IProducts> = await db.query(query);
  return result.rows;
};

export const findProductByUuid = async (uuid: string): Promise<IProducts[]> => {
  const value = [uuid];
  const query = `SELECT
      p.id,
      p.uuid,
      p.name,
      p.code,
      c.name AS category_name,
      sc.name AS sub_category_name,
      json_agg(
        json_build_object(
          'unit_name', u.name,
          'conversion_factor', pu.conversion_factor,
          'is_stock_opname', pu.is_stock_opname,
          'is_default_purchase', pu.is_default_purchase
        )
      ) AS units,
      p.created_at,
      p.updated_at,
      p.is_active,
      p.deleted_at
    FROM bo_products p
    JOIN bo_categories c ON p.category_id = c.id
    JOIN bo_sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN bo_product_units pu ON p.id = pu.product_id
    LEFT JOIN bo_units u ON pu.unit_id = u.id
    WHERE p.uuid = $1
    GROUP BY p.id, p.uuid, p.name, p.code, c.name, sc.name, p.created_at, p.updated_at, p.is_active, p.deleted_at
    ORDER BY p.id ASC
    `;

  const result: QueryResult<IProducts> = await db.query(query, value);
  return result.rows;
};

//create

//update

export const setActiveProductByUuid = async (
  uuid: string,
  is_active: boolean,
): Promise<IProducts[]> => {
  const values = [uuid, is_active];
  let deletedAtClause = "";

  if (is_active === true) {
    deletedAtClause = "null";
  } else if (is_active === false) {
    deletedAtClause = "now()";
  }

  const query = `
        UPDATE "bo_products" 
        SET "is_active" = $2,
        deleted_at = ${deletedAtClause}
        WHERE "uuid" = $1 
        RETURNING *`;
  const result: QueryResult<IProducts> = await db.query(query, values);
  return result.rows;
};
