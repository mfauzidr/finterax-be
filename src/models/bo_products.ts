import { IProductUnitBody } from "./bo_product_unit";

export interface IProductBody {
  name: string;
  code: string;
  category_id: number;
  sub_category_id: number;
  units: IProductUnitBody[];
}

export interface IProducts extends IProductBody {
  id?: number;
  uuid: string;
  created_at: Date;
  updated_at: Date;
}

export interface IProductParams {
  uuid: string;
}

export interface IProductQueryParams {
  search?: string;
  code?: string;
  category_id?: number;
  sub_category_id?: number;
}
