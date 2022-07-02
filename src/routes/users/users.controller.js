const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getRegisterPage(req, res) {
  res.json("welcome to register page");
}

async function getLoginPage(req, res) {
  res.json("Welcome to login page");
  if (req.session.messages) {
    console.log(req.session.messages[0]);
  }
}

async function postRegisterPage(req, res) {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName: req.body.username,
      password: hashedPassword,
    });
    res.redirect("/login");
    await user.save();
  } catch (err) {
    console.log(err);
  }
}

async function getMainPage(req, res) {
  res.json("WELCOME TO MAIN PAGE");
}

async function logOutUser(req, res, next) {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

async function findUserById(userId) {
  return await User.findById(userId);
}

async function findUserByUserName(username) {
  return await User.findOne({ userName: username });
}

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    await jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      console.log(req.user);
      next();
    });
  }
}

async function createToken(req, res) {
  const username = req.body.username;
  const password = req.body.password.toString();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { name: username, password: hashedPassword };

  const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN);
  res.send({
    user,
    accessToken,
  });
}

module.exports = {
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
};
