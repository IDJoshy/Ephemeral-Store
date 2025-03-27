import "dotenv/config";
import path from "path";
import express from "express";
import passport from "passport";
import __dirname from "./path.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { create } from "express-handlebars";
import indexRouter from "./routes/index.routes.js";
import connectToDatabase from "./utils/connection.js";
import initializePassport from "./config/passport.js";

const app = express();
const PORT = 8080;
const hbs = create();

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

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})