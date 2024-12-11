const mongoose = require('mongoose')

const contact_schema = mongoose.Schema({
	workspace: {
		type: String,
	},
	name: {
		type: String,
	},
	display_name: {
		type: String,
	},
	phone_number: {
		type: String,
	},
	country_code: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	opt_out: {
		type: Boolean,
	},
	tags: [
		{
			type: String,
		},
	],
	labels: [
		{
			type: String,
		},
	],
})

module.exports = mongoose.model('Contact', contact_schema)
