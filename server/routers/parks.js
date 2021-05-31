const express = require('express');
const { parks } = require('../controllers');

const { Router } = express;
const router = Router();

router.get('/favorites/:userId', parks.getFavoriteParks);
router.post('/favorites/:userId', parks.addFavoritePark);
router.delete('/favorites/:userId/:parkId', parks.removeFavoritePark);
router.get('/searchResults', parks.defaultSearch);
router.get('/searchResults/:lat/:lng/:keyword', parks.searchParks);

module.exports = router;
