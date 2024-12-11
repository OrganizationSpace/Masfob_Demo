const mongoose = require("mongoose");


const otp_schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'VERIFIED'],
    default: 'PENDING'
  },
  createdAt: {
    type: Date,
    expires: 60, //1min used to seconds 
    default: Date.now
  }
});

otp_schema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });


module.exports = mongoose.model("Otp_", otp_schema);
//