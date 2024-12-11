const mongoose = require('mongoose')

const customer_schema = mongoose.Schema({
	workspace: {
		type: String,
		trim: true,
		minlength: [3, 'Workspace name should be at least 3 characters long'],
		maxlength: [50, 'Workspace name should not exceed 50 characters'],
		match: [/^[a-zA-Z0-9\s]+$/, 'only use alphaneumeric characters'],
	}, //new
	name: {
		type: String,
		trim: true,
		lowercase: true,
		minlength: [3, ' name should be at least 3 characters long'],
		maxlength: [50, ' name should not exceed 50 characters'],
		match: [
			/^[a-zA-Z0-9\s_]+$/,
			'using only alphanumeric characters and lowercase letters.',
		],
	}, //new
	display_name: {
		type: String,
		trim: true,
		lowercase: true,
		minlength: [3, ' name should be at least 3 characters long'],
		maxlength: [50, ' name should not exceed 50 characters'],
		match: [
			/^[a-zA-Z0-9\s_]+$/,
			'using only alphanumeric characters and lowercase letters.',
		],
	}, //new
	phone_number: {
		type: String,
		match: [/^\d{10,11}$|undefined$/, 'invalid phone number'],
	}, //new
	country_code: {
		type: String,
		trim: true,
		minlength: [1, 'Country code should be at least 1 character long'],
		maxlength: [10, 'Country code should not exceed 10 characters'],
	}, //new
	email: {
		type: String,
		trim: true,
		match: [
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|undefined$/,
			'only use alphaneumeric characters',
		],
	},
	profile_picture: {
		type: String,
		match: [
			/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
			'use your logo',
		],
	}, //new
	password: {
		type: String,
		match: [
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
			'invalid password',
		],
	}, //new
	dob:{
		type:Date
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
			trim: true,
			minlength: [3, 'label should be at least 3 characters long'],
			maxlength: [25, ' label should not exceed 25 characters'],
			match: [/^[a-zA-Z0-9\s_]+$/, 'only use alphaneumeric characters'],
		}, //new
	],
})

module.exports = mongoose.model('Customer_', customer_schema)
