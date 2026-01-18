import { ICategory } from "@modules/categories/models/categories.model";
import {
  ISubCategory,
  ISubCategoryRelations,
} from "@modules/categories/models/sub_categories.model";
import { IProducts } from "@modules/products/products.model";
import { IUnit } from "@modules/units/unit.model";

interface IBasicResponse {
  success?: boolean;
  message: string;
  err?: string;
  warning?: string;
  meta?: string;
}

export interface ICategoryResponse extends IBasicResponse {
  results?: ICategory[];
}
export interface ISubCategoryResponse extends IBasicResponse {
  results?: ISubCategory[];
}
export interface ICategorySubResponse extends IBasicResponse {
  results?: ISubCategoryRelations[];
}
export interface IUnitResponse extends IBasicResponse {
  results?: IUnit[];
}

export interface IProductResponse extends IBasicResponse {
  results?: IProducts[];
}

export interface IErrorResponse {
  code?: string;
  column?: string;
  detail?: string;
  message?: string;
}
