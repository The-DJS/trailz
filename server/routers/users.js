const express = require('express');
const { users } = require('../controllers');

const { Router } = express;
const router = Router();

router.get('/:userId', users.getSingleUser);

module.exports = router;
