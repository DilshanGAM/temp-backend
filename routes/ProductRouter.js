import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  searchByProductName,
  updateProduct,
  searchByPriceRange,
} from "../controllers/ProductList.js";
import authenticate from "../middlewares/authenticate.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";

const productRouter = express.Router();
productRouter.post("/", authenticate, authorizeAdmin, addProduct);
productRouter.get("/search", searchByProductName);
productRouter.get("/price", searchByPriceRange);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", authenticate, authorizeAdmin, deleteProduct);
productRouter.put("/:id", authenticate, authorizeAdmin, updateProduct);

export default productRouter;
