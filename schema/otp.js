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

otp_schema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });//expireAfterSeconds: This parameter sets the TTL index with an expiration duration. means that the document will expire immediately after the time specified in the createdAt field.


module.exports = mongoose.model("Otp_", otp_schema);
//