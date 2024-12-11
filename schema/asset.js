const mongoose = require("mongoose");

const asset_schema = mongoose.Schema({
    workspace: {
        type: String,
      },
    name: {
    type: String,
  },
  url: {
    type: String,
  },
  size: {
    type: String,
  },
  format: {
    type: String,
  },
  tags:[ {
    type: String,
  }]
 });

module.exports = mongoose.model("Asset", asset_schema);
