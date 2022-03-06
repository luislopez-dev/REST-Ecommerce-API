import verifyToken from '../middleware/authentication' 
import Router from "express";
import * as productController from '../controllers/ProductController';

const router = Router();

// Create a new product
router.post('/', verifyToken, productController.default.addProduct);

// Get data of a speciic product 
router.get('/:productId', productController.default.getSingleProduct);

// Delete product
router.delete('/:productId', verifyToken, productController.default.deleteProduct);

// Update product
router.put('/', verifyToken, productController.default.editProduct);

// Retrieve data from range of products
router.post('/products', productController.default.getProducts);

// Retrieve data from a search query
router.post('/search', productController.default.searchProduct);

export default router;