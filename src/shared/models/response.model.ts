import { ICategory } from "@modules/categories/models/categories.model";
import {
  ISubCategory,
  ISubCategoryRelations,
} from "@modules/categories/models/sub_categories.model";

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
export interface ICategorySubResponse extends IBasicResponse {
  results?: ISubCategoryRelations[];
}

export interface IErrorResponse {
  code?: string;
  column?: string;
  detail?: string;
  message?: string;
}
