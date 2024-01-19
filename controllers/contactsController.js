const Contact = require("../models/contact");

exports.getAllContacts = (req, res, next) => {
    Contact.find({})
        .then(contacts => {
            req.data = contacts;
            next();
        })
        .catch(error => {
            next(error);
        });
};


exports.saveContact = (req, res, next) => {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email
    });

    newContact.save()
        .then(savedContact => {
            console.log("New contact saved:", savedContact);
            res.render("thanks");
        })
        .catch(error => {
            console.error("Error saving contact:", error);
            next(error);
        });
};

exports.showContactPage = (req, res) => {
  res.render("contact");
};
