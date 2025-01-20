const mongoose = require('mongoose');

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
    enum: ["text", "image", "video", "audio", "document"],
  },
  button: [ButtonSchema],
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
  answer: AnswerSchema,
});

// Edge Schema
const EdgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  sourceHandle: { type: String, required: true },
  target: { type: String, required: true },
  targetHandle: { type: String, required: true },
});

// Workflow Schema with a new collection name
const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    question: { type: String },
    answer: AnswerSchema,
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
    },
    phone_number_id: {
      type: String,
      match: [/^\d{15}$/, 'Invalid Phone Number ID'],
    },
    nodes: [NodeSchema],
    edges: [EdgeSchema],
  },
  { timestamps: true, collection: 'test_flows' } // Set a custom collection name
);

// Export the model with the custom collection name
module.exports = mongoose.model('TestFlow', testSchema);
