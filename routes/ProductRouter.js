const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// Create a new product
router.post('/', productController.addProduct);

// Get data of a speciic product 
router.get('/:productId', productController.getSingleProduct);

// Delete product
router.delete('/:productId', productController.deleteProduct);

// Update product ---- pending to fix
router.put('', productController.editProduct);

// Retrieve data from range of products
router.post('/products', productController.getProducts);

module.exports = router;