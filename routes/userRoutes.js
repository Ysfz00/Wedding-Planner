const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const passport = require("passport");

router.get("/login", usersController.login);
router.post("/login", passport.authenticate("local", 
    { 
        failureRedirect: "/users/login", 
        failureFlash: "Failed to login."
    }), 
    (req, res) => {
        let redirectTo = req.session.redirectTo || '/';
        delete req.session.redirectTo;
        res.redirect(redirectTo);
});
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/signup", usersController.signup);
router.get("/new", usersController.signup);
router.post("/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.get("/", usersController.index, usersController.indexView);

module.exports = router;