const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
function initialize(passport, getUserByUserName, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUserName(username);
    const enteredPassword = password.toString();
    if (user == null) {
      return done(null, false, { message: "No user found" });
    }
    try {
      const match = await bcrypt.compare(enteredPassword, user.password);
      console.log(match);
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password is incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );

  passport.serializeUser(async (user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
