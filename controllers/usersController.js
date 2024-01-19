const User = require("../models/user");
const passport = require("passport");
const { check, validationResult } = require('express-validator');

module.exports = {
  index: (req, res, next) => {
    User.find({})
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
  signup: (req, res) => {
    res.render("users/new");
  },
  validate: [
    check("email").notEmpty().withMessage('Email cannot be empty').normalizeEmail().isEmail().withMessage("Email is invalid"),
    check("zipCode").isInt({ gt: 9999, lt: 100000 }).withMessage("Zip code should be a 5 digit number"),
    check("password").notEmpty().withMessage("Password cannot be empty"),
    check("first").notEmpty().withMessage("First name cannot be empty"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let messages = errors.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    }
  ],
  create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User({
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      zipCode: req.body.zipCode
    });
  
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      } else {
        console.log(`Error saving user: ${error.message}`);
        req.flash("error", `Failed to create user account because: ${error.message}`);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/users",
    successFlash: "Logged in!"
  }),
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        if (user) {
          res.locals.user = user;
          next();
        } else {
          req.flash("error", "User not found");
          res.redirect("/users/login");
        }
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        res.render("users/edit", {
          user: user,
        });
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = {
        name: {
          first: req.body.first,
          last: req.body.last,
        },
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode,
      };
    User.findByIdAndUpdate(userId, {
      $set: userParams,
    })
      .then((user) => {
        req.flash("success", `${user.fullName}'s account updated successfully!`);
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        req.flash(
          "error",
          `Failed to update user account because: ${error.message}.`
        );
        next();
      });
  },
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        req.flash("success", `User's account deleted successfully!`);
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        req.flash(
          "error",
          `Failed to delete user account because: ${error.message}.`
        );
        next();
      });
  },
  logout: (req, res, next) => {
		req.logout((err) => {
			if (err) {
				// Handle any error that occurred during logout
				console.error(err);
				// Optionally, set a flash message for the error
				req.flash("error", "An error occurred during logout.");
			} else {
				// Logout successful
				req.flash("success", "You have been logged out!");
			}
			res.locals.redirect = "/";
			next();
		});
	} 
};
