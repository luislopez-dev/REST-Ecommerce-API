const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('', productController.addProduct);
router.get('/:page', productController.getProducts);
router.delete('/:productId', productController.deleteProduct);
router.put('', productController.editProduct);
router.get('/item/:productId', productController.getSingleProduct);
router.get('/get/count', productController.getCount);
router.get('/search/:item', productController.getItems);

module.exports = router;