const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const homeRoutes = require('./homeRoutes');
const guestsRoutes = require('./guestsRoutes');
const contactsRoutes = require('./contactsRoutes');
const errorRoutes = require('./errorRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/', guestsRoutes);
router.use('/', contactsRoutes);
router.use('/', errorRoutes);

module.exports = router;
