export interface IProductUnit extends IProductUnitBody {
  id: number;
  created_at: Date;
}

export interface IProductUnitBody {
  product_uuid: string;
  unit_id: number;
  conversion_factor: number;
  is_stock_opname: boolean;
  is_default_purchase: boolean;
}
export interface IProductUnitParams {
  uuid: string;
}
export interface IProductUnitQueryParams {
  product_uuid?: string;
  unit_id?: number;
  conversion_factor?: number;
  is_stock_opname?: boolean;
  is_default_purchase?: boolean;
}
