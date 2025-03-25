import express from "express";
import connectToDatabase from "./utils/connection.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import indexRouter from "./routes/index.routes.js";
import initializePassport from "./config/passport.js";
import "dotenv/config";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.MONGO_DB,
        ttl: 25 
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}));

connectToDatabase(
    process.env.MONGO_URL,
    process.env.MONGO_DB
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter)
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})