export interface IUnit extends IUnitBody {
  id: number;
  created_at: Date;
}

export interface IUnitBody {
  name: string;
}

export interface IUnitParams {
  id: string;
}
export interface IUnitQueryParams {
  id?: number;
  search?: string;
}

export interface IProductUnit extends IProductUnitBody {
  id: number;
  product_id: number;
  unit_id: number;
  conversion_factor: number;
  is_stock_opname: boolean;
  is_default_purchase: boolean;
  created_at: Date;
}

export interface IProductUnitBody {
  product_id: number;
  unit_id: number;
  conversion_factor: number;
  is_stock_opname: boolean;
  is_default_purchase: boolean;
}
export interface IProductUnitParams {
  id: string;
}
export interface IProductUnitQueryParams {
  product_id?: number;
  unit_id?: number;
  conversion_factor?: number;
  is_stock_opname?: boolean;
  is_default_purchase?: boolean;
}
