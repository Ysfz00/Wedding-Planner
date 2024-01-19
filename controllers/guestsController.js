const Guest = require("../models/guest");

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // Redirect user to login page
        req.flash('error', 'You must be signed in to access that page');
        res.redirect("/users/login");
    }
};

  

exports.showGuestlistManager = (req, res, next) => {
    Guest.find({user: req.user._id}) // Only find the guests associated with this user
        .then(guests => {
            res.render("guestlist", { guests: guests });
        })
        .catch(error => {
            console.error("Error retrieving guests:", error);
            next(error);
        });
};


exports.addGuest = (req, res) => {
    const newGuest = new Guest({
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        guestCategory: req.body.guestCategory,
        confirmed: req.body.confirmed,
        user: req.user._id,
    });

    newGuest.save()
        .then(() => {
            res.redirect("/guestlist");
        })
        .catch(error => {
            res.send(error);
        });
};


exports.getEditGuest = (req, res, next) => {
    Guest.findOne({_id: req.params.id, user: req.user._id}) // Check that the user owns this guest
        .then(guest => {
            if (guest) {
                res.render("edit_guest", { guest: guest });
            } else {
                req.flash('error', 'Unauthorized access.');
                res.redirect("/guestlist");
            }
        })
        .catch(error => {
            console.error("Error getting guest for editing:", error);
            next(error);
        });
};

exports.postEditGuest = (req, res, next) => {
    const updatedGuest = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        guestCategory: req.body.guestCategory,
        confirmed: req.body.confirmed
    };

    Guest.findOneAndUpdate({_id: req.params.id, user: req.user._id}, updatedGuest) // Check that the user owns this guest
        .then(guest => {
            if (guest) {
                res.redirect("/guestlist");
            } else {
                req.flash('error', 'Unauthorized access.');
                res.redirect("/guestlist");
            }
        })
        .catch(error => {
            console.error("Error updating guest:", error);
            next(error);
        });
};

exports.deleteGuest = (req, res, next) => {
    Guest.findOneAndRemove({_id: req.params.id, user: req.user._id}) // Check that the user owns this guest
        .then(guest => {
            if (guest) {
                res.redirect("/guestlist");
            } else {
                req.flash('error', 'Unauthorized access.');
                res.redirect("/guestlist");
            }
        })
        .catch(error => {
            console.error("Error deleting guest:", error);
            next(error);
        });
};
