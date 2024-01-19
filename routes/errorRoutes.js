const express = require('express');
const errorController = require('../controllers/errorController');
const router = express.Router();

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;