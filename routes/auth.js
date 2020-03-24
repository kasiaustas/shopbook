const express = require('express')
const passport = require('passport');
const controller = require('../controllers/auth')
const router = express.Router()

// http://localhost:4000/api/auth/login
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/account', passport.authenticate('jwt', {session: false}), controller.account);

module.exports = router