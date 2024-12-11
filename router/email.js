const express = require('express');
const router = express.Router();
const multer = require('multer');
const emailService = require('../function/mail');
const Otp = require('../schema/otp'); // Update the import path based on your project structure

router.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/send', upload.array('attachments'), async (req, res) => {
  const { to, subject } = req.body;
  const attachments = req.files || [];

  emailService.sendEmailWithOTP(to, subject, attachments, async (error, info, otp) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'An error occurred while sending the email' });
    } else {
      
      try {
        await Otp.create({ email: to, otp, status: 'PENDING' });
      } catch (saveError) {
        console.error('Error saving OTP to database:', saveError);
        return res.status(500).json({ success: false, message: 'Error saving OTP to database' });
      }

      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully', otp });
    }
  });
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const updatedOTP = await Otp.findOneAndUpdate(
      { email, otp,status: 'PENDING'},
      { $set: { status: 'VERIFIED'} },
      { new: true }
    );

    if (!updatedOTP) {
      return res.status(400).json({ success: false, message: 'Invalid OTP or OTP already verified' });
    }

    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
});

module.exports = router;
