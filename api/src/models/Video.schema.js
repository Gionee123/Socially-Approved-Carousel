const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  videoUrl: {
    type: String,
    required: true,
  },

  thumbnail: String,

  duration: {
    type: Number,
    max: [30, 'Maximum video duration can be 30 seconds']
  },


  status: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
