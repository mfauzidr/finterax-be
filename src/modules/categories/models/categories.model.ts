import { ISubCategory } from "./sub_categories.model";

export interface ICategory extends ICategoryBody {
  id: number;
  sub_categories?: ISubCategory[];
  is_active?: boolean;
}

export interface ICategoryBody {
  name: string;
}

export interface ICategoryParams {
  id: string;
}

export interface ICategoryQueryParams {
  id?: number;
  search?: string;
  is_active?: boolean;
}
