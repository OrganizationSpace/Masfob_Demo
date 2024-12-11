require('dotenv').config()
const express = require('express')
const router = express.Router()
const multer = require('multer')
const { sendEmailWithOTP } = require('../function/send_email_with_otp')
const Otp = require('../controller/otp') // Update the import path based on your project structure
const Mail = require('../controller/mail')
const { urlencoded } = require('body-parser')

const otp = new Otp()
const mail = new Mail()
router.use(express.json())
router.use(urlencoded({ extended: true }))

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/send', upload.array('attachments'), async (req, res, next) => {
	const { to, subject } = req.body
	const attachments = req.files || []

	const otp_code = otp.generate().toString()

	const mailOptions = {
		from: process.env.SERVICE_MAIL,
		to,
		subject,
		html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email OTP Verification</title>
        <style>
          body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f4f4f4;
          }
      
          .otp-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
      
          .otp {
            background-color: skyblue;
            padding: 10px;
            font-size: 30px;
            border-radius: 4px;
          }
      
          .message {
            margin-top: 20px;
            font-size: 16px;
          }
      
          .attractive-contact {
            margin-top: 20px;
            font-weight: bold;
            color: #4CAF50;
          }
        </style>
      </head>
      <body>
        <div class="otp-container">
          <h2>Email OTP Verification</h2>
          <p><span class="otp">${otp_code}</span></p>
          <p class="message">Thank you for choosing Masfob for your verification needs.</p>
          <p class="attractive-contact">For any inquiries, please contact our support team at support@masfob.com.</p>
        </div>
      </body>
      </html>`,
		attachments: attachments.map((file) => ({
			filename: file.originalname || 'Untitled',
			content: file.buffer || Buffer.from(''),
		})),
	}

	try {
		await mail.send(mailOptions)
		await otp.create({ email: to, otp: otp_code, status: 'PENDING' })
		res
			.status(200)
			.json({
				success: true,
				message: 'Email sent successfully',
				data: otp_code,
			})
	} catch (error) {
		console.error('Error sending email:', error)
		next(error)
	}
})

// mail.send(mailOptions, (error, info) => {
// 	callback(error, info)
// })

// await otp.create({ email: to, otp: otp_code, status: 'PENDING' })
// res
// 	.status(200)
// 	.json({ success: true, message: 'Email sent successfully', data: otp_code })

// sendEmailWithOTP(to, subject, attachments,otp_code,  async (error, info) => {
//   if (error) {
//     console.error('Error sending email:', error);
//     next(error);
//   } else {
//     try {
//       await mail.create({ email: to, otp: otp_code, status: 'PENDING' });
//       console.log('Email sent:', info.response);
//       res.status(200).json({ success: true, message: 'Email sent successfully', data: otp_code });
//     } catch (saveError) {
//       console.error('Error saving OTP to database:', saveError);
//       next(saveError);
//     }
//   }
// });
//})

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
		}

		res
			.status(200)
			.json({ success: true, message: 'OTP verified successfully' })
	} catch (error) {
		// console.error('Error verifying OTP:', error);
		// res.status(500).json({ success: false, message: 'Error verifying OTP' });
		next(error)
	}
})

module.exports = router
