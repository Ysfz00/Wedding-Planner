const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/venues", homeController.showVenues);
router.get("/vendors", homeController.showVendors);
router.get("/budget", homeController.showBudgetTracker);

module.exports = router;
