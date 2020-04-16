const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const phoneSchema = require("./common/Phone");
//Create schema
const InfoSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: {
    type: phoneSchema
  },
  iconPhoto: { type: Schema.Types.ObjectId, ref: "image" },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifyDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Info = mongoose.model("info", InfoSchema);
