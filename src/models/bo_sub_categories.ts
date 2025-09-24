export interface ISubCategory extends ISubCategoryBody {
  id: number;
  created_at: Date;
}

export interface ISubCategoryBody {
  name: string;
  category_id?: number;
}

export interface ISubCategoryParams {
  id: string;
}
export interface ISubCategoryQueryParams {
  id?: number;
  search?: string;
  category_id?: number;
}
