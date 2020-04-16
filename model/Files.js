const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const FileSchema = new Schema({
  FilePath: { type: String, required: true },
  data: { type: Buffer }
});

module.exports = File = mongoose.model("File", FileSchema);
