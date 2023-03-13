const express = require('express');
const { login } = require('../controllers/auth-controller');
const User = require('../models/user');
const router = express.Router();

//login 
router.post('/login', login);

module.exports = router;