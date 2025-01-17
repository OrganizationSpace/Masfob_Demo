const mongoose = require('mongoose');

// Button Schema
const ButtonSchema = new mongoose.Schema({
  id: { type: String },
  label: { type: String },
  nextFlowId: { type: String, default: null },
});

// Answer Schema
const AnswerSchema = new mongoose.Schema({
  url: { type: String, default: "" },
  size: { type: Number }, // Added from the old schema
  format: { type: String }, // Added from the old schema
  text: { type: String },
  type: {
    type: String,
   // enum: ["text", "image", "video", "audio", "document"], // Added enum validation
  },
  button: [ButtonSchema],
});

// Node Schema
const NodeSchema = new mongoose.Schema({
  id: { type: String },
  node_type: { type: String },
  label: { type: String },
  position: {
    x: { type: Number },
    y: { type: Number },
  },
  answer: AnswerSchema,
});

// Edge Schema
const EdgeSchema = new mongoose.Schema({
  id: { type: String },
  source: { type: String },
  sourceHandle: { type: String },
  target: { type: String,  },
  targetHandle: { type: String,  },
});

// Workflow Schema
const WorkflowSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String , required: true},
    question: { type: String }, // Added from the old schema
    node_type: { type: String },
    answer: AnswerSchema, // Reuses the enhanced AnswerSchema
    workspace: {
      type: String,
      // trim: true,
      // minlength: [3, 'Workspace name should be at least 3 characters long'],
      // maxlength: [50, 'Workspace name should not exceed 50 characters'],
      // match: [/^[a-zA-Z0-9\s]+$/, 'Only use alphanumeric characters'],
    },
    waba_id: {
      type: String,
     // match: [/^\d{15}$/, 'Invalid WABA ID'],
    },
    phone_number_id: {
      type: String,
      //match: [/^\d{15}$/, 'Invalid Phone Number ID'],
    },
    nodes: [NodeSchema], // Added to integrate flows within workflows
    edges: [EdgeSchema], // Added to integrate flows within workflows
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model('Workflow', WorkflowSchema);

// const mongoose = require('mongoose');

// const buttonSchema = new mongoose.Schema({
//   id: {
//     type: String,
    
//     //unique: true, // Ensures each button has a unique ID
//   },
//   label: {
//     type: String,
    
//   },
//   nextFlowId: {
//     type: String, // Points to the ID of the next flow
//     //required: false, // Optional, as not all buttons may lead to another flow
//   },
// });

// const answerSchema = new mongoose.Schema({
//   linkType: {  // Add the linkType field to store the type of link (image, video, audio, document)
//     type: String,
//     enum: ['image', 'video', 'audio', 'document', 'unknown'],  // Enum to restrict values to these types
//     default: 'unknown', // Default type if not specified
//   },
//   link: {
//     type: String,
//   },
//   text: {
//     type: String,
    
//   },
//   button: [buttonSchema], // Array of buttons for each answer
// });

// const workflowSchema = new mongoose.Schema(
//   {
//     id: {
//       type: String,
      
//     //  unique: true, // Ensures each workflow has a unique ID
//     },
//     name: {
//       type: String,
      
//     },
//    node_type: {
//       type: String,
      
//     },
//     label: {
//       type: String,
      
//     },
//     question: {
//       type: String,
      
//     },
//     answer: {
//       type: answerSchema, // Embedded schema for answer
      
//     },
//     workspace: {
//       type: String,
//       trim: true,
//       minlength: [3, 'Workspace name should be at least 3 characters long'],
//       maxlength: [50, 'Workspace name should not exceed 50 characters'],
//       match: [/^[a-zA-Z0-9\s]+$/, 'Only use alphanumeric characters'],
//     },
//     waba_id: {
//       type: String,
//       match: [/^\d{15}$/, 'Invalid WABA ID'],
//     },
//     phone_number_id: {
//       type: String,
//       match: [/^\d{15}$/, 'Invalid Phone Number ID'],
//     },
//   },
//   { timestamps: true } // Adds createdAt and updatedAt timestamps
// );

// module.exports = mongoose.model('Workflow', workflowSchema);