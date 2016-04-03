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
			res.render('directory', {
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
router.post('/add', function(req, res) {
	Business.create( {
		name: req.body.name,
		category: req.body.category,
		description: req.body.description,
		phone: req.body.phone,
		email: req.body.email,
		website: req.body.website
		}
	);

	// redirect to business directory
	res.redirect('/master-directory');
});

// get handler for edit page 
router.get('/:id', function(req, res, next) {
	// variable for id to store the id from the url
	var id = req.params.id;

	// get selected business from database
	Business.findById(id, function(err, directory) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			// show the edit view
			res.render('edit', {
				title: 'edit',
				directory: directory
			});
		}
	});
});

// post handler for new business additions from add form
router.post('/:id', function(req, res) {

	// id variable from url id
	var id = req.params.id;

	// fill the business object
	var business = new Business( {
		_id: id,
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
			console.log(err)
			res.end(err);
		}
		else {
			res.redirect('/master-directory');
		}
	});
});

// get handler for delete
router.get('/delete/:id', function(req, res, next) {
	// get business id from the url
	var id = req.params.id;

	Business.remove({ _id: id }, function(err) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			res.redirect('/master-directory');
		}
	});
});
// make it public
module.exports = router;