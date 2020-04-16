const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const ConfigSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String },
  value: { type: String },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifyDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Config = mongoose.model("config", ConfigSchema);
