const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema

const phoneSchema = new Schema(
  {
    countryCode: {
      type: Number
    },
    phoneNumber: {
      type: Number
    }
  },
  { _id: false }
);

module.exports = phoneSchema;
