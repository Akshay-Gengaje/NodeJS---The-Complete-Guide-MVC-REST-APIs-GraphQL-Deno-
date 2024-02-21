const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) return res.send("/login");
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.error("Invalid Credentials : ", err);
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  console.log(username, email, password, confirmPassword);
  if (password === confirmPassword) {
    User.findOne({ email })
      .then((userDoc) => {
        if (userDoc) {
          return res.redirect("/signup");
        }
        return bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new User({
            name: username,
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        });
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.redirect("/signup");
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};