const express = require('express');
const { events } = require('../controllers');

const { Router } = express;
const router = Router();

router.get('/', events.getAllEvents);
router.get('/validate/:eventId', events.doesEventExist);
router.delete('/removeEvent/:eventId', events.removeEvent);
router.get('/:userId', events.getUserEvents);
router.post('/:userId', events.addNewEvent);
router.post('/:userId/:eventId', events.registerForEvent);
router.delete('/:userId/:eventId', events.unregisterForEvent);

module.exports = router;
