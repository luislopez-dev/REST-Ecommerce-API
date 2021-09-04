const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/:page', productController.getProducts);
router.get('/item/:productId', productController.getSingleProduct);
router.get('/get/count', productController.getCount);
router.get('/search/:item', productController.getItems);
router.post('', productController.addProduct);
router.delete('/:productId', productController.deleteProduct);
router.put('', productController.editProduct);

module.exports = router;