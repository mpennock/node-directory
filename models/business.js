// link to mongoose
var mongoose = require('mongoose');

// define business schema
var businessSchema = new mongoose.Schema({
	name: {
		type: String,
		default: '',
		required: 'Company name cannot be blank'
	},
	category: {
		type: String,
		default: '',
		required: 'Business category cannot be blank'
	},
	description: {
		type: String,
		default: '',
		required: "Business description cannot be blnak"
	},
	phone: {
		type: String,
		default: '',
	},
	email: {
		type: String,
		default: '',		
	},
	website: {
		type: String,
		default: '',
	}
});

// make this model public
module.exports = mongoose.model('Business', businessSchema);