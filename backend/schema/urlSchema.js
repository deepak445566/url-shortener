const mongoose = require("mongoose");
const {Schema}= mongoose;

const urlSchema= new Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true }
});
const Url = mongoose.model("Url", urlSchema);
module.exports = Url;