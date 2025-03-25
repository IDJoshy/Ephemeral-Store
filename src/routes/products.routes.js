import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controller/productsController.js";
import passport from "passport";
import {authorization} from "../config/middlewares.js";

const productsRouter = Router();

productsRouter.get('/', passport.authenticate("jwt"), getProducts);
productsRouter.get('/:pid', passport.authenticate("jwt"), getProduct);
productsRouter.post('/', passport.authenticate("jwt"), authorization("admin"), createProduct);
productsRouter.put('/:pid', passport.authenticate("jwt"), authorization("admin"), updateProduct);
productsRouter.delete('/:pid', passport.authenticate("jwt"), authorization("admin"), deleteProduct);

export default productsRouter;