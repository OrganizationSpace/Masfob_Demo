const Otp_ = require('../schema/otp')

class Otp {
	generate() {
		try {
			const result = Math.floor(1000 + Math.random() * 9000)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	async create({ email, otp, status }) {
		try {
			const result = new Otp_({ email, otp, status }).save()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	async verify({ email, otp, status }) {
		try {
			const result = await Otp_.findOneAndUpdate(
				{ email, otp, status },
				{ $set: { status: 'VERIFIED' } },
				{ new: true }
			)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async check({ email }) {
		try {
			const result = await Otp_.findOne({ email }).lean()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	
}
module.exports = Otp
