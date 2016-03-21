var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// get directory page
router.get('/directory', function(req, res, next) {
	// show the directory view
	res.render('directory');
});

module.exports = router;
