import mongoose from 'mongoose';
import ProductList from '../models/ProductList.js';

const productList = mongoose.model("productList", ProductList);


// Add product
export const addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new productList(productData);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        console.log('Success');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// Get all product
// 10 Products per page
export const getAllProduct = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const products = await productList.find().skip(skip).limit(limit);
        const totalProducts = await productList.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);
        res.status(200).json({
            products,
            page,
            totalPages,
            totalProducts
        });
    }
    catch (err) {
        res.status(500).json({ meesage: err.messsge});
    }
}

// get product by id
export const getProductById = async (req, res) => {
    const getById = req.params.id;
    try {
        const productById = await productList.findById(getById);
        if(!productById) {
            return res.status(404).send();
        }
        res.status(200).send(productById);
    }
    catch(err) {
        res.status(500).send(err);
    }
}

// Delete product by id
export const deleteProduct = async (req, res) => {
    const getById = req.params.id;
    try {
        await productList.findByIdAndDelete(getById).then((result) => {
            res.status(200).json(result);
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Update product by id
export const updateProduct = async (req, res) => {
    const getById = req.params.id;
    const productData = req.body;
    try{
        await productList.findByIdAndUpdate(getById, productData, { new: true}).then((result) => {
            res.status(200).json(result);
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Search by product name
// 10 Products per page
export const searchByProductName = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const productName = req.query.productName; // Changed to req.query.productName
        if (!productName) {
            return res.status(400).json({ message: 'Product Name required' });
        }

        const searchProduct = { productName: { $regex: productName, $options: 'i' } };
        const products = await productList.find(searchProduct).skip(skip).limit(limit);
        const totalProducts = await productList.countDocuments(searchProduct);
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({
            products,
            page,
            totalPages,
            totalProducts
        });
    }    
    catch(err) {
        console.error(err);
        res.status(500).json({ message: err.meesage })
    }
}

// Search by Price Range
export const searchByPriceRange = async (req, res) => {
    try {
        const minPrice = parseFloat(req.query.minPrice) || 0;
        const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
        if (!minPrice || !maxPrice) {
            return res.status(400).json({ message: 'Price Range Required' });
        }
        const searchPriceRange = {labeledPrice: { $gte: minPrice, $lte: maxPrice } };
        const products = await productList.find(searchPriceRange);
        res.status(200).json({
            products
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.meesage }) 
    }
}


