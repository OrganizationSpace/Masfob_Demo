require('dotenv').config()
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

class Mail {
	constructor() {
		this.transporter = this.createTransporter()
	}

	createTransporter() {
		return nodemailer.createTransport(
			smtpTransport({
				host: process.env.MAIL_HOST,
				port: process.env.MAIL_PORT,
				secure: false,
				tls: {
					rejectUnauthorized: false,
				},
				auth: {
					user: process.env.SERVICE_MAIL,
					pass: process.env.MAIL_PASS,
				},
			})
		)
	}

	async send(mailOptions) {
		await this.transporter.sendMail(mailOptions)
	}
}

module.exports = Mail
