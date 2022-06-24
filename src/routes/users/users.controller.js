const User = require("../../models/user");
const bcrypt = require("bcrypt");

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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
  res.json("Welcome to the main page");
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
};
