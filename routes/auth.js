var express = require('express');
var router = express.Router();


// GET handler for register
router.get('/register', function(req, res) {
	res.render('auth/register', { title: 'register' });
}); 

// GET handler for login
router.get('/login', function(req, res, next) {
	res.render('auth/login', { title: 'login'});
});

// make it public
module.exports = router;