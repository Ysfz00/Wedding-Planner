const express = require('express');
const contactsController = require('../controllers/contactsController');
const router = express.Router();

router.get("/contact", contactsController.showContactPage);
router.post("/contact", contactsController.saveContact);
router.get("/", contactsController.getAllContacts, (req, res, next) => {
  res.render("contacts", { contacts: req.data });
});

module.exports = router;
