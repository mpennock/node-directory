// link to mongoose
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new schema({
	username: String,
	password: String
});

Account.plugin(passportLocalMongoose);

// make this model public
module.exports = mongoose.model('Account', Account);