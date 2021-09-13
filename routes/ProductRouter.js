const { verifyToken } = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// Create a new product
router.post('/', verifyToken, productController.addProduct);

// Get data of a speciic product 
router.get('/:productId', verifyToken, productController.getSingleProduct);

// Delete product
router.delete('/:productId', verifyToken, productController.deleteProduct);

// Update product ---- pending to fix
router.put('', verifyToken, productController.editProduct);

// Retrieve data from range of products
router.post('/products', verifyToken, productController.getProducts);

module.exports = router;