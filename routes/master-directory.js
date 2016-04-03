var express = require('express');
var router = express.Router();
// require mongoose
var mongoose = require('mongoose');
// link to business model
var Business = require('../models/business');

// get handler for businesses page
router.get('/', function(req, res, next) {
	// use directory model to query businesses in the database
	Business.find(function(err, directory) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			console.log('fygfygfy', directory);
			res.render('master-directory', {
				title: 'Directory',
				directory: directory
			});			
		}
	});

});

// get router for add page
router.get('/add', function(req, res) {
	res.render('add', { title: 'add' });
}); 


// get handler for edit page 
router.get('')


// make it public
module.exports = router;