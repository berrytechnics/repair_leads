import "dotenv/config";
import express from "express";
import cors from "cors";
import sslRedirect from "ssl-express-www";
import session from "cookie-session";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import passport from "passport";
import adminRouter from "./routes/adminRouter.js";
import leadRouter from "./routes/leadRouter.js";

import User from "./models/User.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const app = express();

mongoose.set("strictQuery", false);
app.set("view engine", ejs.name);
app.disable("x-powered-by");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors());
app.use(sslRedirect);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(dirName, "public")));
app.use(cookieParser("pdinctulok18"));
app.use(
  session({
    secret: "flyingpeanut970",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", leadRouter);
app.use("/admin", adminRouter);
app.use((req, res, next) => {
  res.status(404);
  next(new Error("That link appears to be broken."));
});
app.use((err, req, res, next) => {
  err.status = 500;
  console.error(err);
  res.status(500).render("error", { err: err });
});

try {
  mongoose.connect(process.env.MONGODB_URI);
  app.listen(process.env.PORT || 80);
  console.log("WEBSERVER STARTED.");
} catch (err) {
  console.error(err);
  process.exit(1);
}
