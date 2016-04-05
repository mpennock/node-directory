var express = require('express');
var router = express.Router();
// require mongoose
var mongoose = require('mongoose');
// link to business model
var Business = require('../models/business');

// get handler for businesses page
router.get('/', isLoggedIn, function(req, res, next) {
	// use directory model to query businesses in the database
	Business.find(function(err, directory) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			console.log('fygfygfy', directory);
			res.render('master-directory', {
				title: 'Master directory',
				directory: directory,
			});			
		}
	});

});

// get router for add page
router.get('/add', function(req, res) {
	res.render('add', { title: 'add' });
}); 

// authentication check
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		res.redirect('/auth/login');
	}
}
// make it public
module.exports = router;