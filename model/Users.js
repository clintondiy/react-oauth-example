const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: { type: Schema.Types.ObjectId, ref: "role" },
  info: { type: Schema.Types.ObjectId, ref: "info", require: true },
  isDisable: { type: Boolean },
  isReset: { type: Boolean },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifyDate: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model("user", UserSchema);
