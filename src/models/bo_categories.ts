import { ISubCategory } from "./bo_sub_categories";

export interface ICategory extends ICategoryBody {
  id: number;
  sub_categories?: ISubCategory[];
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
}
