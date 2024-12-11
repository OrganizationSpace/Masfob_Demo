const mongoose = require("mongoose");

const otp_schema = mongoose.Schema({
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  status: {
    type: String,
    enum: ['PENDING', 'VERIFIED'],
    default: 'PENDING',
  },
//   expiresAt: {
//     type: Date,
//     default: Date.now() + 2 * 60 * 1000, // Set expiration time to 5 minutes
//     index: { expires: '2m' }, // Index for automatic TTL deletion
// },
 });

module.exports = mongoose.model("Otp", otp_schema);
