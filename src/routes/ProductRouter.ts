const { verifyToken } = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// Create a new product
router.post('/', verifyToken, productController.addProduct);

// Get data of a speciic product 
router.get('/:productId', productController.getSingleProduct);

// Delete product
router.delete('/:productId', verifyToken, productController.deleteProduct);

// Update product
router.put('/', verifyToken, productController.editProduct);

// Retrieve data from range of products
router.post('/products', productController.getProducts);

// Retrieve data from a search query
router.post('/search', productController.searchProduct);

module.exports = router;