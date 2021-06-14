const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  owner: String,
  shared: Array,
  size: Number
});

const File = mongoose.model("File", fileSchema);


module.exports = File;