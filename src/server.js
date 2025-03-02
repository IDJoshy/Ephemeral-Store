import express from "express";
import connectToDatabase from "./utils/connection.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import indexRouter from "./routes/index.routes.js";
import initializePassport from "./config/passport.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser("ephemeralSecret"));
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://EphemeralJosh:ojGibNPUuew2feoh@backend-1-cluster.dy2l2.mongodb.net/?retryWrites=true&w=majority&appName=BackEnd-1-Cluster",
        dbName: "EphemeralStore",
        ttl: 25 
    }),
    secret: "secretCode",
    resave: true,
    saveUninitialized: true
}));

connectToDatabase(
    "mongodb+srv://EphemeralJosh:ojGibNPUuew2feoh@backend-1-cluster.dy2l2.mongodb.net/?retryWrites=true&w=majority&appName=BackEnd-1-Cluster",
    "EphemeralStore"
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter)
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})