import { QueryResult } from "pg";
import { IProducts } from "./products.model";
import db from "../../shared/config/pg";

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
  p.updated_at
FROM bo_products p
JOIN bo_categories c ON p.category_id = c.id
JOIN bo_sub_categories sc ON p.sub_category_id = sc.id
LEFT JOIN bo_product_units pu ON p.id = pu.product_id
LEFT JOIN bo_units u ON pu.unit_id = u.id
GROUP BY p.id, p.uuid, p.name, p.code, c.name, sc.name, p.created_at, p.updated_at
ORDER BY p.id ASC;

  `;
  const result: QueryResult<IProducts> = await db.query(query);
  return result.rows;
};
