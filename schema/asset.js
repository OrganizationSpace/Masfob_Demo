const mongoose = require("mongoose");
  
const asset_schema = mongoose.Schema({
    // workspace: {
    //     type: String,
    //     trim: true,
    //     minlength: [3, "Workspace name should be at least 3 characters long"],
    //     maxlength: [50, "Workspace name should not exceed 50 characters"],
    //     match: [/^[a-zA-Z0-9\s]+$/,"only use alphaneumeric characters"]
    //   },
  //   node_id: {
  //     type: String,
  // },  
    name: {
      type: String,
      trim: true,
      minlength: [3, "Name should be at least 3 characters long"],
      maxlength: [100, "Name should not exceed 100 characters"],
      match: [/^[a-zA-Z0-9\s\-\._]+(\.[a-zA-Z0-9]+)?$/, "Name should only contain alphanumeric characters, spaces, hyphens, periods, and underscores, and must optionally have a valid extension."],
      required: [true, "Name is required"],
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
  type: {  // Add the linkType field to store the type of link (image, video, audio, document)
    type: String,
    enum: ['image', 'video', 'audio', 'document', 'unknown'],  // Enum to restrict values to these types
    default: 'unknown', // Default type if not specified
  },
  tags:[ {
    type: String,
  }]
 });

module.exports = mongoose.model("Asset_", asset_schema);

