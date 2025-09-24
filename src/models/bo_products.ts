import { ICategory } from "./bo_categories";
import { ISubCategory } from "./bo_sub_categories";
import { IProductUnit } from "./bo_units";

export interface Product {
  id: number;
  name: string;
  category: ICategory;
  sub_category: ISubCategory;
  units: IProductUnit[];
}
