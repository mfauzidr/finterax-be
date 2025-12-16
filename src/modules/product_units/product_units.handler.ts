import { Request, Response } from "express";
import { IProductUnit } from "./product_unit.model";
import { findAllProductUnits } from "./product_units.repository";

export const getAllProductUnits = async (req: Request, res: Response) => {
  try {
    const productUnits: IProductUnit[] = await findAllProductUnits();
    return res.status(200).json({
      success: true,
      message: "List all product unit",
      results: productUnits,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Internal Server Error",
    });
  }
};
