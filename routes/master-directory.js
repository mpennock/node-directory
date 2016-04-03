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

// post handler for new business additions from add form
router.post('/:id', function(req, res) {

	// id variable from url id
	var id = req.params.id;

	// fill the business object
	var business = new Business( {
		name: req.body.name,
		category: req.body.category,
		description: req.body.description,
		phone: req.body.phone,
		email: req.body.email,
		website: req.body.website
		}
	);

	// use mongoose to update business
	Business.update( { _id: id }, business, function(err) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			res.redirect('/directory');
		}
	});
});
// make it public
module.exports = router;