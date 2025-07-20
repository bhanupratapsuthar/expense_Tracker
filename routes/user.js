// Import Express and Express Router and passport 
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import wrapAsync Function from Utils Folder 
const wrapAsync = require('../utils/wrapAsync.js')

const { renderSignupForm, signupForm, renderLoginForm, loginForm, logout } = require('../controllers/user.js');
const { validateUser } = require('../middleware.js');



// Add New User btn
router.get('/signup', 
    wrapAsync(renderSignupForm)
)

// Add User Form Page
router.post('/signup', 
    validateUser,
    wrapAsync( signupForm)
)

router.get('/login', 
    renderLoginForm
)

router.post('/login', 
    passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), 
    loginForm
)

router.get('/logout', 
    logout
)

module.exports = router