import { Router } from "express";
import { getCart, insertProductCart, deleteProductCart, deleteCart, checkout } from "../controller/cartsController.js";
import passport from "passport";
import {authorization} from "../config/middlewares.js";

const cartRouter = Router();

cartRouter.get('/:cid', passport.authenticate("jwt"), authorization("user"), getCart);
cartRouter.post('/:cid/products/:pid', passport.authenticate("jwt"), authorization("user"), insertProductCart);
cartRouter.post('/:cid/checkout', passport.authenticate("jwt"), authorization("user"), checkout);
cartRouter.delete('/:cid/products/:pid', passport.authenticate("jwt"), authorization("user"), deleteProductCart);
cartRouter.delete('/:cid', passport.authenticate("jwt"), authorization("user"), deleteCart);

export default cartRouter;