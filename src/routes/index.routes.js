import { Router } from "express";
import usersRouter from "./users.routes.js";
import cartRouter from "./carts.routes.js";
import sessionsRouter from "./sessions.routes.js";
import productsRouter from "./products.routes.js";

const indexRouter = Router();

indexRouter.use("/api/users", usersRouter);
indexRouter.use("/api/cart", cartRouter);
indexRouter.use("/api/sessions", sessionsRouter);
indexRouter.use("/api/products", productsRouter);

indexRouter.use("*", (req, res) => res.status(404).send("Not Found"));

export default indexRouter;