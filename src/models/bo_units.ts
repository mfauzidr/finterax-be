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
