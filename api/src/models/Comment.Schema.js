const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  ipAddress: String,
  status: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);