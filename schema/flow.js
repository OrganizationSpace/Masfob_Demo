const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator
const generateUniqueId = require('../function/generatedUniqueId');

// Button Schema
const ButtonSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  nextFlowId: { type: String, default: null },
});

// Answer Schema
const AnswerSchema = new mongoose.Schema({
  url: { type: String, default: "" },
  size: { type: Number },
  format: { type: String },
  text: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "image", "video", "audio", "document"], // Enums for validation
  },
  button: [ButtonSchema], // Array of buttons for each answer
});

// Node Schema
const NodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  node_type: { type: String, required: true },
  label: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  answer: AnswerSchema, // Answer will reference the AnswerSchema
});

// Edge Schema
const EdgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  sourceHandle: { type: String, required: true },
  target: { type: String, required: true },
  targetHandle: { type: String, required: true },
});

// Workflow Schema
const WorkflowSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default:()=> generateUniqueId(), // Automatically generate a unique ID
    },
    name: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      default: '', // Default value for the question if not provided
    },
    node_type: {
      type: String,
      default: 'default', // Default node_type if not provided
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer', // Reference to Answer Schema
      required: true, // Make sure answer is required
    },
    workspace: {
      type: String,
      trim: true,
      minlength: [3, 'Workspace name should be at least 3 characters long'],
      maxlength: [50, 'Workspace name should not exceed 50 characters'],
      match: [/^[a-zA-Z0-9\s]+$/, 'Only use alphanumeric characters'],
    },
    waba_id: {
      type: String,
      match: [/^\d{15}$/, 'Invalid WABA ID'],
      default: '',
    },
    phone_number_id: {
      type: String,
      match: [/^\d{15}$/, 'Invalid Phone Number ID'],
      default: '',
    },
    nodes: [NodeSchema], // Array of Node documents
    edges: [EdgeSchema], // Array of Edge documents
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create a model based on the schema
const Workflow = mongoose.models.Workflow || mongoose.model('Workflow', WorkflowSchema);

module.exports = Workflow;





// const mongoose = require('mongoose');

// // Button Schema
// const ButtonSchema = new mongoose.Schema({
//   id: { type: String, required: true }, // Unique identifier for the button
//   label: { type: String, required: true }, // Text on the button
//   nextFlowId: { type: String, default: null }, // ID of the next node
// });

// // Answer Schema
// const AnswerSchema = new mongoose.Schema({
//   url: { type: String, default: "" }, // URL for media if any
//   text: { type: String, required: true }, // Text message
//   button: [ButtonSchema], // Array of buttons for the answer
// });

// // Node Schema
// const NodeSchema = new mongoose.Schema({
//   id: { type: String, required: true }, // Unique identifier for the node
//   node_type: { type: String, required: true }, // Type of the node
//   label: { type: String, required: true }, // Label for the node
//   position: {
//     x: { type: Number, required: true }, // X coordinate of the node
//     y: { type: Number, required: true }, // Y coordinate of the node
//   },
//   answer: AnswerSchema, // Reference to the answer schema
// });

// // Edge Schema
// const EdgeSchema = new mongoose.Schema({
//   id: { type: String, required: true }, // Unique identifier for the edge
//   source: { type: String, required: true }, // Source node ID
//   sourceHandle: { type: String, required: true }, // Source handle (button ID)
//   target: { type: String, required: true }, // Target node ID
//   targetHandle: { type: String, required: true }, // Target handle
// });

// // Flow Schema
// const FlowSchema = new mongoose.Schema({
//   name: { type: String, required: true }, // Name of the flow
//   nodes: [NodeSchema], // Array of nodes in the flow
//   edges: [EdgeSchema], // Array of edges connecting the nodes
// });

// // Main Schema for the entire structure
// const MainSchema = new mongoose.Schema({
//   flow: [FlowSchema], // Array of flows
// });

// const MainModel = mongoose.models.Main || mongoose.model('Main', MainSchema);

// module.exports = MainModel;
