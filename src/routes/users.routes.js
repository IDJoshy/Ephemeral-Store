import {Router} from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controller/usersController.js";
import {authorization} from "../config/middlewares.js";
import passport from "passport";
const usersRouter = Router();

usersRouter.get('/', passport.authenticate("jwt"), authorization("admin"), getUsers);
usersRouter.get('/:uid', passport.authenticate("jwt"), authorization("admin"), getUser);
usersRouter.post('/', passport.authenticate("jwt"), authorization("admin"), createUser);
usersRouter.put('/:uid', passport.authenticate("jwt"), authorization("admin"), updateUser);
usersRouter.delete('/:uid', passport.authenticate("jwt"), authorization("admin"), deleteUser);

export default usersRouter;