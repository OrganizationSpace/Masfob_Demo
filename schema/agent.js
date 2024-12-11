const mongoose = require("mongoose");
// const agent_schema = mongoose.Schema({
//     workspace: {
//         type: String,
//         //required: true,
//     },
//     name: {
//         type: String,
//       //  required: true,
//     },
//     role: {
//         type: String,
//         enum: ['SUPERADMIN', 'ADMIN', 'AGENT'],
//     },
//     email: {
//         type: String,
//       //  required: true,
//     },
//     password: {
//         type: String,
//       //  required: true,
//     },
//     phone_number: {
//         type: String,
//         //required: true,
//     },
//     tags: {
//         type: String,
//     },
//     teams:[{
//         type:String
//      }],
// });

// module.exports = mongoose.model("Agent_", agent_schema);

const agent_schema = mongoose.Schema({
    workspace: {
        type: String,
        trim: true,
        minlength: [3, "Workspace name should be at least 3 characters long"],
        maxlength: [50, "Workspace name should not exceed 50 characters"],
        match: [/^[a-zA-Z0-9\s]+$/,"only use alphaneumeric characters"]
    },
    name: {
        type: String,
        trim: true,
                lowercase: true,
                minlength: [3, " name should be at least 3 characters long"],
                maxlength: [50, " name should not exceed 50 characters"],
                match: [/^[a-zA-Z0-9\s_]+$/,"only use alphaneumeric characters"]
    },
    role: {
        type: String,
        enum: ['SUPERADMIN', 'ADMIN', 'AGENT'],
    },
    email: {
        type: String,
                trim: true,
                lowercase: true,
                match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|undefined$/,"only use alphaneumeric characters"]
    },
    password: {
        type: String,
        match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,"invalid password"]
    },
    phone_number: {
        type: String,
        match: [/^\d{10}$/,"invalid phone_number, must be 10 digits"]
    },
    tags: {
        type: String,
    },
    teams:[{
        type:String
     }],
});

module.exports = mongoose.model("Agent_", agent_schema);
