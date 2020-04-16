const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String },
  number: { type: Number },
  photoPath: { type: String },
  img: { data: Buffer, contentType: String },
  relative: { type: [Number] },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifyDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
