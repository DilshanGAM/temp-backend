import express from 'express'
import { addProduct, deleteProduct, getAllProduct, getProductById, searchByProductName, updateProduct } from '../controllers/ProductList.js'

const productRouter = express.Router();
productRouter.post("/", addProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);
productRouter.get("/search/:productName", searchByProductName);

export default productRouter;