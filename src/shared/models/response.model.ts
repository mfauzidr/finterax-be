import { ICategory } from "../../modules/categories/models/categories.model";

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

export interface IErrorResponse {
  code?: string;
  column?: string;
  detail?: string;
  message?: string;
}
