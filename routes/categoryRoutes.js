import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/Category.js'; // Update the import path as necessary

const router = express.Router();

router.post('/', createCategory); // POST /categories
router.get('/', getCategories); // GET /categories
router.get('/:id', getCategoryById); // GET /categories/:id
router.put('/:id', updateCategory); // PUT /categories/:id
router.delete('/:id', deleteCategory); // DELETE /categories/:id

export default router;
