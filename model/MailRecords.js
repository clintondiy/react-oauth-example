const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const MailRecordSchema = new Schema({
  messageID: { type: String },
  status: { type: Boolean, required: true },
  receiver: { type: String },
  message: { type: String },
  template: { type: String },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = MailRecord = mongoose.model("mailRecord", MailRecordSchema);
