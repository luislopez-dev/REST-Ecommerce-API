const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// Retrieve data from range of products
router.post('/products', productController.getProducts);

// Create a new product
router.post('/', productController.addProduct);

// Get data of a speciic product 
router.get('/:productId', productController.getSingleProduct);

// Delete product
router.delete('/:productId', productController.deleteProduct);

// Update product ---- pending to fix
router.put('', productController.editProduct);

module.exports = router;