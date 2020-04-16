const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifyDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Role = mongoose.model("role", RoleSchema);
