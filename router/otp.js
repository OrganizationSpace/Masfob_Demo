const express = require('express')
const router = express.Router()
const Otp = require('../controller/otp') // Update the import path based on your project structure
const { urlencoded } = require('body-parser')
const otp = new Otp()

router.use(express.json())
router.use(urlencoded({ extended: true }))

router.post('/verify', async (req, res, next) => {
	const { email, otp_code } = req.body

	try {
		const verify_otp = await otp.verify({
			email,
			otp: otp_code,
			status: 'PENDING',
		})

		if (!verify_otp) {
			return res.status(400).json({
				success: false,
				message: 'Invalid OTP or OTP already verified',
			})
		}else
		{res
			.status(200)
			.json({ success: true, message: 'OTP verified successfully' })}

		
	} catch (error) {
		// console.error('Error verifying OTP:', error);
		// res.status(500).json({ success: false, message: 'Error verifying OTP' });
		next(error)
	}
})

module.exports = router