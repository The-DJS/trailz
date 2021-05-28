const express = require('express');
const { parks } = require('../controllers');

const { Router } = express;
const router = Router();

router.get('/favorites/:userId', parks.getFavoriteParks);
router.post('/favorites/:userId', parks.addFavoritePark);
router.get('/searchResults', parks.searchParks);

module.exports = router;
