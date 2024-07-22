import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addSubcategory,
  removeSubcategory
} from '../controllers/Category.js'; // Update the import path as necessary

const router = express.Router();

router.post('/', createCategory); // POST /categories
router.get('/', getCategories); // GET /categories
router.get('/:id', getCategoryById); // GET /categories/:id
router.put('/:id', updateCategory); // PUT /categories/:id
router.delete('/:id', deleteCategory); // DELETE /categories/:id


router.post('/:id/subcategories', addSubcategory); // POST /categories/:id/subcategories
router.delete('/:id/subcategories/:subId', removeSubcategory); // DELETE /categories/:id/subcategories/:subId

export default router;
