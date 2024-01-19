const express = require('express');
const guestsController = require('../controllers/guestsController');
const router = express.Router();

router.get('/guestlist', guestsController.ensureAuthenticated, guestsController.showGuestlistManager);
router.post("/guestlist/add", guestsController.addGuest);
router.get("/guestlist/edit/:id", guestsController.getEditGuest);
router.post("/guestlist/edit/:id", guestsController.postEditGuest);
router.get("/guestlist/delete/:id", guestsController.deleteGuest);

module.exports = router;
