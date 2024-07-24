import express from 'express'
import { addProduct, deleteProduct,  getAllProduct, getProductById, searchByProductName, updateProduct, searchByPriceRange } from '../controllers/ProductList.js'

const productRouter = express.Router();
productRouter.post("/", addProduct);
productRouter.get("/search", searchByProductName);
productRouter.get("/price", searchByPriceRange);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);



export default productRouter;