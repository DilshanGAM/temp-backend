import Category from '../models/Category.js'; // Update the import path as necessary

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fetch subcategories by category ID
export const getSubcategoriesById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.send(category.subcategories);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fetch subcategories by category name
export const getSubcategoriesByName = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.name });
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.send(category.subcategories);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.send({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};
// Add subcategory to a category
export const addSubcategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    category.subcategories.push(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Remove subcategory from a category
export const removeSubcategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    category.subcategories.id(req.params.subId).remove();
    await category.save();
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};