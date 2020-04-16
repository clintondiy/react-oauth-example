const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const ImageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifyDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Image = mongoose.model("image", ImageSchema);
