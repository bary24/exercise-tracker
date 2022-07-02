if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const {
  findUserByUserName,
  findUserById,
  checkAuthenticated,
  checkLoggedIn,
  getMainPage,
  getRegisterPage,
  getLoginPage,
  postRegisterPage,
  logOutUser,
  verifyToken,
  createToken,
} = require("./users.controller");
const express = require("express");

const usersRouter = express.Router();
const passport = require("passport");
const session = require("express-session");

const initializePassport = require("./passport.config");
initializePassport(passport, findUserByUserName, findUserById);

usersRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
usersRouter.use(passport.initialize());
usersRouter.use(passport.session());

usersRouter.get("/login", checkLoggedIn, getLoginPage);
usersRouter.get("/register", getRegisterPage);
usersRouter.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }),
  createToken
);

usersRouter.post("/register", postRegisterPage);
usersRouter.post("/", checkAuthenticated, verifyToken, getMainPage);
usersRouter.delete("/logout", logOutUser);

module.exports = usersRouter;
