import { Request, Response } from "express";
import { findAllProducts } from "./products.repository";
import { IProducts } from "./products.model";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: IProducts[] = await findAllProducts();
    return res.status(200).json({
      success: true,
      message: "List all products",
      results: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
