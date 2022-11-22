import express from "express";
import {
    getProducts,
    getProductsById,
    createProducts,
    updateProducts,
    deleteProducts
} from "../controller/ProductController.js";
import {verifyUser} from "../middleware/AuthUser.js";

const productsRouter = express.Router();

productsRouter.get('/products', verifyUser,getProducts);
productsRouter.get('/products/:id', verifyUser,getProductsById);
productsRouter.post('/products', verifyUser,createProducts);
productsRouter.patch('/products/:id', verifyUser,updateProducts);
productsRouter.delete('/products/:id', verifyUser, deleteProducts);


export default productsRouter;