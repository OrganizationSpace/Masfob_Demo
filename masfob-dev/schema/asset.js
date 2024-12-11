const mongoose = require("mongoose");
  
const asset_schema = mongoose.Schema({
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
  url: {
    type: String,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,"use your logo"]  },
  size: {
    type: Number,
    match:[/^\d+$/,"not allowerd this "] 
  },
  format: {
    type: String,

  },
  tags:[ {
    type: String,
  }]
 });

module.exports = mongoose.model("Asset_", asset_schema);
