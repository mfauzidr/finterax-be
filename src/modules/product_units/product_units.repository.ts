import { QueryResult } from "pg";
import { IProductUnit } from "./product_unit.model";
import db from "../../shared/config/pg";

export const findAllProductUnits = async (): Promise<IProductUnit[]> => {
  const query = `
  SELECT
    p.name AS product_name,
    u.name AS unit_name,
    pu.conversion_factor,
    pu.is_stock_opname,
    pu.is_default_purchase
  FROM bo_product_units pu
  JOIN bo_products p ON p.id = pu.product_id
  JOIN bo_units u ON u.id = pu.unit_id
  ORDER BY pu.id ASC;`;

  const result: QueryResult<IProductUnit> = await db.query(query);

  return result.rows;
};
