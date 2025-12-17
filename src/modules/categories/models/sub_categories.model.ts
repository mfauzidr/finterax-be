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

export interface ISubCategoryRelations {
  category?: string;
  sub_category?: string[];
}

export interface ICategorySubLinkBody {
  category_id?: number;
  sub_category_id?: number;
}
