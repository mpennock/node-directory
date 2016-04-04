var express = require('express');
var router = express.Router();

// passport package refrences
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');
var configDb = require('../config/db.js');

// GET handler for register
router.get('/register', function(req, res, next) {
	res.render('auth/register', { title: 'register' });
}); 

// post handler for register
router.post('/register', function(req, res, next) {
	Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
		if (err) {
			return res.render('auth/register', { title: 'Register' });
		}
		else {
			res.redirect('/auth/login');
		}
	})
});

// GET handler for login validation
router.get('/login', function(req, res, next) {

	// store session message
	var messages = req.session.messages || [];
	
	// clear out session messages
	req.session.messages = [];

	// render the view
    res.render('auth/login', {
        title: 'Login',
        user: req.user,
        messages: messages
	});
});

// post handler for login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/directory',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'

}));
// authentication check
function isLoggedIn(req, res, next) {

    // is the user authenticated?
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

// make it public
module.exports = router, passport;