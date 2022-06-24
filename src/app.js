const express = require("express");
const morgan = require("morgan");
const exerciseRouter = require("./routes/exercises/exercises.router");
const daysRouter = require("./routes/days/days.router");
const monthsRouter = require("./routes/months/months.router");
const usersRouter = require("./routes/users/users.router");
const app = express();

// const passport = require("passport");
// const session = require("express-session");
// const User = require("./models/user");

app.use(express.json());
app.use(morgan("combined"));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", exerciseRouter);
app.use("/", daysRouter);
app.use("/", monthsRouter);
app.use("/", usersRouter);

// app.post("/register", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({
//       userName: req.body.username,
//       password: hashedPassword,
//     });
//     res.redirect("/login");
//     await user.save();
//   } catch (err) {
//     console.log(err);
//   }
//   // const users = await User.find({});
// });

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureMessage: true,
//   })
// );

// app.get("/login", checkLoggedIn, (req, res) => {
//   res.json("Welcome to login page");
//   if (req.session.messages) {
//     console.log(req.session.messages[0]);
//   }
// });

// app.get("/register", (req, res) => {
//   res.json("welcome to register page");
// });

// app.get("/", checkAuthenticated, (req, res) => {
//   res.json("Welcome to the main page");
// });

// app.delete("/logout", (req, res, next) => {
//   req.logOut((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/login");
//   });
// });

module.exports = app;
