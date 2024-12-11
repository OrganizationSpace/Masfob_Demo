const mongoose = require("mongoose");

const agent_schema = mongoose.Schema({
    workspace: {
        type: String,
        //required: true,
    },
    name: {
        type: String,
      //  required: true,
    },
    role: {
        type: String,
        enum: ['SUPERADMIN', 'ADMIN', 'AGENT'],
        default: 'SUPERADMIN',
    },
    email: {
        type: String,
      //  required: true,
    },
    password: {
        type: String,
      //  required: true,
    },
    phone_number: {
        type: String,
        //required: true,
    },
    tags: {
        type: String,
    }
});

module.exports = mongoose.model("Agent", agent_schema);
